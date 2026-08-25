"use client";

import { useEffect, useState } from "react";

const PARTICLE_ORBIT =
  "M 1000 260 A 190 190 0 1 1 999.9 260 A 190 190 0 1 1 1000 260";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-navy pt-24 text-white"
    >
      {/* Signature "video": animated 3-phase electromotor — rotor spin, current flow, copper windings */}
      <div className="absolute inset-0 hero-kenburns">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="motorGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rotorFace" cx="40%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#233A5E" />
              <stop offset="100%" stopColor="#0F1E3D" />
            </radialGradient>
          </defs>

          <circle cx="1000" cy="450" r="340" fill="url(#motorGlow)" />

          {/* Stator assembly — ring + copper windings, rotates continuously */}
          <g>
            {!reduceMotion && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 1000 450"
                to="360 1000 450"
                dur="18s"
                repeatCount="indefinite"
              />
            )}

            {/* Laminated ring */}
            <circle
              cx="1000"
              cy="450"
              r="260"
              fill="none"
              stroke="#3A5C86"
              strokeWidth="2"
              strokeDasharray="6 7"
            />

            {/* Three copper winding groups — 3-phase motor, staggered pulse */}
            {[0, 120, 240].map((angle, i) => (
              <g
                key={angle}
                transform={`rotate(${angle} 1000 450)`}
                className="coil-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <path
                  d="M 1000 190 C 1120 200, 1160 260, 1150 330"
                  fill="none"
                  stroke="#C9762E"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 1000 190 C 1120 200, 1160 260, 1150 330"
                  fill="none"
                  stroke="#E0A15E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>
            ))}
          </g>

          {/* Rotor — stays fixed as visual anchor while stator spins around it */}
          <g>
            <circle cx="1000" cy="450" r="150" fill="url(#rotorFace)" />
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * 360;
              return (
                <line
                  key={i}
                  x1="1000"
                  y1="450"
                  x2="1000"
                  y2="320"
                  stroke="#5C88BE"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${a} 1000 450)`}
                  opacity="0.6"
                />
              );
            })}
            <circle cx="1000" cy="450" r="34" fill="#0A1830" />
            <circle
              cx="1000"
              cy="450"
              r="34"
              fill="none"
              stroke="#7C93B4"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </g>

          {/* Current-flow particles orbiting the winding */}
          {[0, 2.2, 4.4].map((delay, i) => (
            <circle key={i} r="5" fill="#4BBEE9">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
                path={PARTICLE_ORBIT}
              />
              {!reduceMotion && (
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.9;1"
                  dur="6s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </svg>
      </div>

      {/* Legibility gradient over the visual */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <p className="eyebrow flex items-center gap-2 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-bright" aria-hidden="true" />
          Professional Electromotor Rewinding &amp; Engineering Services
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Motor listrik industri
          <br />
          Anda, kembali andal.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-invert">
          PT. Megawatt Power Listrindo melayani perbaikan, rewinding, dan
          perawatan electromotor tegangan rendah hingga tinggi — solusi
          menyeluruh untuk peralatan elektromekanis di sektor energi,
          manufaktur, dan pertambangan.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#kontak"
            className="bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5"
          >
            Request Konsultasi
          </a>
          <a
            href="#layanan"
            className="border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            Lihat Layanan Kami
          </a>
        </div>
      </div>

      {/* <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-invert md:flex">
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="h-10 w-px bg-white/25" />
      </div> */}
    </section>
  );
}
