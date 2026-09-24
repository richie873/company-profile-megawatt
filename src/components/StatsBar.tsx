"use client";

import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";

const STATS = [
  { value: "10+", unit: "tahun", label: "Pengalaman rewinding & perbaikan motor listrik" },
  { value: "3", unit: "workshop", label: "Tangerang, Bekasi & Mojokerto" },
  { value: "6", unit: "sektor", label: "Industri yang kami layani" },
  { value: "24/7", unit: "", label: "Layanan darurat & antar-jemput unit" },
];

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section aria-label={t("Megawatt dalam angka")} className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className={`py-12 lg:py-16 ${i % 2 === 1 ? "pl-6" : "pr-6"} lg:px-8 lg:first:pl-0 ${
              i > 0 ? "lg:border-l lg:border-line" : ""
            } ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""} ${
              i >= 2 ? "border-t border-line lg:border-t-0" : ""
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold tracking-tight text-ink lg:text-6xl">
                {stat.value}
              </span>
              {stat.unit && <span className="text-base text-muted">{t(stat.unit)}</span>}
            </div>
            <p className="mt-3 max-w-[24ch] text-sm leading-snug text-muted">{t(stat.label)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
