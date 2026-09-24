"use client";

import { useTranslation } from "@/components/TranslationProvider";

export default function SectionHeading({
  eyebrow,
  title,
  invert = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  invert?: boolean;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <p
        className={`eyebrow flex items-center gap-2 text-xs ${
          invert ? "text-muted-invert" : "text-muted"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${invert ? "bg-blue-bright" : "bg-blue"}`}
          aria-hidden="true"
        />
        {t(eyebrow)}
      </p>
      <h2
        className={`mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {t(title)}
      </h2>
    </div>
  );
}
