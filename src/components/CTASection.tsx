"use client";

import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";
import ArrowIcon from "@/components/ArrowIcon";
import { COMPANY, waLink } from "@/content/site";

const WA_LINK = waLink();

export default function CTASection() {
  const { t } = useTranslation();

  const contacts = [
    { label: "WhatsApp", value: COMPANY.phoneDisplay, href: WA_LINK, external: true },
    { label: t("Telepon"), value: COMPANY.phoneDisplay, href: COMPANY.phoneHref, external: false },
    { label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}`, external: false },
  ];

  return (
    <section className="bg-blue-deep py-24 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-12 lg:items-end lg:px-10">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-2 text-xs text-white/85">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            {t("Butuh Layanan?")}
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {t("Motor bermasalah? Tim kami siap membantu, 24 jam.")}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/90">
            {t(
              "Ceritakan kondisi motor Anda. Kami akan membantu menentukan langkah perbaikan yang tepat, termasuk penjemputan unit."
            )}
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("Konsultasi via WhatsApp")}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <ul className="border-t border-white/35">
            {contacts.map((c) => (
              <li key={c.label} className="border-b border-white/35">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="eyebrow block text-[11px] text-white/85">{c.label}</span>
                    <span className="mt-1 block break-all text-base font-medium sm:text-lg">{c.value}</span>
                  </span>
                  <ArrowIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
