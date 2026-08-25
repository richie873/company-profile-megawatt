"use client";

import { useTranslation } from "@/components/TranslationProvider";

const SERVICES = [
  {
    code: "01",
    title: "Electrical Motor Rewinding",
    desc: "Perbaikan dan rewinding untuk berbagai jenis motor dan peralatan listrik industri, dari low voltage hingga high voltage.",
  },
  {
    code: "02",
    title: "Mechanical Services",
    desc: "Layanan perbaikan dan pemeliharaan komponen mekanikal untuk mendukung performa mesin industri Anda.",
  },
  {
    code: "03",
    title: "Transformer Maintenance",
    desc: "Perawatan dan pemeriksaan transformator untuk memastikan performa optimal dan keamanan operasional.",
  },
];

export default function ServicesGrid() {
  const { t } = useTranslation();
  return (
    <section id="layanan" className="mx-auto max-w-7xl bg-paper px-6 py-28 lg:px-10">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            {t("Layanan Kami")}
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold tracking-tight text-ink">
            {t("Tiga layanan inti, satu standar kualitas.")}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          {t(
            "Setiap pekerjaan melalui pemeriksaan dan pengujian sebelum unit dikembalikan ke pelanggan."
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3">
        {SERVICES.map((service) => (
          <div
            key={service.code}
            className="group border-b border-r border-line px-6 py-10 first:border-l"
          >
            <span className="eyebrow text-xs text-muted">{service.code}</span>
            <h3 className="mt-6 font-display text-xl font-semibold text-ink">
              {t(service.title)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t(service.desc)}
            </p>
            <a
              href="#kontak"
              className="mt-6 inline-block text-sm font-medium text-ink transition-colors hover:text-blue"
            >
              {t("Lebih Detail")} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
