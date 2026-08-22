const COLUMNS = [
  {
    title: "Layanan",
    links: [
      "Electrical Motor Rewinding",
      "Mechanical Services",
      "Transformer Maintenance",
    ],
  },
  {
    title: "Perusahaan",
    links: ["Tentang Kami", "Fasilitas", "Portofolio", "Berita"],
  },
];

const WORKSHOPS = [
  {
    city: "Tangerang",
    address:
      "Pergudangan Surya Grand Cisoka, Sentra Bumi Niaga Blok E/08, Jl. Raya Cisoka, Balaraja, Tangerang, Banten 15730",
  },
  {
    city: "Bekasi",
    address:
      "Jl. Raya Pilar Sukatani KM 4, Desa Sukaraya No. 9, Cikarang, Bekasi, Jawa Barat 17823",
  },
  {
    city: "Mojokerto",
    address: "Jl. Raya Sidorejo No. 89, Jetis, Mojokerto, Jawa Timur 61352",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 border-b border-line-invert pb-16 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-blue-bright" aria-hidden="true" />
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                MEGAWATT
              </span>
            </div>
            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-muted-invert">
              Mitra terpercaya untuk layanan penggulungan ulang, perbaikan,
              dan pemeliharaan motor listrik industri di seluruh Indonesia.
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/80">
              <p>0813 8855 605</p>
              <p>megawattpower.listrindo@yahoo.com</p>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="eyebrow text-xs text-muted-invert">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/80 transition-colors hover:text-blue-bright"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="eyebrow text-xs text-muted-invert">Workshop</h4>
            <ul className="mt-4 space-y-4">
              {WORKSHOPS.map((w) => (
                <li key={w.city}>
                  <p className="text-sm font-medium text-white">{w.city}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-invert">
                    {w.address}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-muted-invert md:flex-row">
          <span>
            © {new Date().getFullYear()} PT. Megawatt Power Listrindo.
          </span>
          <span className="font-data">Tangerang · Bekasi · Mojokerto</span>
        </div>
      </div>
    </footer>
  );
}
