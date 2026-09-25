"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";

/*
 * Video latar hero.
 * 1. Simpan video (tanpa watermark) di: public/hero/hero.mp4
 * 2. (Opsional) simpan satu frame sebagai gambar di: public/hero/hero-poster.jpg
 *    — tampil selama video dimuat, dan untuk pengunjung yang mematikan animasi.
 * Rekomendasi file: landscape 16:9, 1920×1080, 10–20 detik, tanpa suara, < 8 MB.
 */

const HERO_VIDEO = "/hero/hero.mp4";
const HERO_POSTER: string | undefined = undefined; // mis. "/hero/hero-poster.jpg"

// Titik fokus saat video dipotong otomatis oleh layar (mis. "50% 40%").
// Geser nilai kedua lebih kecil agar bagian atas video lebih banyak terlihat.
const FOCUS = "50% 50%";

export default function Hero() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy pt-24 text-white"
    >
      {/* Video latar */}
      <video
        ref={videoRef}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
        style={{ objectPosition: FOCUS }}
        src={HERO_VIDEO}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {HERO_POSTER && (
        // Pengunjung dengan "kurangi animasi": tampilkan gambar diam saja
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={HERO_POSTER}
          alt=""
          className="absolute inset-0 -z-10 hidden h-full w-full object-cover motion-reduce:block"
          style={{ objectPosition: FOCUS }}
        />
      )}

      {/* Overlay gelap tipis merata di seluruh video (gaya abb.com).
          Naikkan /35 menjadi /45 jika teks kurang terbaca, turunkan jika video terlalu gelap. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] lg:px-10">
        <h1 className="eyebrow font-bold flex items-center gap-2 text-5xl text-white">
          {/* <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" aria-hidden="true" /> */}
          {t("Professional Electromotor")}
          <br />
          {t("Rewinding & Engineering ")}
          <br />
          {t("Services")}
        </h1>

        {/* <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-5xl">
          {t("Solusi terpercaya untuk perbaikan, rewinding, dan maintenance electromotor tegangan rendah hingga tinggi untuk berbagai kebutuhan industri.")}
        </h1> */}

        <p className="mt-5 max-w-xl text-xl leading-relaxed text-white">
          {t(
            "Menjaga motor industri tetap berputar."
          )}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/kontak"
            className="group inline-flex items-center gap-2 bg-blue px-7 py-3.5 text-sm font-semibold text-white [text-shadow:none] transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("Request Konsultasi")}
          </Link>
          <Link
            href="/layanan"
            className="inline-flex items-center border border-white/70 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-navy hover:[text-shadow:none] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t("Lihat Layanan Kami")}
          </Link>
        </div>
      </div>
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? t("Jeda video") : t("Putar video")}
        className="absolute bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white transition-colors hover:bg-white hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:hidden lg:bottom-10 lg:right-10"
      >
        {playing ? (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <rect x="3" y="2" width="3.5" height="12" />
            <rect x="9.5" y="2" width="3.5" height="12" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M4 2l10 6-10 6z" />
          </svg>
        )}
      </button>
    </section>
  );
}
