"use client";

import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ArrowIcon from "@/components/ArrowIcon";
import ProcessSection from "@/components/ProcessSection";
import CTASection from "@/components/CTASection";
import { COMPANY, SERVICES, waLink, type Service } from "@/content/site";

export default function ServiceDetailPage({ service }: { service: Service }) {
  const { t } = useTranslation();
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={`Layanan ${service.code}`}
        title={service.title}
        intro={service.summary}
        crumbs={[{ label: "Layanan", href: "/layanan" }, { label: service.title }]}
        image={service.image}
      />

      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink lg:text-2xl">{t(service.intro)}</p>
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-ink">{t("Lingkup pekerjaan")}</h2>
              <ol className="mt-8 border-t border-line">
                {service.scope.map((item, i) => (
                  <li key={item} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-line py-5">
                    <span className="font-data text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base text-ink">{t(item)}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-ink">{t("Peralatan yang ditangani")}</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {service.equipment.map((e) => (
                  <li key={e} className="border border-line bg-panel px-4 py-2 text-sm text-ink">
                    {t(e)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-32">
              <div className="bg-navy p-8 text-white">
                <p className="eyebrow text-[11px] text-white/70">{t("Butuh layanan ini?")}</p>
                <p className="mt-3 font-display text-2xl font-semibold leading-snug">
                  {t("Konsultasikan kondisi peralatan Anda dengan tim kami.")}
                </p>
                <a
                  href={waLink(`Halo Megawatt, saya tertarik dengan layanan ${service.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 flex items-center justify-between bg-blue px-5 py-4 text-sm font-semibold transition-colors hover:bg-white hover:text-navy"
                >
                  {t("Chat via WhatsApp")}
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={COMPANY.phoneHref}
                  className="mt-3 flex items-center justify-between border border-white/30 px-5 py-4 text-sm transition-colors hover:border-white"
                >
                  {COMPANY.phoneDisplay}
                  <span className="text-white/60">{t("Telepon")}</span>
                </a>
              </div>

              <div className="border border-line p-8">
                <p className="eyebrow text-[11px] text-muted">{t("Layanan lainnya")}</p>
                <ul className="mt-4">
                  {others.map((o) => (
                    <li key={o.slug} className="border-b border-line last:border-b-0">
                      <Link
                        href={`/layanan/${o.slug}`}
                        className="group flex items-center justify-between gap-4 py-4 text-sm font-medium text-ink transition-colors hover:text-blue"
                      >
                        {t(o.title)}
                        <ArrowIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </>
  );
}
