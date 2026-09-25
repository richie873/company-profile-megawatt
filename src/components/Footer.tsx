"use client";

import Image from "next/image";
import Link from "next/link";
import { openCookieSettings } from "@/lib/consent";
import { COMPANY, NEWS, PROJECTS, SERVICES, WORKSHOP, hasWorkshop } from "@/content/site";
import { useTranslation } from "@/components/TranslationProvider";

const COLUMNS = [
  {
    title: "Layanan",
    links: SERVICES.map((svc) => ({ label: svc.title, href: `/layanan/${svc.slug}` })),
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/tentang-kami" },
      { label: "Industri", href: "/industri" },
      { label: "Fasilitas", href: "/fasilitas" },
      ...(PROJECTS.length ? [{ label: "Portofolio", href: "/portofolio" }] : []),
      ...(NEWS.length ? [{ label: "Berita", href: "/berita" }] : []),
      { label: "Kontak", href: "/kontak" },
    ],
  },
];

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto bg-navy pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-line-invert pb-16 md:grid-cols-5">
          <div className="md:col-span-2">
            <Image
              src="/logo-megawatt.webp"
              alt="Megawatt Power Listrindo"
              width={500}
              height={92}
              className="h-8 w-auto object-contain opacity-95 brightness-0 invert"
            />
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted-invert">
              {t(
                "Mitra terpercaya untuk layanan penggulungan ulang, perbaikan, dan pemeliharaan motor listrik industri di seluruh Indonesia."
              )}
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/80">
              <p>
                <a href={COMPANY.phoneHref} className="hover:text-white">{COMPANY.phoneDisplay}</a>
              </p>
              <p>
                <a href={`mailto:${COMPANY.email}`} className="break-all hover:text-white">{COMPANY.email}</a>
              </p>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-xs text-muted-invert">{t(col.title)}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {hasWorkshop() && (
            <div>
              <h4 className="eyebrow text-xs text-muted-invert">{t("Workshop")}</h4>
              <p className="mt-4 text-sm font-medium text-white">{WORKSHOP.city}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-invert">{t(WORKSHOP.address)}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-muted-invert md:flex-row">
          <span>
            © {new Date().getFullYear()} {t("PT. Megawatt Power Listrindo.")}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/kebijakan-privasi" className="hover:text-white">
              {t("Kebijakan Privasi")}
            </Link>
            <button type="button" onClick={openCookieSettings} className="hover:text-white">
              {t("Pengaturan Cookie")}
            </button>
            {hasWorkshop() && <span className="font-data">{WORKSHOP.city}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
