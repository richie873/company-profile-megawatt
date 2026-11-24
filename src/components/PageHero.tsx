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
  contained = false,
  imagePosition,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: string | null;
  /** true = hero tidak full layar; lebarnya sama dengan container konten (max-w-7xl + padding yang sama) */
  contained?: boolean;
  /** nilai CSS object-position untuk gambar, mis. "50% 55%" */
  imagePosition?: string;
}) {
  const { t } = useTranslation();
  const trail: Crumb[] = [{ label: "Beranda", href: "/" }, ...crumbs];

  const hero = (
    <section
      className={`relative isolate overflow-hidden bg-navy text-white ${
        contained ? "py-12 sm:py-16 lg:py-20" : "pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28"
      }`}
    >
      {image && (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes={contained ? "(min-width: 1280px) 1200px, 100vw" : "100vw"}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/20" />
        </>
      )}
      <div className={contained ? "px-6 sm:px-10 lg:px-14" : "mx-auto max-w-7xl px-6 lg:px-10"}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/70">
            {trail.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && i < trail.length - 1 ? (
                  <Link href={c.href} className="inline-block py-1 transition-colors hover:text-white">
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

        <p className="eyebrow mt-8 flex sm:mt-10 items-center gap-2 text-xs text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" aria-hidden="true" />
          {t(eyebrow)}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {t(title)}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-6 sm:text-lg">{t(intro)}</p>
        )}
      </div>
    </section>
  );

  if (!contained) return hero;

  // pt-24 = ruang untuk navbar fixed + jarak; px sama dengan section "Lokasi Workshop"
  return (
    <div className="bg-paper pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">{hero}</div>
    </div>
  );
}
