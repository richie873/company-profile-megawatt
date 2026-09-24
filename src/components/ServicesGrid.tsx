"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ArrowIcon from "@/components/ArrowIcon";
import { IMAGES } from "@/lib/site-images";

const SERVICES = [
  {
    code: "01",
    title: "Electrical Motor Rewinding",
    desc: "Perbaikan dan rewinding untuk berbagai jenis motor dan peralatan listrik industri, dari low voltage hingga high voltage.",
    image: IMAGES.services.rewinding,
  },
  {
    code: "02",
    title: "Mechanical Services",
    desc: "Layanan perbaikan dan pemeliharaan komponen mekanikal untuk mendukung performa mesin industri Anda.",
    image: IMAGES.services.mechanical,
  },
  {
    code: "03",
    title: "Transformer Maintenance",
    desc: "Perawatan dan pemeriksaan transformator untuk memastikan performa optimal dan keamanan operasional.",
    image: IMAGES.services.transformer,
  },
];

export default function ServicesGrid() {
  const { t } = useTranslation();
  return (
    <section id="layanan" className="bg-panel py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Layanan Kami" title="Tiga layanan inti, satu standar kualitas." />
          <p className="max-w-sm text-base leading-relaxed text-muted">
            {t(
              "Setiap pekerjaan melalui pemeriksaan dan pengujian sebelum unit dikembalikan ke pelanggan."
            )}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.code} delay={i * 100}>
              <a
                href="#kontak"
                className="group flex h-full flex-col bg-paper transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(15,30,61,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <span
                      className="absolute inset-0 flex items-center justify-center font-display text-7xl font-semibold text-white/10"
                      aria-hidden="true"
                    >
                      {s.code}
                    </span>
                  )}
                  <span className="absolute left-0 top-0 bg-paper px-3 py-2 font-data text-xs text-ink">
                    {s.code}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink">
                    {t(s.title)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(s.desc)}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-blue">
                    {t("Lebih Detail")}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
