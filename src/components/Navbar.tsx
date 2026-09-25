"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/components/TranslationProvider";
import { NEWS, PROJECTS, SERVICES } from "@/content/site";

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const NAV: NavItem[] = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  {
    label: "Layanan",
    href: "/layanan",
    children: SERVICES.map((s) => ({ label: s.title, href: `/layanan/${s.slug}` })),
  },
  { label: "Industri", href: "/industri" },
  { label: "Fasilitas", href: "/fasilitas" },
  // Muncul otomatis setelah data diisi di src/content/site.ts
  ...(PROJECTS.length ? [{ label: "Portofolio", href: "/portofolio" }] : []),
  ...(NEWS.length ? [{ label: "Berita", href: "/berita" }] : []),
  { label: "Kontak", href: "/kontak" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup dropdown saat klik di luar / tekan Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Kunci scroll halaman saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-line bg-paper/95 backdrop-blur"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <nav ref={navRef} className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" onClick={closeAll} className="flex items-center" aria-label={t("Beranda")}>
          <Image
            src="/logo-megawatt.webp"
            alt="Megawatt Power Listrindo"
            width={500}
            height={92}
            priority
            className="h-9 w-auto object-contain lg:h-10"
          />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setDropdown(item.href)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  type="button"
                  aria-expanded={dropdown === item.href}
                  aria-haspopup="true"
                  onClick={() => setDropdown((d) => (d === item.href ? null : item.href))}
                  className={`flex items-center gap-1.5 py-2 text-sm transition-colors hover:text-ink ${
                    isActive(item.href) ? "font-medium text-ink" : "text-muted"
                  }`}
                >
                  {t(item.label)}
                  <Chevron open={dropdown === item.href} />
                </button>
                {dropdown === item.href && (
                  <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3">
                    <div className="border border-line bg-paper p-2 shadow-[0_20px_50px_-20px_rgba(15,30,61,0.35)]">
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="block px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-panel hover:text-blue"
                      >
                        {t("Semua layanan")}
                      </Link>
                      <div className="my-1 h-px bg-line" />
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={closeAll}
                          className={`block px-4 py-3 text-sm transition-colors hover:bg-panel hover:text-blue ${
                            pathname === c.href ? "text-blue" : "text-ink"
                          }`}
                        >
                          {t(c.label)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-sm transition-colors hover:text-ink ${
                    isActive(item.href) ? "font-medium text-ink" : "text-muted"
                  }`}
                >
                  {t(item.label)}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-blue" aria-hidden="true" />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSelector />
          <Link
            href="/kontak"
            className="hidden border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue lg:inline-block"
          >
            {t("Request Konsultasi")}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-label={mobileOpen ? t("Tutup menu") : t("Buka menu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile */}
      {mobileOpen && (
        <div className="h-[calc(100dvh-73px)] overflow-y-auto border-t border-line bg-paper px-6 pb-10 lg:hidden">
          <ul>
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={closeAll}
                  className={`block py-4 font-display text-xl font-semibold ${
                    isActive(item.href) ? "text-blue" : "text-ink"
                  }`}
                >
                  {t(item.label)}
                </Link>
                {item.children && (
                  <ul className="-mt-1 pb-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={closeAll}
                          className={`block py-2 pl-4 text-sm ${pathname === c.href ? "text-blue" : "text-muted"}`}
                        >
                          {t(c.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/kontak"
            onClick={closeAll}
            className="mt-8 flex items-center justify-center bg-blue px-6 py-4 text-sm font-semibold text-white"
          >
            {t("Request Konsultasi")}
          </Link>
        </div>
      )}
    </header>
  );
}
