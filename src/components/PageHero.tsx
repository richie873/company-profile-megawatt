"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";

type Crumb = { label: string; href?: string };

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: string | null;
}) {
  const { t } = useTranslation();
  const trail: Crumb[] = [{ label: "Beranda", href: "/" }, ...crumbs];

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-36 pb-20 text-white lg:pt-44 lg:pb-28">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/20" />
        </>
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            {trail.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && i < trail.length - 1 ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {t(c.label)}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {t(c.label)}
                  </span>
                )}
                {i < trail.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        <p className="eyebrow mt-10 flex items-center gap-2 text-xs text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" aria-hidden="true" />
          {t(eyebrow)}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {t(title)}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{t(intro)}</p>
        )}
      </div>
    </section>
  );
}
