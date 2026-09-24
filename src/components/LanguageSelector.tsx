"use client";

import { useTranslation } from "@/components/TranslationProvider";

const LANGUAGES = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "zh-CN", label: "中" },
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

  const currentIndex = LANGUAGES.findIndex((l) => l.code === currentLang);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;
  const current = LANGUAGES[activeIndex];

  const handleClick = () => {
    const nextIndex = (activeIndex + 1) % LANGUAGES.length;
    setLang(LANGUAGES[nextIndex].code);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Ganti bahasa (saat ini: ${current.label})`}
      title={`Ganti bahasa (saat ini: ${current.label})`}
      className="relative flex h-9 items-center gap-1.5 px-2.5 text-ink transition-colors hover:border-blue hover:text-blue"
    >
      <GlobeIcon className="h-4 w-4" />
      <span className="text-xs font-semibold">{current.label}</span>
      {loading && (
        <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-blue" />
      )}
    </button>
  );
}