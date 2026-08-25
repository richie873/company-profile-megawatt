"use client";

import { useTranslation } from "@/components/TranslationProvider";

const STATS = [
  { value: "10+", unit: "tahun", label: "Pengalaman rewinding & perbaikan" },
  { value: "3", unit: "workshop", label: "Tangerang, Bekasi & Mojokerto" },
  { value: "6", unit: "sektor", label: "Industri yang kami layani" },
  { value: "24/7", unit: "", label: "Layanan darurat & antar-jemput" },
];

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section className="relative z-10 border-y border-line bg-panel">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-6 py-10 first:pl-0">
            <div className="flex items-baseline gap-1 font-data">
              <span className="text-3xl font-medium text-ink lg:text-4xl">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-sm text-muted">{t(stat.unit)}</span>
              )}
            </div>
            <p className="mt-2 max-w-[16ch] text-sm leading-snug text-muted">
              {t(stat.label)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
