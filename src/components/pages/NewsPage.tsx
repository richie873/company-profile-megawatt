"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import { NEWS } from "@/content/site";

export default function NewsPage() {
  const { t, lang } = useTranslation();
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "id" ? "id-ID" : lang, { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero eyebrow="Berita" title="Kabar terbaru dari Megawatt." crumbs={[{ label: "Berita" }]} />
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {NEWS.length === 0 ? (
            <EmptyState title="Belum ada berita." body="Nantikan kabar terbaru dari kami di halaman ini." />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {NEWS.map((n, i) => (
                <Reveal key={n.slug} delay={(i % 3) * 80}>
                  <article>
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy">
                      {n.image && <Image src={n.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />}
                    </div>
                    <time dateTime={n.date} className="mt-5 block font-data text-xs text-muted">
                      {fmt(n.date)}
                    </time>
                    <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">{t(n.title)}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{t(n.excerpt)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
