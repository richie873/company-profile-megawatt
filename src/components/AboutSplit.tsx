"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ArrowIcon from "@/components/ArrowIcon";
import { IMAGES } from "@/lib/site-images";

export default function AboutSplit() {
  const { t } = useTranslation();
  return (
    <section id="tentang" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy sm:aspect-[5/4] lg:aspect-[4/5]">
            {IMAGES.about && (
              <Image
                src={IMAGES.about}
                alt={t("Teknisi Megawatt memeriksa motor listrik di workshop")}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
            {/* Kartu keanggotaan EASA */}
            <div className="absolute bottom-0 left-0 max-w-xs bg-paper p-6 lg:p-8">
              <p className="eyebrow text-[11px] text-muted">{t("Anggota")}</p>
              <p className="mt-2 font-display text-3xl font-semibold text-ink">EASA</p>
              <p className="mt-1 text-sm leading-snug text-muted">
                {t("Electrical Apparatus Service Association")}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <SectionHeading
            eyebrow="Tentang Kami"
            title="Spesialis perbaikan & penggulungan ulang motor listrik."
          />
          <p className="mt-8 text-lg leading-relaxed text-ink/80">
            {t(
              "PT. Megawatt Power Listrindo bergerak di bidang jasa perbaikan dan rewinding electromotor, dari tegangan rendah hingga tegangan tinggi. Kami menghadirkan solusi menyeluruh untuk perawatan, perbaikan, dan peningkatan performa peralatan elektromekanis di berbagai sektor industri."
            )}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted">
            {t(
              "Dengan mengutamakan kualitas pekerjaan, ketepatan waktu, dan kepuasan pelanggan, kami berkomitmen menjadi mitra teknik yang dapat diandalkan untuk menjaga performa dan efisiensi operasional mesin industri Anda."
            )}
          </p>
          <Link
            href="/tentang-kami"
            className="group mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
          >
            {t("Selengkapnya tentang kami")}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
