"use client";

import { useTranslation } from "@/components/TranslationProvider";

const REASONS = [
  {
    num: "01",
    title: "Pelayanan 24 Jam",
    desc: "Layanan tersedia 24 jam untuk memastikan operasional industri Anda tetap berjalan tanpa hambatan.",
  },
  {
    num: "02",
    title: "Gratis Antar-Jemput",
    desc: "Layanan antar-jemput unit gratis untuk kemudahan dan efisiensi pelanggan.",
  },
  {
    num: "03",
    title: "Layanan Pemeriksaan",
    desc: "Didukung fasilitas pemeriksaan lengkap untuk hasil kerja yang akurat dan terpercaya.",
  },
  {
    num: "04",
    title: "Harga & Kualitas",
    desc: "Kombinasi kualitas pekerjaan tinggi dengan harga yang kompetitif.",
  },
  {
    num: "05",
    title: "Fleksibilitas Garansi",
    desc: "Garansi layanan yang fleksibel, disesuaikan dengan kebutuhan dan jenis pekerjaan.",
  },
  {
    num: "06",
    title: "Layanan Servis",
    desc: "Layanan servis profesional untuk perbaikan dan perawatan berbagai peralatan elektromekanis.",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();
  return (
    <section id="keunggulan" className="bg-panel py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-2 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
          {t("Keunggulan")}
        </p>
        <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold tracking-tight text-ink">
          {t("Mengapa memilih Megawatt Power Listrindo?")}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.num} className="border-t border-line pt-6">
              <span className="font-data text-sm text-muted">
                {reason.num}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {t(reason.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(reason.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
