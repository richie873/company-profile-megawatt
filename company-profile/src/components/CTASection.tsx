export default function CTASection() {
  return (
    <section id="kontak" className="border-y border-line bg-navy py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="eyebrow text-xs text-blue-bright">Butuh Layanan?</p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Butuh layanan perbaikan motor listrik yang andal?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-invert">
          Percayakan kebutuhan perbaikan dan perawatan electromotor Anda
          kepada tim profesional kami.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/628138855605"
            className="bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5"
          >
            WhatsApp Kami
          </a>
          <a
            href="tel:+628138855605"
            className="border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            0813 8855 605
          </a>
        </div>
      </div>
    </section>
  );
}
