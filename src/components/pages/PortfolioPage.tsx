"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import CTASection from "@/components/CTASection";
import { PROJECTS, SERVICES } from "@/content/site";

export default function PortfolioPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Portofolio"
        title="Pekerjaan yang telah kami selesaikan."
        intro="Sebagian proyek perbaikan dan perawatan yang kami kerjakan untuk pelanggan industri."
        crumbs={[{ label: "Portofolio" }]}
      />
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {PROJECTS.length === 0 ? (
            <EmptyState
              title="Portofolio sedang diperbarui."
              body="Kami sedang menyiapkan dokumentasi proyek. Untuk referensi pekerjaan, silakan hubungi tim kami."
            />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 80}>
                  <article>
                    <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                      {p.image && <Image src={p.image} alt={t(p.title)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />}
                    </div>
                    <p className="eyebrow mt-5 text-[11px] text-blue">
                      {t(p.industry)}
                      {p.year ? ` · ${p.year}` : ""}
                    </p>
                    <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">{t(p.title)}</h2>
                    {p.client && <p className="mt-1 text-sm text-muted">{p.client}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-muted">{t(p.summary)}</p>
                    <p className="mt-3 text-xs text-muted">
                      {t(SERVICES.find((s) => s.slug === p.service)?.title ?? "")}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}
