"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type TranslationContextType = {
  lang: string;
  loading: boolean;
  setLang: (lang: string) => void;
  t: (text: string) => string;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

// Module-level cache so translations persist across component remounts
// within the same page session. Key: `${lang}::${originalText}`.
const cache = new Map<string, string>();
const STORAGE_KEY = "mp-translation-cache-v1";

function loadPersistedCache() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed: Record<string, string> = JSON.parse(raw);
    Object.entries(parsed).forEach(([key, value]) => cache.set(key, value));
  } catch {
    // corrupted cache — ignore and start fresh
  }
}

function persistCache() {
  if (typeof window === "undefined") return;
  try {
    const obj = Object.fromEntries(cache);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // storage full or unavailable — translations still work, just not cached
  }
}

loadPersistedCache();

// Providing a contact email bumps MyMemory's free daily limit
// from 5,000 to 50,000 characters — no signup required.
const CONTACT_EMAIL = "megawattpower.listrindo@yahoo.com";

async function translateOne(text: string, target: string): Promise<string> {
  const key = `${target}::${text}`;
  const cached = cache.get(key);
  if (cached) return cached;
  if (!text.trim()) return text;

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=id|${target}&de=${encodeURIComponent(CONTACT_EMAIL)}`
    );
    const data = await res.json();
    const translated: unknown = data?.responseData?.translatedText;
    const isQuotaWarning =
      typeof translated === "string" &&
      (translated.includes("MYMEMORY WARNING") ||
        translated.includes("QUERY LENGTH LIMIT") ||
        data?.responseStatus === 403);

    if (typeof translated === "string" && translated.trim() && !isQuotaWarning) {
      cache.set(key, translated);
      persistCache();
      return translated;
    }
  } catch {
    // network hiccup — just fall back to original text below
  }
  return text;
}

// Translate in small concurrent batches so we don't hammer the free API
async function translateBatch(texts: string[], target: string) {
  const pending = texts.filter((t) => !cache.has(`${target}::${t}`));
  const chunkSize = 5;
  for (let i = 0; i < pending.length; i += chunkSize) {
    const chunk = pending.slice(i, i + chunkSize);
    await Promise.all(chunk.map((text) => translateOne(text, target)));
  }
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState("id");
  const [loading, setLoading] = useState(false);
  const [, bump] = useState(0);
  const registered = useRef<Set<string>>(new Set());

  const setLang = useCallback(async (newLang: string) => {
    if (newLang === "id") {
      setLangState("id");
      return;
    }
    setLangState(newLang);
    setLoading(true);
    await translateBatch(Array.from(registered.current), newLang);
    setLoading(false);
    bump((n) => n + 1);
  }, []);

  const t = useCallback(
    (text: string) => {
      registered.current.add(text);
      if (lang === "id") return text;
      return cache.get(`${lang}::${text}`) ?? text;
    },
    [lang]
  );

  return (
    <TranslationContext.Provider value={{ lang, loading, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(TranslationContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return ctx;
}
