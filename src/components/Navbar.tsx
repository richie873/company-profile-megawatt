"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GoogleTranslate from "@/components/GoogleTranslate";
import LanguageSelector from "@/components/LanguageSelector";

const NAV_LINKS = [
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Industri", href: "#industri" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-paper/95 backdrop-blur border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.02)]"
          : "bg-paper/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="#top" className="flex items-center">
          <Image
            src="/logo-megawatt.webp"
            alt="Megawatt Power Listrindo"
            width={500}
            height={92}
            priority
            className="h-9 w-auto object-contain lg:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <GoogleTranslate />
          <LanguageSelector />

          <a
            href="#kontak"
            className="hidden rounded-none px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue md:inline-block"
          >
            Request Konsultasi
          </a>

          <button className="text-sm text-ink md:hidden" aria-label="Buka menu">
            Menu
          </button>
        </div>
      </nav>
    </header>
  );
}
