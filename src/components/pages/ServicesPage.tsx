"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ArrowIcon from "@/components/ArrowIcon";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import { SERVICES } from "@/content/site";

export default function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Layanan"
        title="Tiga layanan inti, satu standar kualitas."
        intro="Setiap pekerjaan melalui pemeriksaan dan pengujian sebelum unit dikembalikan ke pelanggan."
        crumbs={[{ label: "Layanan" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl space-y-20 px-6 lg:space-y-28 lg:px-10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug}>
              <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Link
                  href={`/layanan/${s.slug}`}
                  className={`group relative block aspect-[4/3] overflow-hidden bg-navy lg:col-span-7 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  aria-label={t(s.title)}
                >
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-display text-8xl font-semibold text-white/10" aria-hidden="true">
                      {s.code}
                    </span>
                  )}
                </Link>
                <div className="lg:col-span-5">
                  <span className="font-data text-sm text-blue">{s.code}</span>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
                    {t(s.title)}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-muted">{t(s.intro)}</p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-8">
                    {s.scope.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-ink">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-blue" aria-hidden="true" />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/layanan/${s.slug}`}
                    className="group mt-10 inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue"
                  >
                    {t("Lihat detail layanan")}
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
