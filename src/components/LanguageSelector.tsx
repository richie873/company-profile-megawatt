"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "@/components/TranslationProvider";

type LangGroup = {
  region: string;
  languages: { code: string; label: string }[];
};

const GROUPS: LangGroup[] = [
  {
    region: "Asia & Oseania",
    languages: [
      { code: "en", label: "English" },
      { code: "zh-CN", label: "中文 (Mandarin)" },
      { code: "ja", label: "日本語" },
      { code: "ko", label: "한국어" },
      { code: "vi", label: "Tiếng Việt" },
      { code: "th", label: "ภาษาไทย" },
      { code: "hi", label: "हिन्दी" },
      { code: "ms", label: "Bahasa Melayu" },
      { code: "tl", label: "Filipino" },
    ],
  },
  {
    region: "Eropa",
    languages: [
      { code: "en", label: "English" },
      { code: "de", label: "Deutsch" },
      { code: "fr", label: "Français" },
      { code: "es", label: "Español" },
      { code: "it", label: "Italiano" },
      { code: "nl", label: "Nederlands" },
      { code: "pt", label: "Português" },
      { code: "ru", label: "Русский" },
      { code: "pl", label: "Polski" },
    ],
  },
  {
    region: "Amerika",
    languages: [
      { code: "en", label: "English (US)" },
      { code: "es", label: "Español" },
      { code: "pt", label: "Português (BR)" },
      { code: "fr", label: "Français (CA)" },
    ],
  },
  {
    region: "Timur Tengah & Afrika",
    languages: [
      { code: "ar", label: "العربية" },
      { code: "tr", label: "Türkçe" },
      { code: "he", label: "עברית" },
      { code: "sw", label: "Kiswahili" },
    ],
  },
];

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z" />
    </svg>
  );
}

export default function LanguageSelector() {
  const { lang: currentLang, loading, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(GROUPS[0].region);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = GROUPS.find((g) => g.region === activeTab) ?? GROUPS[0];

  const choose = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  const modal = open ? (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4">
      <div className="mx-auto flex w-full max-w-5xl max-h-[85vh] flex-1 flex-col overflow-y-auto bg-paper px-6 py-10 shadow-xl lg:px-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pilih Bahasa
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Terjemahan otomatis tersedia dalam berbagai bahasa. Kualitas
              terjemahan bersifat otomatis dan mungkin tidak sepenuhnya akurat
              untuk istilah teknis.
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup"
            className="text-3xl font-light leading-none text-ink transition-colors hover:text-blue"
          >
            ×
          </button>
        </div>

        <button
          onClick={() => choose("id")}
          className={`mt-10 flex items-center gap-3 border-y border-line py-4 text-left ${
            currentLang === "id" ? "bg-panel" : ""
          }`}
        >
          <GlobeIcon className="h-5 w-5 text-muted" />
          <span className="text-sm font-semibold text-ink">
            Bahasa Situs Asli
          </span>
          <span className="text-sm text-muted">Indonesia</span>
        </button>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-4">
          {GROUPS.map((g) => (
            <button
              key={g.region}
              onClick={() => setActiveTab(g.region)}
              className={`relative pb-2 text-sm font-medium transition-colors ${
                activeTab === g.region
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              {g.region}
              {activeTab === g.region && (
                <span className="absolute -bottom-[17px] left-0 h-0.5 w-full bg-blue" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
          {active.languages.map((item) => (
            <button
              key={item.code + item.label}
              onClick={() => choose(item.code)}
              className={`text-left text-sm font-semibold transition-colors hover:text-blue ${
                currentLang === item.code ? "text-blue" : "text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="mt-8 eyebrow text-xs text-muted">
            Menerjemahkan halaman…
          </p>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Pilih bahasa"
        className="relative flex h-9 w-9 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-blue hover:text-blue"
      >
        <GlobeIcon className="h-4 w-4" />
        {loading && (
          <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-blue" />
        )}
      </button>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
