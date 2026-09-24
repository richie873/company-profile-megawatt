"use client";

import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

// Alur disusun dari layanan yang sudah Anda sebutkan di situs
// (antar-jemput, pemeriksaan, pengujian, garansi). Sesuaikan jika praktiknya berbeda.
const STEPS = [
  {
    title: "Penjemputan Unit",
    desc: "Tim kami menjemput motor dari lokasi Anda, tanpa biaya antar-jemput.",
  },
  {
    title: "Inspeksi & Diagnosis",
    desc: "Pemeriksaan menyeluruh untuk menemukan sumber kerusakan dan menentukan lingkup perbaikan.",
  },
  {
    title: "Rewinding & Perbaikan",
    desc: "Penggulungan ulang dan perbaikan komponen elektrikal maupun mekanikal oleh teknisi berpengalaman.",
  },
  {
    title: "Pengujian",
    desc: "Setiap unit diuji sebelum dikembalikan untuk memastikan performa sesuai standar.",
  },
  {
    title: "Pengiriman & Garansi",
    desc: "Unit dikirim kembali siap pakai, dengan garansi yang disesuaikan jenis pekerjaan.",
  },
];

export default function ProcessSection() {
  const { t } = useTranslation();
  return (
    <section id="proses" className="bg-navy py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <SectionHeading invert eyebrow="Cara Kami Bekerja" title="Dari penjemputan hingga motor kembali berputar." />
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-5 md:gap-x-0">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative md:pr-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-bright font-data text-sm text-blue-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="hidden h-px flex-1 bg-line-invert md:block" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-white">{t(step.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-invert">{t(step.desc)}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
