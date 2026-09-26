"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import ArrowIcon from "@/components/ArrowIcon";
import CTASection from "@/components/CTASection";
import { NEWS, hasBody, type NewsItem } from "@/content/site";
import { formatDate } from "@/lib/format";

const sorted = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

/** Membungkus dengan Link hanya jika artikel sudah punya isi. */
function MaybeLink({ n, className, children }: { n: NewsItem; className: string; children: ReactNode }) {
  return hasBody(n) ? (
    <Link href={`/berita/${n.slug}`} className={className}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

function Meta({ n }: { n: NewsItem }) {
  const { t, lang } = useTranslation();
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
      {n.category && <span className="eyebrow text-[11px] text-blue">{t(n.category)}</span>}
      <time dateTime={n.date} className="font-data text-muted">
        {formatDate(n.date, lang)}
      </time>
    </p>
  );
}

export default function NewsPage() {
  const { t } = useTranslation();
  const [featured, ...rest] = sorted;

  return (
    <>
      <PageHero
        eyebrow="Berita"
        title="Wawasan & kabar terbaru."
        intro="Artikel teknis seputar perawatan motor listrik dan transformator, serta kabar terbaru dari Megawatt."
        crumbs={[{ label: "Berita" }]}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {!featured ? (
            <EmptyState title="Belum ada berita." body="Nantikan kabar terbaru dari kami di halaman ini." />
          ) : (
            <>
              {/* Artikel utama */}
              <Reveal>
                <MaybeLink n={featured} className="group grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy lg:col-span-7">
                    {featured.image && (
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        priority
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center lg:col-span-5">
                    <Meta n={featured} />
                    <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-blue sm:text-4xl">
                      {t(featured.title)}
                    </h2>
                    {featured.excerpt && (
                      <p className="mt-4 text-base leading-relaxed text-muted">{t(featured.excerpt)}</p>
                    )}
                    {hasBody(featured) && (
                      <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-blue">
                        {t("Baca selengkapnya")}
                        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    )}
                  </div>
                </MaybeLink>
              </Reveal>

              {/* Artikel lainnya */}
              {rest.length > 0 && (
                <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((n, i) => (
                    <Reveal key={n.slug} delay={(i % 3) * 80} className="h-full">
                      <MaybeLink n={n} className="group flex h-full flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                          {n.image && (
                            <Image
                              src={n.image}
                              alt=""
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          )}
                        </div>
                        <div className="mt-5 flex flex-1 flex-col">
                          <Meta n={n} />
                          <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-blue">
                            {t(n.title)}
                          </h2>
                          {n.excerpt && <p className="mt-3 text-sm leading-relaxed text-muted">{t(n.excerpt)}</p>}
                          {hasBody(n) && (
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-blue">
                              {t("Baca selengkapnya")}
                              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          )}
                        </div>
                      </MaybeLink>
                    </Reveal>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
