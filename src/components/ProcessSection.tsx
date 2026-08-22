const STEPS = [
  {
    num: "01",
    title: "Kajian & Rekayasa Dasar",
    desc: "Studi kelayakan teknis dan desain awal disusun bersama tim engineering klien.",
  },
  {
    num: "02",
    title: "Rekayasa Detail",
    desc: "Spesifikasi sistem, simulasi proses, dan dokumen konstruksi diselesaikan.",
  },
  {
    num: "03",
    title: "Instalasi & Commissioning",
    desc: "Pemasangan di lapangan dengan pengujian bertahap sebelum serah terima.",
  },
  {
    num: "04",
    title: "Operasional & Perawatan",
    desc: "Pemantauan berkelanjutan dan dukungan teknis sepanjang masa pakai sistem.",
  },
];

export default function ProcessSection() {
  return (
    <section id="proses" className="bg-panel py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow text-xs text-blue">Cara Kami Bekerja</p>
        <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold tracking-tight text-ink">
          Satu alur kerja dari konsep hingga operasional.
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-0 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <li
              key={step.num}
              className="relative border-t border-line pt-6 md:pr-8"
            >
              <span
                className="absolute -top-px left-0 h-px bg-blue transition-all duration-700"
                style={{ width: i === 0 ? "100%" : "0%" }}
                aria-hidden="true"
              />
              <span className="font-data text-sm text-muted">
                {step.num}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
