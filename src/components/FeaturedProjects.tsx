"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ArrowIcon from "@/components/ArrowIcon";
import { PROJECTS } from "@/content/site";

// Proyek yang ditampilkan di halaman depan (berdasarkan judul di src/content/site.ts)
const FEATURED = [
  "Overhaul Generator 55 MW",
  "Overhaul Motor 2.500 kW",
  "Alignment Laser 2.860 kW",
];

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const items = FEATURED.map((title) => PROJECTS.find((p) => p.title === title)).filter(
    (p): p is (typeof PROJECTS)[number] => Boolean(p?.image)
  );
  if (items.length === 0) return null;

  const [main, ...side] = items;

  return (
    <section id="proyek" className="bg-paper py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Proyek Terpilih" title="Hasil kerja nyata, di lapangan." />
          <Link
            href="/portofolio"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            {t("Lihat semua portofolio")}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Proyek utama — foto besar */}
          <Reveal className="lg:col-span-7">
            <Link href="/portofolio" className="group relative block aspect-[4/5] overflow-hidden bg-navy sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]">
              <Image
                src={main.image!}
                alt={t(main.title)}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-10">
                {main.client && <p className="eyebrow text-[11px] text-white/80">{main.client}</p>}
                <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">{t(main.title)}</h3>
              </div>
            </Link>
          </Reveal>

          {/* Dua proyek pendamping */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {side.map((p, i) => (
              <Reveal key={p.title} delay={(i + 1) * 100}>
                <Link href="/portofolio" className="group relative block aspect-[4/3] overflow-hidden bg-navy lg:aspect-[16/10]">
                  <Image
                    src={p.image!}
                    alt={t(p.title)}
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    {p.client && <p className="eyebrow text-[11px] text-white/80">{p.client}</p>}
                    <h3 className="mt-1 font-display text-xl font-semibold leading-snug">{t(p.title)}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
