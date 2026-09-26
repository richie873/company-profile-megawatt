"use client";

import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { INDUSTRIES } from "@/content/site";
import { IMAGES } from "@/lib/site-images";

export default function IndustriesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageHero
        eyebrow="Industri"
        title="Dipercaya lintas sektor industri berat."
        intro="Di mana pun motor listrik menggerakkan operasi, kami membantu menjaganya tetap berputar."
        crumbs={[{ label: "Industri" }]}
        image={IMAGES.industries}
      />

      <section className="bg-paper py-14 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 3) * 80} className="group flex min-h-64 flex-col justify-between bg-paper p-8 transition-colors hover:bg-navy lg:p-10">
                <span className="font-data text-xs text-muted transition-colors group-hover:text-blue-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-white">
                    {t(ind.name)}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted transition-colors group-hover:text-white/75">
                    {t(ind.desc)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-col gap-4 border-l-2 border-blue bg-panel p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <p className="font-display text-xl font-semibold text-ink">
              {t("Industri Anda tidak tercantum di sini?")}
            </p>
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {t("Selama peralatannya digerakkan motor listrik, kemungkinan besar kami bisa membantu. Hubungi kami untuk berdiskusi.")}
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
