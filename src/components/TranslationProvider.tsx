"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getConsent } from "@/lib/consent";

type TranslationContextType = {
  lang: string;
  loading: boolean;
  setLang: (lang: string) => void;
  prefetch: (lang: string) => void;
  t: (text: string) => string;
};

const TranslationContext = createContext<TranslationContextType | null>(null);

// Module-level cache so translations persist across component remounts
// within the same page session. Key: `${lang}::${originalText}`.
const cache = new Map<string, string>();
// v2: menaikkan versi supaya cache lama yang berisi terjemahan salah
// (mis. teks Arab pada menu "Tentang Kami") otomatis dibuang di browser pengunjung.
const STORAGE_KEY = "mp-translation-cache-v2";

// Terjemahan manual untuk teks pendek (menu/tombol). MyMemory berbasis
// kontribusi pengguna sehingga teks pendek sering dapat hasil ngawur.
// Pakai ini juga membuat menu langsung berganti tanpa menunggu API.
const GLOSSARY: Record<string, Record<string, string>> = {
  en: {
    "Tentang Kami": "About Us",
    Layanan: "Services",
    Industri: "Industries",
    Fasilitas: "Facilities",
    Portofolio: "Portfolio",
    Berita: "News",
    Kontak: "Contact",
    "Request Konsultasi": "Request a Consultation",
    "Lihat Layanan Kami": "View Our Services",
    Beranda: "Home",
  },
  "zh-CN": {
    "Tentang Kami": "关于我们",
    Layanan: "服务",
    Industri: "行业",
    Fasilitas: "设施",
    Portofolio: "案例",
    Berita: "新闻",
    Kontak: "联系我们",
    "Request Konsultasi": "咨询申请",
    "Lihat Layanan Kami": "查看我们的服务",
    Beranda: "首页",
  },
};

const ARABIC_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
const CJK_RE = /[\u3400-\u9FFF]/;

// Tolak hasil API yang skripnya tidak cocok dengan bahasa tujuan
// (MyMemory kadang mengembalikan teks Arab/bahasa lain untuk teks pendek).
function isPlausibleTranslation(result: string, target: string) {
  if (ARABIC_RE.test(result)) return false;
  if (target === "zh-CN" && !CJK_RE.test(result)) {
    // boleh tanpa CJK hanya jika hasilnya angka/simbol/nama (tanpa huruf Latin panjang)
    return !/[A-Za-z]{4,}/.test(result);
  }
  return true;
}

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
  // Cache terjemahan hanya disimpan permanen jika pengunjung menyetujui cookie fungsional
  if (!getConsent()?.functional) return;
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

// Request yang sedang berjalan dipakai bersama, supaya teks yang sama
// tidak dikirim dua kali (mis. saat hover lalu klik).
const inflightRequests = new Map<string, Promise<string>>();

function translateOne(text: string, target: string): Promise<string> {
  const key = `${target}::${text}`;
  const manual = GLOSSARY[target]?.[text.trim()];
  if (manual) {
    cache.set(key, manual);
    return Promise.resolve(manual);
  }
  const cached = cache.get(key);
  if (cached && isPlausibleTranslation(cached, target)) return Promise.resolve(cached);
  if (!text.trim()) return Promise.resolve(text);
  const running = inflightRequests.get(key);
  if (running) return running;

  const request = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=id|${target}&de=${encodeURIComponent(CONTACT_EMAIL)}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      const translated: unknown = data?.responseData?.translatedText;
      const isQuotaWarning =
        typeof translated === "string" &&
        (translated.includes("MYMEMORY WARNING") ||
          translated.includes("QUERY LENGTH LIMIT") ||
          data?.responseStatus === 403);

      if (
        typeof translated === "string" &&
        translated.trim() &&
        !isQuotaWarning &&
        isPlausibleTranslation(translated, target)
      ) {
        cache.set(key, translated);
        return translated;
      }
    } catch {
      // network hiccup / timeout — fall back to original text below
    } finally {
      clearTimeout(timer);
      inflightRequests.delete(key);
    }
    return text;
  })();

  inflightRequests.set(key, request);
  return request;
}

// Worker pool: selalu ada beberapa request berjalan bersamaan. Tidak ada
// lagi "tunggu 5 selesai semua baru lanjut", jadi jauh lebih cepat.
const CONCURRENCY = 10;
// Render ulang paling sering tiap 150ms agar teks muncul bertahap tanpa
// membuat halaman patah-patah.
const PROGRESS_INTERVAL_MS = 150;

async function translateBatch(
  texts: string[],
  target: string,
  onProgress?: () => void
) {
  const pending = Array.from(new Set(texts)).filter(
    (t) => t.trim() && !cache.has(`${target}::${t}`)
  );
  if (pending.length === 0) return;

  let next = 0;
  let lastNotify = 0;
  let dirty = false;

  const notify = (force = false) => {
    if (!onProgress) return;
    const now = Date.now();
    if (force || now - lastNotify >= PROGRESS_INTERVAL_MS) {
      lastNotify = now;
      dirty = false;
      onProgress();
    } else {
      dirty = true;
    }
  };

  const worker = async () => {
    while (next < pending.length) {
      const text = pending[next++];
      await translateOne(text, target);
      notify();
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, pending.length) }, worker)
  );
  persistCache();
  if (dirty) notify(true);
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
    await translateBatch(Array.from(registered.current), newLang, () =>
      bump((n) => n + 1)
    );
    setLoading(false);
    bump((n) => n + 1);
  }, []);

  // Dipanggil saat pengunjung mengarahkan kursor ke tombol bahasa, sehingga
  // terjemahan sudah mulai diunduh sebelum tombol diklik.
  const prefetch = useCallback((target: string) => {
    if (target === "id") return;
    translateBatch(Array.from(registered.current), target);
  }, []);

  // Teks yang baru muncul setelah bahasa diganti (mis. saat pindah halaman)
  // dikumpulkan di sini lalu diterjemahkan setelah render.
  const pending = useRef<Set<string>>(new Set());
  const attempted = useRef<Set<string>>(new Set());
  const inflight = useRef(false);

  const t = useCallback(
    (text: string) => {
      registered.current.add(text);
      if (lang === "id") return text;
      const key = `${lang}::${text}`;
      const hit = cache.get(key);
      if (hit) return hit;
      if (!attempted.current.has(key)) pending.current.add(text);
      return text;
    },
    [lang]
  );

  useEffect(() => {
    if (lang === "id" || loading || inflight.current || pending.current.size === 0) return;
    const batch = Array.from(pending.current);
    pending.current.clear();
    batch.forEach((text) => attempted.current.add(`${lang}::${text}`));
    inflight.current = true;
    translateBatch(batch, lang, () => bump((n) => n + 1)).then(() => {
      inflight.current = false;
      bump((n) => n + 1);
    });
  });

  return (
    <TranslationContext.Provider value={{ lang, loading, setLang, prefetch, t }}>
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
