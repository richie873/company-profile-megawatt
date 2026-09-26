// src/lib/site-images.ts
// Semua foto utama situs dikumpulkan di sini supaya mudah diganti.
// Semuanya foto asli pekerjaan Megawatt (dari portofolio) di public/images/portofolio/.
// Untuk mengganti: simpan foto baru di /public/images/... lalu ubah path-nya.
// Nilai null = belum ada foto; komponen akan menampilkan panel navy sebagai pengganti.

const p = (file: string) => `/images/portofolio/${file}`;

export const IMAGES = {
  // Teknisi bekerja di dalam stator motor slipring 1.550 kW
  about: p("overhaul-slipring-motor-1550kw-timah.jpg") as string | null,
  services: {
    // Gulungan stator motor slipring 2.800 kW
    rewinding: p("rewinding-motor-slipring-2800kw.jpg") as string | null,
    // Rotor di mesin balancing
    mechanical: p("balancing-screw.jpg") as string | null,
    // Rewinding trafo 2.800 kVA di workshop
    transformer: p("rewinding-trafo-2800kva.jpg") as string | null,
  },
  // Overhaul ID fan di PLTU
  industries: p("overhaul-id-fan-2500kw-pltu-babelan.jpg") as string | null,
  // Latar section "Cara Kami Bekerja"
  process: p("rewinding-lifting-magnet.webp") as string | null,
};
