"use client";

import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const REASONS = [
  {
    title: "Pelayanan 24 Jam",
    desc: "Layanan tersedia 24 jam untuk memastikan operasional industri Anda tetap berjalan tanpa hambatan.",
  },
  {
    title: "Gratis Antar-Jemput",
    desc: "Layanan antar-jemput unit gratis untuk kemudahan dan efisiensi pelanggan.",
  },
  {
    title: "Layanan Pemeriksaan",
    desc: "Didukung fasilitas pemeriksaan lengkap untuk hasil kerja yang akurat dan terpercaya.",
  },
  {
    title: "Harga & Kualitas",
    desc: "Kombinasi kualitas pekerjaan tinggi dengan harga yang kompetitif.",
  },
  {
    title: "Fleksibilitas Garansi",
    desc: "Garansi layanan yang fleksibel, disesuaikan dengan kebutuhan dan jenis pekerjaan.",
  },
  {
    title: "Layanan Servis",
    desc: "Layanan servis profesional untuk perbaikan dan perawatan berbagai peralatan elektromekanis.",
  },
];

export default function WhyUs() {
  const { t } = useTranslation();
  return (
    <section id="keunggulan" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="Keunggulan" title="Mengapa memilih Megawatt?" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
              {t(
                "Motor yang berhenti berarti produksi yang berhenti. Karena itu kami membangun layanan di sekitar satu tujuan: mengembalikan peralatan Anda secepat dan seandal mungkin."
              )}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 100} className="border-t border-line py-8">
              <span className="font-data text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{t(r.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(r.desc)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
