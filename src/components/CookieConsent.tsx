"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import {
  OPEN_SETTINGS_EVENT,
  getConsent,
  saveConsent,
  useConsent,
  type ConsentChoices,
} from "@/lib/consent";

// Semua teks dikumpulkan di sini supaya didaftarkan ke sistem terjemahan
// sejak awal, termasuk teks panel pengaturan yang belum terbuka.
const TEXT = {
  bannerTitle: "Kami menghargai privasi Anda",
  bannerBody:
    "Kami menggunakan cookie agar situs ini berfungsi dengan baik. Dengan persetujuan Anda, kami juga menggunakan cookie untuk mengingat preferensi Anda dan memahami bagaimana situs ini digunakan. Anda dapat menerima semua, menolak, atau memilih sendiri.",
  privacyLink: "Kebijakan Privasi",
  settings: "Pengaturan cookie",
  rejectAll: "Tolak semua",
  acceptAll: "Terima semua cookie",
  centerTitle: "Pusat Preferensi Privasi",
  close: "Tutup",
  alwaysActive: "Selalu aktif",
  confirm: "Konfirmasi pilihan saya",
  allowAll: "Izinkan semua",
  reopen: "Buka pengaturan cookie",
  privacyTab: "Privasi Anda",
  privacyBody:
    "Saat Anda mengunjungi situs web, situs tersebut dapat menyimpan atau mengambil informasi di browser Anda, biasanya dalam bentuk cookie. Informasi ini dapat berkaitan dengan Anda, preferensi Anda, atau perangkat Anda, dan umumnya dipakai agar situs bekerja sesuai harapan. Informasi ini biasanya tidak mengidentifikasi Anda secara langsung. Pilih kategori di samping untuk mempelajari lebih lanjut dan mengubah pengaturan. Menonaktifkan beberapa jenis cookie dapat memengaruhi pengalaman Anda di situs ini.",
  necessaryTab: "Cookie wajib",
  necessaryBody:
    "Cookie ini diperlukan agar situs berfungsi dan tidak dapat dinonaktifkan. Cookie ini hanya diatur sebagai respons atas tindakan Anda, seperti menyimpan pilihan privasi ini. Cookie ini tidak menyimpan informasi yang mengidentifikasi Anda secara pribadi.",
  functionalTab: "Cookie fungsional",
  functionalBody:
    "Cookie ini menyimpan hasil terjemahan halaman di browser Anda, sehingga saat Anda berganti bahasa, halaman tampil lebih cepat dan tidak perlu diterjemahkan ulang setiap kali berkunjung. Jika dinonaktifkan, terjemahan tetap berfungsi tetapi dimuat ulang setiap kunjungan.",
  analyticsTab: "Cookie analitik",
  analyticsBody:
    "Cookie ini membantu kami menghitung kunjungan dan sumber lalu lintas agar kami dapat mengukur dan meningkatkan kinerja situs. Semua informasi yang dikumpulkan bersifat agregat dan anonim. Jika dinonaktifkan, kunjungan Anda tidak akan tercatat dalam statistik kami.",
};

