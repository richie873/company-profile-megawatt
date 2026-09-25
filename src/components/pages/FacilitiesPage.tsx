"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WorkshopList, { WorkshopReminder } from "@/components/WorkshopList";
import CTASection from "@/components/CTASection";
import { FACILITIES, hasWorkshop } from "@/content/site";

export default function FacilitiesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Fasilitas"
        title="Workshop kami, siap menangani motor Anda."
        intro="Workshop kami dilengkapi fasilitas pemeriksaan dan pengujian untuk hasil kerja yang akurat."
        crumbs={[{ label: "Fasilitas" }]}
      />

      {hasWorkshop() ? (
        <section className="bg-panel py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Lokasi Workshop" title="Kunjungi workshop kami." />
            </Reveal>
            <div className="mt-14">
              <WorkshopList />
            </div>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <WorkshopReminder />
        </div>
      )}

      {FACILITIES.length > 0 && (
        <section className="bg-paper py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Peralatan" title="Fasilitas pemeriksaan dan pengerjaan." />
            </Reveal>
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {FACILITIES.map((f, i) => (
                <Reveal key={f.name} delay={(i % 3) * 80}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                    {f.image && <Image src={f.image} alt={t(f.name)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{t(f.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(f.desc)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
