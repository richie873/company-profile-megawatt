const INDUSTRIES = [
  "Pembangkit Listrik",
  "Manufaktur",
  "Pertambangan",
  "Minyak & Gas",
  "Marinir",
  "Utilitas",
];

export default function IndustriesStrip() {
  return (
    <section id="industri" className="mx-auto max-w-7xl bg-paper px-6 py-28 lg:px-10">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-end">
        <div>
          <p className="eyebrow flex items-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" />
            Industri yang Kami Layani
          </p>
          <h2 className="mt-4 max-w-lg font-display text-4xl font-semibold tracking-tight text-ink">
            Dipercaya lintas sektor industri berat.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {INDUSTRIES.map((industry, i) => (
          <div
            key={industry}
            className="group flex aspect-square flex-col justify-between border-b border-r border-line p-5 first:border-l lg:first:border-l"
          >
            <span className="font-data text-xs text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base font-semibold leading-tight text-ink transition-colors group-hover:text-blue">
              {industry}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