type TabId = "privacy" | "necessary" | "functional" | "analytics";

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9 3 3 0 0 1-3.5-3A3 3 0 0 1 14 5.5 3 3 0 0 1 12 3Z" />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
        checked ? "bg-blue" : "bg-ink/20"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-paper shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const tx = Object.fromEntries(
    Object.entries(TEXT).map(([k, v]) => [k, t(v)])
  ) as typeof TEXT;

  const consent = useConsent();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("privacy");
  const [draft, setDraft] = useState<ConsentChoices>({
    functional: false,
    analytics: false,
  });
  const dialogRef = useRef<HTMLDivElement>(null);

  const openSettings = useCallback(() => {
    const saved = getConsent();
    setDraft({
      functional: saved?.functional ?? false,
      analytics: saved?.analytics ?? false,
    });
    setActiveTab("privacy");
    setModalOpen(true);
  }, []);

  // Memungkinkan tombol lain (footer, halaman kebijakan privasi) membuka panel ini
  useEffect(() => {
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, [openSettings]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  function decide(choices: ConsentChoices) {
    saveConsent(choices);
    setModalOpen(false);
  }

  if (consent === undefined) return null; // belum ter-hydrate

  const showBanner = consent === null && !modalOpen;

  const tabs: { id: TabId; label: string }[] = [
    { id: "privacy", label: tx.privacyTab },
    { id: "necessary", label: tx.necessaryTab },
    { id: "functional", label: tx.functionalTab },
    { id: "analytics", label: tx.analyticsTab },
  ];

  const panel: Record<TabId, { body: string; control: ReactNode }> = {
    privacy: { body: tx.privacyBody, control: null },
    necessary: {
      body: tx.necessaryBody,
      control: (
        <span className="text-sm font-semibold text-blue">{tx.alwaysActive}</span>
      ),
    },
    functional: {
      body: tx.functionalBody,
      control: (
        <Switch
          label={tx.functionalTab}
          checked={draft.functional}
          onChange={(v) => setDraft((d) => ({ ...d, functional: v }))}
        />
      ),
    },
    analytics: {
      body: tx.analyticsBody,
      control: (
        <Switch
          label={tx.analyticsTab}
          checked={draft.analytics}
          onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
        />
      ),
    },
  };

  const activeLabel = tabs.find((x) => x.id === activeTab)!.label;

  const btnOutline =
    "border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
  const btnPrimary =
    "bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

  const modal = modalOpen ? (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-4"
      onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-center-title"
        className="flex max-h-[88vh] w-full max-w-4xl flex-col bg-paper shadow-xl outline-none"
      >
        <div className="flex items-start justify-between gap-6 border-b border-line px-6 py-6 lg:px-8">
          <h2
            id="cookie-center-title"
            className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          >
            {tx.centerTitle}
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            aria-label={tx.close}
            className="text-3xl font-light leading-none text-ink transition-colors hover:text-blue"
          >
            ×
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[240px_1fr]">
          <ul className="flex overflow-x-auto border-b border-line md:block md:overflow-visible md:border-b-0 md:border-r">
            {tabs.map((tab) => (
              <li key={tab.id} className="shrink-0">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full border-b-2 px-5 py-4 text-left text-sm font-medium transition-colors md:border-b-0 md:border-l-2 ${
                    activeTab === tab.id
                      ? "border-blue bg-panel text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="min-h-0 overflow-y-auto px-6 py-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-lg font-semibold text-ink">
                {activeLabel}
              </h3>
              {panel[activeTab].control}
            </div>
            <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted">
              {panel[activeTab].body}
            </p>
            {activeTab === "privacy" && (
              <Link
                href="/kebijakan-privasi"
                className="mt-4 inline-block text-sm font-medium text-blue underline underline-offset-4 hover:text-navy"
              >
                {tx.privacyLink}
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-line px-6 py-5 sm:flex-row sm:justify-end lg:px-8">
          <button
            className={btnOutline}
            onClick={() => decide({ functional: false, analytics: false })}
          >
            {tx.rejectAll}
          </button>
          <button className={btnOutline} onClick={() => decide(draft)}>
            {tx.confirm}
          </button>
          <button
            className={btnPrimary}
            onClick={() => decide({ functional: true, analytics: true })}
          >
            {tx.allowAll}
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      {showBanner && (
        <div
          role="region"
          aria-label={tx.bannerTitle}
          className="fixed inset-x-0 bottom-0 z-[65] border-t border-line bg-paper shadow-[0_-8px_30px_rgba(15,30,61,0.12)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:gap-12 lg:px-10">
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold text-ink">
                {tx.bannerTitle}
              </h2>
              <p className="mt-2 max-w-[80ch] text-sm leading-relaxed text-muted">
                {tx.bannerBody}{" "}
                <Link
                  href="/kebijakan-privasi"
                  className="font-medium text-blue underline underline-offset-4 hover:text-navy"
                >
                  {tx.privacyLink}
                </Link>
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
              <button
                onClick={openSettings}
                className="px-2 py-3 text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-blue"
              >
                {tx.settings}
              </button>
              <button
                className={btnOutline}
                onClick={() => decide({ functional: false, analytics: false })}
              >
                {tx.rejectAll}
              </button>
              <button
                className={btnPrimary}
                onClick={() => decide({ functional: true, analytics: true })}
              >
                {tx.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {consent !== null && !modalOpen && (
        <button
          onClick={openSettings}
          aria-label={tx.reopen}
          title={tx.reopen}
          className="fixed bottom-5 left-5 z-[65] flex h-11 w-11 items-center justify-center border border-line bg-paper text-ink shadow-md transition-colors hover:border-blue hover:text-blue"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <CookieIcon className="h-5 w-5" />
        </button>
      )}

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
