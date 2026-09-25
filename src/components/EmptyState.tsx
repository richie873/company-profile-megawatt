"use client";

import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";
import ArrowIcon from "@/components/ArrowIcon";

export default function EmptyState({ title, body }: { title: string; body: string }) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl border-t-2 border-blue bg-panel p-10 text-center lg:p-14">
      <p className="font-display text-2xl font-semibold text-ink">{t(title)}</p>
      <p className="mt-3 text-base leading-relaxed text-muted">{t(body)}</p>
      <Link
        href="/kontak"
        className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-blue"
      >
        {t("Hubungi kami")}
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
