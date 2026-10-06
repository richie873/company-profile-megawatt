"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";

/*
 * Video hero — layar penuh, diputar bergantian dengan crossfade (tanpa layar hitam):
 *   hero.mp4 (latar gelap)  →  animasi motor (latar putih)  →  hero.mp4  → ...
 *
 * Desktop: animasi-motor-gabungan.mp4 (16:9) · HP: animasi-motor-mobile-white.mp4 (9:16)
 * Saat animasi motor tampil, tulisan hero berganti ke warna navy supaya tetap terbaca
 * di atas latar putih ("mode terang").
 */

const HERO_VIDEO = "/hero/hero.mp4";
const MOTOR_VIDEO_DESKTOP = "/hero/animasi-motor-gabungan.mp4";
const MOTOR_VIDEO_MOBILE = "/hero/animasi-motor-mobile-white.mp4";

// Titik fokus video (kiri-kanan, atas-bawah)
const FOCUS = "50% 50%";

type Slot = 0 | 1; // 0 = hero.mp4, 1 = animasi motor

export default function Hero() {
  const { t } = useTranslation();

  // Satu ref pembungkus; video diambil lewat data-slot di dalam event handler/effect
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [active, setActive] = useState<Slot>(0);
  const [playing, setPlaying] = useState(true);
  const [motorFailed, setMotorFailed] = useState(false);

  // Ambil video lain di hero yang sama, berdasarkan elemen yang memicu event
  const getVideo = (from: Element, slot: Slot) =>
    from.closest("section")?.querySelector<HTMLVideoElement>(`video[data-slot="${slot}"]`) ?? null;

  // play() bisa ditolak browser (mis. mode hemat daya) — ditangkap supaya tidak jadi error
  const safePlay = (video: HTMLVideoElement | null) => {
    video?.play().catch(() => setPlaying(false));
  };

  // Deteksi HP lewat matchMedia (tidak dijalankan ulang di setiap piksel resize)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const ready = isMobile !== null;

  // Mulai memutar hero.mp4 setelah ukuran layar diketahui
  useEffect(() => {
    if (!ready) return;
    wrapRef.current
      ?.querySelector<HTMLVideoElement>('video[data-slot="0"]')
      ?.play()
      .catch(() => setPlaying(false));
  }, [ready]);

  const sources: [string, string] = [
    HERO_VIDEO,
    isMobile ? MOTOR_VIDEO_MOBILE : MOTOR_VIDEO_DESKTOP,
  ];
  const light = active === 1; // mode terang saat animasi motor berlatar putih tampil

  // Saat video aktif selesai, putar video berikutnya
  const handleEnded = (el: HTMLVideoElement, slot: Slot) => {
    if (slot !== active) return;
    const next: Slot = motorFailed || slot === 1 ? 0 : 1;
    const video = getVideo(el, next);
    if (!video) return;
    video.currentTime = 0;
    safePlay(video);
    setActive(next);
  };

  // Jika video animasi gagal dimuat (file hilang/rusak), cukup ulangi hero.mp4
  const handleError = (el: HTMLVideoElement, slot: Slot) => {
    if (slot !== 1) return;
    setMotorFailed(true);
    if (active === 1) {
      const hero = getVideo(el, 0);
      if (hero) {
        hero.currentTime = 0;
        safePlay(hero);
      }
      setActive(0);
    }
  };

  const togglePlay = (e: MouseEvent<HTMLButtonElement>) => {
    const video = getVideo(e.currentTarget, active);
    if (!video) return;
    if (video.paused) safePlay(video);
    else video.pause();
  };

  return (
    <section
      id="top"
      className="
        relative isolate
        flex min-h-[100svh]
        items-center
        overflow-hidden
        bg-navy
        pt-24
        pb-20
        text-white
      "
    >
      {/* =====================================================
          VIDEO BACKGROUND (2 video bertumpuk, crossfade)
      ====================================================== */}

      <div ref={wrapRef} className="absolute inset-0 -z-10">
        {ready &&
          ([0, 1] as Slot[]).map((slot) => (
            <video
              key={slot === 1 ? sources[1] : "hero"}
              data-slot={slot}
              src={sources[slot]}
              onPlay={() => slot === active && setPlaying(true)}
              onPause={() => slot === active && setPlaying(false)}
              onEnded={(e) => handleEnded(e.currentTarget, slot)}
              onError={(e) => handleError(e.currentTarget, slot)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden ${
                slot === active ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectPosition: FOCUS }}
              muted
              playsInline
              preload={slot === 0 ? "auto" : "metadata"}
              aria-hidden="true"
            />
          ))}
      </div>

      {/* Latar: navy untuk hero.mp4, putih untuk animasi motor */}
      <div
        className={`absolute inset-0 -z-20 transition-colors duration-700 ${
          light ? "bg-white" : "bg-navy"
        }`}
      />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-black/20 transition-opacity duration-700 ${
          light ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Mode terang: kabut putih tipis di sisi tulisan agar teks navy terbaca di atas motor */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/70 via-white/30 to-transparent transition-opacity duration-700 sm:bg-gradient-to-r sm:from-white/80 sm:via-white/40 sm:to-transparent ${
          light ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className={`
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-6
          transition-colors
          duration-700
          lg:px-10
          ${
            light
              ? "[text-shadow:0_0_16px_rgb(255_255_255/0.95),0_0_4px_rgb(255_255_255/0.9)]"
              : "[text-shadow:0_1px_12px_rgb(0_0_0/0.35)]"
          }
        `}
      >
        <h1
          className={`
            font-data
            text-2xl
            font-bold
            uppercase
            leading-[1.2]
            tracking-[0.08em]
            transition-colors
            duration-700
            ${light ? "text-navy" : "text-white"}

            sm:text-3xl
            sm:tracking-[0.14em]

            md:text-4xl

            lg:text-5xl
            lg:tracking-[0.18em]
          `}
        >
          {t("Professional Electromotor")}
          {/* spasi diperlukan karena <br> disembunyikan di HP */}
          <br className="hidden sm:block" />{" "}
          {t("Rewinding & Engineering")}
          <br className="hidden sm:block" />{" "}
          {t("Services")}
        </h1>

        <p
          className={`
            mt-5
            max-w-xl
            text-lg
            leading-relaxed
            transition-colors
            duration-700
            ${light ? "text-ink/80" : "text-white"}
            sm:text-xl
          `}
        >
          {t("Menjaga motor industri tetap berputar.")}
        </p>

        {/* =================================================
            BUTTONS
        ================================================== */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-2

            sm:mt-10
            sm:gap-4
          "
        >
          <Link
            href="/kontak"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-blue
              px-4
              py-2.5
              text-[13px]
              font-semibold
              text-white
              transition-colors

              hover:bg-navy

              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white

              sm:px-7
              sm:py-3.5
              sm:text-sm

              [text-shadow:none]
            "
          >
            {t("Request Konsultasi")}
          </Link>

          <Link
            href="/layanan"
            className={`
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              px-4
              py-2.5
              text-[13px]
              font-medium
              transition-colors
              duration-300
              ${
                light
                  ? "border-navy/40 text-navy hover:border-navy hover:bg-navy hover:text-white"
                  : "border-white/70 text-white hover:border-white hover:bg-white hover:text-navy hover:[text-shadow:none]"
              }

              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white

              sm:px-7
              sm:py-3.5
              sm:text-sm
            `}
          >
            {t("Lihat Layanan Kami")}
          </Link>
        </div>
      </div>

      {/* =====================================================
          PLAY / PAUSE BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={togglePlay}
        aria-label={
          playing
            ? t("Jeda video")
            : t("Putar video")
        }
        className={`
          absolute
          bottom-5
          right-5
          z-20

          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-full
          border

          transition-colors


          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-white

          motion-reduce:hidden

          sm:bottom-6
          sm:right-6
          sm:h-11
          sm:w-11

          lg:bottom-10
          lg:right-10
          ${
            light
              ? "border-navy/40 text-navy hover:bg-navy hover:text-white"
              : "border-white/70 text-white hover:bg-white hover:text-navy"
          }
        `}
      >
        {playing ? (
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="2"
              width="3.5"
              height="12"
            />

            <rect
              x="9.5"
              y="2"
              width="3.5"
              height="12"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4 2l10 6-10 6z" />
          </svg>
        )}
      </button>
    </section>
  );
}
