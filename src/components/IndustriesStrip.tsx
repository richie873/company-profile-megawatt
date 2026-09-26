"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";
import { IMAGES } from "@/lib/site-images";
import { INDUSTRIES } from "@/content/site";

export default function IndustriesStrip() {
  const { t } = useTranslation();
  return (
    <section id="industri" className="bg-paper py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Industri yang Kami Layani" title="Dipercaya lintas sektor industri berat." />
          <Link
            href="/industri"
            className="group inline-flex shrink-0 items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            {t("Lihat semua industri")}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-navy lg:aspect-auto lg:h-full lg:min-h-[480px]">
              {IMAGES.industries && (
                <Image
                  src={IMAGES.industries}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
          </Reveal>

          <ul className="lg:col-span-7">
            {INDUSTRIES.map((ind, i) => (
              <Reveal
                as="li"
                key={ind.name}
                delay={i * 60}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-t border-line py-6 last:border-b sm:grid-cols-[3rem_14rem_1fr]"
              >
                  <span className="font-data text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-blue">
                    {t(ind.name)}
                  </h3>
                  <p className="col-start-2 mt-1 text-sm leading-relaxed text-muted sm:col-start-3 sm:mt-0">
                    {t(ind.desc)}
                  </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
