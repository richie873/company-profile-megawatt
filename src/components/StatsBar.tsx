"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "@/components/TranslationProvider";
import Reveal from "@/components/Reveal";

// Ubah angka & label di sini. Format nilai: angka di depan + akhiran (mis. "500+", "24/7").
const STATS = [
  { value: "10+", label: "Tahun pengalaman" },
  { value: "500+", label: "Electromotor diperbaiki" },
  { value: "50+", label: "Klien industri" },
  { value: "24/7", label: "Layanan bantuan" },
];

/** Angka yang berhitung naik saat pertama kali terlihat di layar. */
function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = "0";
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          el.textContent = Math.round(target * eased).toLocaleString("id-ID");
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span>{value}</span>;
  return (
    <span className="tabular-nums">
      <span ref={ref}>{target.toLocaleString("id-ID")}</span>
      <span className="text-black">{suffix}</span>
    </span>
  );
}

export default function StatsBar() {
  const { t } = useTranslation();
  return (
    <section aria-label={t("Megawatt dalam angka")} className="relative z-10 bg-paper py-16 lg:py-5">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 sm:gap-6 lg:grid-cols-4 lg:px-10">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 100} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-[0_24px_50px_-24px_rgba(15,30,61,0.35)] sm:p-8">
              <div className="mt-8 sm:mt-10">
                <p className="font-display text-4xl font-black tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-3 text-sm font-medium leading-snug text-muted sm:text-base">{t(stat.label)}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
