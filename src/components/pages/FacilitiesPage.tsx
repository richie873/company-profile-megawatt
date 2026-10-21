"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import WorkshopList, { WorkshopReminder } from "@/components/WorkshopList";
import CTASection from "@/components/CTASection";
import { HERO_IMAGES } from "@/lib/site-images";
import { FACILITIES, TEST_TOOLS, hasWorkshop } from "@/content/site";

export default function FacilitiesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Fasilitas"
        title="Workshop kami, siap menangani motor Anda."
        intro="Workshop kami dilengkapi fasilitas pemeriksaan dan pengujian untuk hasil kerja yang akurat."
        crumbs={[{ label: "Fasilitas" }]}
        image={HERO_IMAGES.facilities}
      />

      {hasWorkshop() ? (
        <section className="bg-paper py-14 sm:py-20 lg:py-28">
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
        <section className="bg-paper py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Peralatan" title="Fasilitas pemeriksaan dan pengerjaan." />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 sm:mt-14 md:grid-cols-3 lg:grid-cols-4">
              {FACILITIES.map((f, i) => (
                <Reveal key={f.name} delay={(i % 4) * 60}>
                  <div className="group relative aspect-[4/3] overflow-hidden bg-navy">
                    {f.image && <Image src={f.image} alt={t(f.name)} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{t(f.name)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{t(f.desc)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {TEST_TOOLS.length > 0 && (
        <section className="bg-paper py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Alat Uji" title="Alat uji dan pengukuran." />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 sm:mt-14 md:grid-cols-3 lg:grid-cols-4">
              {/* Kartu pertama (gabungan 4 alat) dibuat besar: 2 kolom x 2 baris di laptop */}
              {TEST_TOOLS.map((f, i) => (
                <Reveal
                  key={f.name}
                  delay={(i % 4) * 60}
                  className={i === 0 ? "min-[480px]:col-span-2 lg:row-span-2" : ""}
                >
                  <div className="group relative aspect-[4/3] overflow-hidden bg-paper">
                    {f.image && (
                      <Image
                        src={f.image}
                        alt={t(f.name)}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">{f.name}</h3>
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
