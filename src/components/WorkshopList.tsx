"use client";

import { useTranslation } from "@/components/TranslationProvider";
import ArrowIcon from "@/components/ArrowIcon";
import Reveal from "@/components/Reveal";
import { WORKSHOP, hasWorkshop, mapsLink } from "@/content/site";

/** Pengingat yang hanya terlihat saat development (npm run dev). */
export function WorkshopReminder() {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="border-2 border-dashed border-blue bg-blue-soft p-6 text-sm text-ink">
      <strong>Pengingat:</strong> alamat workshop belum diisi. Isi <code>WORKSHOP</code> di{" "}
      <code>src/content/site.ts</code>. Kotak ini hanya terlihat saat development.
    </div>
  );
}

export default function WorkshopList() {
  const { t } = useTranslation();
  if (!hasWorkshop()) return <WorkshopReminder />;

  return (
    <Reveal>
      <article className="grid grid-cols-1 gap-8 border-t-2 border-blue bg-paper p-8 md:grid-cols-12 md:items-end lg:p-12">
        <div className="md:col-span-8">
          <p className="eyebrow text-[11px] text-muted">{t("Workshop")}</p>
          <h3 className="mt-2 font-display text-3xl font-semibold text-ink">{WORKSHOP.city}</h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{t(WORKSHOP.address)}</p>
        </div>
        <div className="md:col-span-4 md:text-right">
          <a
            href={mapsLink(WORKSHOP.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-navy px-5 py-2.5 text-[13px] sm:px-6 sm:py-3.5 sm:text-sm font-semibold text-white transition-colors hover:bg-blue"
          >
            {t("Lihat di Google Maps")}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}
