"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import ArrowIcon from "@/components/ArrowIcon";
import CTASection from "@/components/CTASection";
import { NEWS, hasBody, type NewsItem } from "@/content/site";
import { formatDate } from "@/lib/format";

export default function NewsDetailPage({ article }: { article: NewsItem }) {
  const { t, lang } = useTranslation();
  const related = NEWS.filter((n) => n.slug !== article.slug && hasBody(n))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <article>
        <header className="bg-navy pt-28 pb-12 text-white sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20">
          <div className="mx-auto max-w-3xl px-6">
            <nav aria-label="Breadcrumb" className="text-xs text-white/70">
              <Link href="/" className="hover:text-white">{t("Beranda")}</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <Link href="/berita" className="hover:text-white">{t("Berita")}</Link>
            </nav>
            <p className="mt-10 flex flex-wrap items-center gap-x-3 text-xs">
              {article.category && <span className="eyebrow text-[11px] text-blue-bright">{t(article.category)}</span>}
              <time dateTime={article.date} className="font-data text-white/70">
                {formatDate(article.date, lang)}
              </time>
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {t(article.title)}
            </h1>
          </div>
        </header>

        {article.image && (
          <div className="mx-auto -mt-px max-w-5xl px-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-panel">
              <Image src={article.image} alt="" fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
          <div className="space-y-5 text-base leading-relaxed sm:space-y-6 sm:text-lg text-ink/85">
            {article.body?.map((block, i) =>
              block.startsWith("## ") ? (
                <h2 key={i} className="!mt-12 font-display text-2xl font-semibold tracking-tight text-ink">
                  {t(block.slice(3))}
                </h2>
              ) : (
                <p key={i}>{t(block)}</p>
              )
            )}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/berita"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-blue"
            >
              <ArrowIcon className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              {t("Kembali ke semua berita")}
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line bg-panel py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-2xl font-semibold text-ink">{t("Artikel lainnya")}</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((n) => (
                <Link key={n.slug} href={`/berita/${n.slug}`} className="group">
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                    {n.image && (
                      <Image src={n.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                  </div>
                  <time dateTime={n.date} className="mt-4 block font-data text-xs text-muted">
                    {formatDate(n.date, lang)}
                  </time>
                  <p className="mt-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-blue">
                    {t(n.title)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
