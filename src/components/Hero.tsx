"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/components/TranslationProvider";

/*
 * Video Hero
 *
 * Desktop:
 *   1. hero.mp4
 *   2. animasi-motor-gabungan.mp4
 *
 * Mobile:
 *   1. hero.mp4
 *   2. animasi-motor-mobile-9x16.mp4
 *
 * Setelah video kedua selesai, kembali ke hero.
 */

const HERO_VIDEO = "/hero/hero.mp4";

const MOTOR_VIDEO_DESKTOP =
  "/hero/animasi-motor-gabungan.mp4";

const MOTOR_VIDEO_MOBILE =
  "/hero/animasi-motor-mobile.mp4";

const HERO_POSTER: string | undefined = undefined;

// Titik fokus video desktop
const FOCUS = "50% 50%";

export default function Hero() {
  const { t } = useTranslation();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(HERO_VIDEO);
  const [playing, setPlaying] = useState(true);

  /*
   * Deteksi ukuran layar
   */
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  /*
   * Video motor yang digunakan berdasarkan perangkat
   */
  const motorVideo = isMobile
    ? MOTOR_VIDEO_MOBILE
    : MOTOR_VIDEO_DESKTOP;

  /*
   * Ketika video selesai
   *
   * hero.mp4
   *     ↓
   * video motor
   *     ↓
   * kembali ke hero.mp4
   */
  const handleVideoEnded = () => {
    if (currentVideo === HERO_VIDEO) {
      setCurrentVideo(motorVideo);
    } else {
      setCurrentVideo(HERO_VIDEO);
    }
  };

  /*
   * Play / Pause
   */
  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  /*
   * Ketika video berubah, otomatis play.
   */
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.load();

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.log("Autoplay gagal:", error);
      }
    };

    playVideo();
  }, [currentVideo]);

  /*
   * Jika ukuran layar berubah ketika sedang
   * menggunakan video motor, sesuaikan video.
   */
  useEffect(() => {
    if (currentVideo === HERO_VIDEO) return;

    const correctMotorVideo = isMobile
      ? MOTOR_VIDEO_MOBILE
      : MOTOR_VIDEO_DESKTOP;

    if (currentVideo !== correctMotorVideo) {
      setCurrentVideo(correctMotorVideo);
    }
  }, [isMobile, currentVideo]);

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
          VIDEO BACKGROUND
      ====================================================== */}

      <video
        ref={videoRef}
        key={currentVideo}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleVideoEnded}
        className="
          absolute
          inset-0
          -z-10
          h-full
          w-full
          object-cover
          motion-reduce:hidden
        "
        style={{
          objectPosition: FOCUS,
        }}
        src={currentVideo}
        poster={HERO_POSTER}
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* =====================================================
          MOBILE BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 -z-20 bg-navy" />

      {/* =====================================================
          DARK OVERLAY
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          bg-black/35
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-6
          [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]
          lg:px-10
        "
      >
        <h1
          className="
            font-data
            text-2xl
            font-bold
            uppercase
            leading-[1.2]
            tracking-[0.08em]
            text-white

            sm:text-3xl
            sm:tracking-[0.14em]

            md:text-4xl

            lg:text-5xl
            lg:tracking-[0.18em]
          "
        >
          {t("Professional Electromotor")}

          <br className="hidden sm:block" />

          {t("Rewinding & Engineering ")}

          <br className="hidden sm:block" />

          {t("Services")}
        </h1>

        <p
          className="
            mt-5
            max-w-xl
            text-lg
            leading-relaxed
            text-white
            sm:text-xl
          "
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
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-white/70
              px-4
              py-2.5
              text-[13px]
              font-medium
              text-white
              transition-colors

              hover:border-white
              hover:bg-white
              hover:text-navy
              hover:[text-shadow:none]

              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-white

              sm:px-7
              sm:py-3.5
              sm:text-sm
            "
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
        className="
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
          border-white/70
          text-white

          transition-colors

          hover:bg-white
          hover:text-navy

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
        "
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