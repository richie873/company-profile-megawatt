"use client";

import Image from "next/image";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatsBar from "@/components/StatsBar";
import WorkshopList, { WorkshopReminder } from "@/components/WorkshopList";
import CTASection from "@/components/CTASection";
import { REASONS, hasWorkshop } from "@/content/site";
import { IMAGES } from "@/lib/site-images";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Mitra teknik untuk motor listrik industri Indonesia."
        intro="Spesialis perbaikan, rewinding, dan perawatan electromotor tegangan rendah hingga tinggi untuk berbagai sektor industri."
        crumbs={[{ label: "Tentang Kami" }]}
        image={IMAGES.about}
      />

      <StatsBar />

      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <Reveal className="lg:col-span-5">
            <SectionHeading eyebrow="Profil Perusahaan" title="Siapa kami." />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <p className="text-xl leading-relaxed text-ink">
              {t(
                "PT. Megawatt Power Listrindo bergerak di bidang jasa perbaikan dan rewinding electromotor, dari tegangan rendah hingga tegangan tinggi. Kami menghadirkan solusi menyeluruh untuk perawatan, perbaikan, dan peningkatan performa peralatan elektromekanis di berbagai sektor industri."
              )}
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {t(
                "Dengan mengutamakan kualitas pekerjaan, ketepatan waktu, dan kepuasan pelanggan, kami berkomitmen menjadi mitra teknik yang dapat diandalkan untuk menjaga performa dan efisiensi operasional mesin industri Anda."
              )}
            </p>

            <div className="mt-12 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
              <p className="font-display text-4xl font-semibold text-ink">EASA</p>
              <div>
                <p className="eyebrow text-[11px] text-muted">{t("Anggota")}</p>
                <p className="mt-1 text-sm text-muted">
                  {t("Electrical Apparatus Service Association")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-panel py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionHeading eyebrow="Nilai Kami" title="Yang kami janjikan kepada setiap pelanggan." />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={(i % 3) * 80} className="bg-panel p-8 lg:p-10">
                <span className="font-data text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{t(r.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(r.desc)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {hasWorkshop() ? (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Lokasi" title="Workshop kami." />
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

      {IMAGES.industries && (
        <div className="relative h-[40vh] min-h-72 w-full">
          <Image src={IMAGES.industries} alt="" fill sizes="100vw" className="object-cover" />
        </div>
      )}

      <CTASection />
    </>
  );
}
