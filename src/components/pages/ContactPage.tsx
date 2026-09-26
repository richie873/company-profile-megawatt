"use client";

import { useTranslation } from "@/components/TranslationProvider";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import WorkshopList, { WorkshopReminder } from "@/components/WorkshopList";
import ArrowIcon from "@/components/ArrowIcon";
import { COMPANY, hasWorkshop, waLink } from "@/content/site";

export default function ContactPage() {
  const { t } = useTranslation();
  const channels = [
    { label: "WhatsApp", value: COMPANY.phoneDisplay, href: waLink(), external: true },
    { label: "Telepon", value: COMPANY.phoneDisplay, href: COMPANY.phoneHref, external: false },
    { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}`, external: false },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kontak"
        title="Mari bicarakan kebutuhan Anda."
        intro="Ceritakan kondisi motor atau peralatan Anda. Tim kami siap membantu, termasuk untuk kebutuhan darurat 24 jam."
        crumbs={[{ label: "Kontak" }]}
      />

      <section className="bg-paper py-14 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:px-10">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">{t("Kirim pesan")}</h2>
            <p className="mt-3 text-base text-muted">
              {t("Isi formulir di bawah ini dan kami akan membalas secepatnya.")}
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="bg-navy p-6 text-white sm:p-8 lg:p-10">
              <p className="eyebrow text-[11px] text-white/70">{t("Hubungi langsung")}</p>
              <ul className="mt-6 border-t border-white/20">
                {channels.map((c) => (
                  <li key={c.label} className="border-b border-white/20">
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span>
                        <span className="eyebrow block text-[11px] text-white/70">{t(c.label)}</span>
                        <span className="mt-1 block break-all text-base font-medium sm:text-lg">{c.value}</span>
                      </span>
                      <ArrowIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-bright opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-bright" />
                </span>
                <p className="text-sm text-white/85">{t("Layanan darurat tersedia 24 jam")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {hasWorkshop() ? (
        <section className="bg-panel py-14 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <SectionHeading eyebrow="Workshop" title="Kunjungi workshop kami." />
            </Reveal>
            <div className="mt-14">
              <WorkshopList />
            </div>
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <WorkshopReminder />
        </div>
      )}
    </>
  );
}
