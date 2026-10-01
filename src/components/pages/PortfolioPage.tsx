"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EmptyState from "@/components/EmptyState";
import CTASection from "@/components/CTASection";
import { PROJECTS, SERVICES, type Project } from "@/content/site";

const PAGE_SIZE = 12;

const FILTERS = [
  { id: "all", label: "Semua" },
  ...SERVICES.map((s) => ({ id: s.slug, label: s.title })),
];

function ProjectCard({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const { t } = useTranslation();
  const service = SERVICES.find((s) => s.slug === p.service);
  const meta = [p.industry && t(p.industry), p.year].filter(Boolean).join(" · ");

  return (
    <article className="group flex h-full flex-col bg-paper">
      <button
        type="button"
        onClick={onOpen}
        disabled={!p.image}
        className={`relative block aspect-[4/3] w-full overflow-hidden disabled:cursor-default ${
          p.fit === "contain" ? "bg-white" : "bg-navy"
        }`}
        aria-label={`${t("Lihat foto")}: ${t(p.title)}`}
      >
        {p.image && (
          <Image
            src={p.image}
            alt={t(p.title)}
            fill
            sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
            className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
              p.fit === "contain" ? "object-contain p-3 sm:p-4" : "object-cover"
            }`}
            style={{ objectPosition: p.focus ?? "center" }}
          />
        )}
        {service && (
          <span className="absolute left-0 top-0 bg-paper px-2.5 py-1.5 text-[10px] font-medium text-ink sm:text-[11px]">
            {t(service.title)}
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {meta && <p className="eyebrow text-[11px] text-blue">{meta}</p>}
        <h2 className="mt-1.5 font-display text-base font-semibold leading-snug text-ink sm:text-lg">{t(p.title)}</h2>
        {p.client && <p className="mt-1.5 text-xs text-muted sm:text-sm">{p.client}</p>}
        {p.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{t(p.summary)}</p>}
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<Project | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const available = FILTERS.filter(
    (f) => f.id === "all" || PROJECTS.some((p) => p.service === f.id)
  );
  const items = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.service === filter);

  return (
    <>
      <PageHero
        eyebrow="Portofolio"
        title="Pekerjaan yang telah kami selesaikan."
        intro="Sebagian proyek rewinding, overhaul, dan perbaikan yang kami kerjakan untuk pelanggan industri."
        crumbs={[{ label: "Portofolio" }]}
        image="/foto1.jpeg"
      />
      <section className="bg-paper py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {PROJECTS.length === 0 ? (
            <EmptyState
              title="Portofolio sedang diperbarui."
              body="Kami sedang menyiapkan dokumentasi proyek. Untuk referensi pekerjaan, silakan hubungi tim kami."
            />
          ) : (
            <>
              <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="tablist" aria-label={t("Filter layanan")}>
                {available.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={filter === f.id}
                    onClick={() => {
                      setFilter(f.id);
                      setVisible(PAGE_SIZE);
                    }}
                    className={`shrink-0 whitespace-nowrap border px-4 py-2 text-sm transition-colors ${
                      filter === f.id
                        ? "border-navy bg-navy text-white"
                        : "border-line bg-paper text-ink hover:border-blue hover:text-blue"
                    }`}
                  >
                    {t(f.label)}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {items.slice(0, visible).map((p, i) => (
                  <Reveal key={p.title} delay={(i % 4) * 70} className="h-full">
                    <ProjectCard p={p} onOpen={() => setOpen(p)} />
                  </Reveal>
                ))}
              </div>

              <div className="mt-12 flex flex-col items-center gap-4">
                <p className="text-sm text-muted">
                  {t("Menampilkan")} {Math.min(visible, items.length)} {t("dari")} {items.length} {t("proyek")}
                </p>
                {visible < items.length && (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="border border-navy px-5 py-2.5 text-[13px] sm:px-7 sm:py-3.5 sm:text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
                  >
                    {t("Tampilkan lebih banyak")}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox foto */}
      {open?.image && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(open.title)}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4"
          onClick={() => setOpen(null)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        >
          <figure className="relative flex max-h-full w-full max-w-4xl flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[75vh] w-full">
              <Image src={open.image} alt={t(open.title)} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center text-sm text-white">
              {t(open.title)}
              {open.client ? ` — ${open.client}` : ""}
            </figcaption>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              className="absolute -top-2 right-0 flex h-10 w-10 items-center justify-center text-3xl text-white hover:text-blue-bright"
              aria-label={t("Tutup")}
            >
              ×
            </button>
          </figure>
        </div>
      )}

      <CTASection />
    </>
  );
}
