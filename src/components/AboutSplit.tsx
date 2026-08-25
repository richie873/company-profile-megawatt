"use client";

import { useTranslation } from "@/components/TranslationProvider";

export default function AboutSplit() {
  const { t } = useTranslation();
  return (
    <section id="tentang" className="mx-auto max-w-7xl bg-paper px-6 py-28 lg:px-10">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            {t("Tentang Kami")}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink">
            {t("Spesialis perbaikan & penggulungan ulang motor listrik.")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            {t(
              "PT. Megawatt Power Listrindo bergerak di bidang jasa perbaikan dan rewinding electromotor, dari tegangan rendah hingga tegangan tinggi. Kami menghadirkan solusi menyeluruh untuk perawatan, perbaikan, dan peningkatan performa peralatan elektromekanis di berbagai sektor industri."
            )}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {t(
              "Dengan mengutamakan kualitas pekerjaan, ketepatan waktu, dan kepuasan pelanggan, kami berkomitmen menjadi mitra teknik yang dapat diandalkan untuk menjaga performa dan efisiensi operasional mesin industri Anda."
            )}
          </p>
          <div className="mt-10 flex items-center gap-4 border-t border-line pt-8">
            <span className="eyebrow text-xs text-muted">{t("Anggota")}</span>
            <span className="font-display text-lg font-semibold text-ink">
              EASA
            </span>
            <span className="text-sm text-muted">
              — {t("Electrical Apparatus Service Association")}
            </span>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full border border-line">
          <svg viewBox="0 0 400 500" className="h-full w-full" aria-hidden="true">
            <rect width="400" height="500" fill="#F3F5F7" />
            <g stroke="#D9E2EC" strokeWidth="1">
              <line x1="0" y1="125" x2="400" y2="125" />
              <line x1="0" y1="250" x2="400" y2="250" />
              <line x1="0" y1="375" x2="400" y2="375" />
              <line x1="100" y1="0" x2="100" y2="500" />
              <line x1="200" y1="0" x2="200" y2="500" />
              <line x1="300" y1="0" x2="300" y2="500" />
            </g>
            {/* Coil / winding motif — copper wire, blue only as spark accents */}
            <g stroke="#B5773A" strokeWidth="2.5" fill="none" strokeLinecap="round">
              <path d="M 90 380 Q 130 340 90 300 Q 50 260 90 220 Q 130 180 90 140 Q 50 100 90 60" />
            </g>
            <circle cx="90" cy="380" r="5" fill="#1B9AD6" />
            <circle cx="90" cy="60" r="5" fill="#1B9AD6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
