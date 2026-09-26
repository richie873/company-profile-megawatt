// src/content/site.ts
// Semua isi situs yang dipakai di lebih dari satu halaman dikumpulkan di sini.
// Bagian bertanda "DRAFT" ditulis sebagai contoh — periksa dan sesuaikan dengan
// kondisi sebenarnya sebelum situs dipublikasikan.

import { IMAGES } from "@/lib/site-images";

export const COMPANY = {
  name: "PT. Megawatt Power Listrindo",
  phoneDisplay: "0813 8855 605",
  phoneHref: "tel:+628138855605",
  email: "megawattpower.listrindo@yahoo.com",
  whatsapp: "628138855605",
};

export const waLink = (text = "Halo Megawatt, saya ingin berkonsultasi mengenai perbaikan motor.") =>
  `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(text)}`;

export type Service = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string;
  image: string | null;
  scope: string[];
  equipment: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "electrical-motor-rewinding",
    code: "01",
    title: "Electrical Motor Rewinding",
    summary:
      "Perbaikan dan rewinding untuk berbagai jenis motor dan peralatan listrik industri, dari low voltage hingga high voltage.",
    intro:
      "Gulungan yang rusak adalah penyebab paling umum motor listrik berhenti bekerja. Kami menggulung ulang motor dari tegangan rendah hingga tegangan tinggi, lalu mengujinya sebelum unit dikembalikan kepada Anda.",
    image: IMAGES.services.rewinding,
    // DRAFT — sesuaikan dengan tahapan kerja di workshop Anda
    scope: [
      "Pemeriksaan kondisi awal dan pengukuran kelistrikan",
      "Pembongkaran, pencatatan data gulungan, dan pembersihan",
      "Penggulungan ulang dengan kawat tembaga baru",
      "Impregnasi varnish dan proses pengeringan",
      "Perakitan kembali dan pengujian akhir",
    ],
    // DRAFT — sesuaikan dengan jenis peralatan yang benar-benar Anda tangani
    equipment: [
      "Motor induksi AC tegangan rendah",
      "Motor tegangan menengah & tinggi",
      "Motor DC",
      "Generator",
    ],
  },
  {
    slug: "mechanical-services",
    code: "02",
    title: "Mechanical Services",
    summary:
      "Layanan perbaikan dan pemeliharaan komponen mekanikal untuk mendukung performa mesin industri Anda.",
    intro:
      "Banyak kerusakan motor berawal dari sisi mekanikal: bearing yang aus, shaft yang tidak lurus, atau housing yang rusak. Tim kami menangani perbaikan mekanikal agar motor kembali bekerja halus dan tahan lama.",
    image: IMAGES.services.mechanical,
    // DRAFT
    scope: [
      "Pemeriksaan getaran dan kondisi mekanikal",
      "Penggantian bearing dan seal",
      "Perbaikan shaft dan housing",
      "Perbaikan komponen mekanikal pendukung",
    ],
    // DRAFT
    equipment: ["Motor listrik", "Pompa", "Gearbox", "Fan & blower"],
  },
  {
    slug: "transformer-maintenance",
    code: "03",
    title: "Transformer Maintenance",
    summary:
      "Perawatan dan pemeriksaan transformator untuk memastikan performa optimal dan keamanan operasional.",
    intro:
      "Transformator yang terawat berarti pasokan listrik pabrik yang stabil dan aman. Kami melakukan pemeriksaan dan perawatan berkala agar masalah terdeteksi sebelum menjadi gangguan.",
    image: IMAGES.services.transformer,
    // DRAFT
    scope: [
      "Pemeriksaan visual dan pengukuran kelistrikan",
      "Pengujian tahanan isolasi",
      "Perawatan dan pemeriksaan minyak transformator",
      "Perbaikan komponen dan laporan kondisi",
    ],
    // DRAFT
    equipment: ["Transformator distribusi", "Transformator daya"],
  },
];

export const INDUSTRIES = [
  { name: "Pembangkit Listrik", desc: "Motor pompa, fan, dan peralatan bantu pembangkit." },
  { name: "Pertambangan", desc: "Motor conveyor, crusher, dan alat berat di area tambang." },
  { name: "Manufaktur", desc: "Motor lini produksi, kompresor, dan mesin proses." },
  { name: "Minyak & Gas", desc: "Motor pompa dan kompresor di fasilitas hulu hingga hilir." },
  { name: "Maritim", desc: "Motor dan generator untuk kapal serta pelabuhan." },
  { name: "Utilitas", desc: "Motor dan transformator untuk air, listrik, dan infrastruktur." },
];

// ⚠️ BELUM DIISI — alamat workshop Megawatt.
// Selama city/address kosong, bagian lokasi workshop disembunyikan di situs,
// dan saat `npm run dev` muncul kotak pengingat bergaris di halaman terkait.
export const WORKSHOP = {
  city: "", // mis. "Bekasi"
  address: "", // alamat lengkap
};

export const hasWorkshop = () => Boolean(WORKSHOP.city.trim() && WORKSHOP.address.trim());

export const mapsLink = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const REASONS = [
  {
    title: "Pelayanan 24 Jam",
    desc: "Layanan tersedia 24 jam untuk memastikan operasional industri Anda tetap berjalan tanpa hambatan.",
  },
  { title: "Gratis Antar-Jemput", desc: "Layanan antar-jemput unit gratis untuk kemudahan dan efisiensi pelanggan." },
  {
    title: "Layanan Pemeriksaan",
    desc: "Didukung fasilitas pemeriksaan lengkap untuk hasil kerja yang akurat dan terpercaya.",
  },
  { title: "Harga & Kualitas", desc: "Kombinasi kualitas pekerjaan tinggi dengan harga yang kompetitif." },
  {
    title: "Fleksibilitas Garansi",
    desc: "Garansi layanan yang fleksibel, disesuaikan dengan kebutuhan dan jenis pekerjaan.",
  },
  {
    title: "Layanan Servis",
    desc: "Layanan servis profesional untuk perbaikan dan perawatan berbagai peralatan elektromekanis.",
  },
];

// ---------------------------------------------------------------------------
// Isi di bawah ini WAJIB diisi dengan data asli. Selama array kosong, halaman
// terkait menampilkan pesan "sedang diperbarui" dan tidak muncul di menu utama.
// ---------------------------------------------------------------------------

export type Project = {
  title: string;
  client?: string; // isi hanya jika sudah ada izin dari klien
  industry?: string; // salah satu nama di INDUSTRIES
  service?: string; // slug di SERVICES
  year?: string;
  summary?: string;
  image?: string; // "/images/portofolio/nama-file.jpg"
};

// Diambil dari halaman portofolio situs lama (halaman 1–3).
// Foto: jalankan `bash scripts/download-portfolio-images.sh` sekali untuk mengunduhnya
// ke public/images/portofolio/ sebelum situs lama dimatikan.
export const PROJECTS: Project[] = [
  { title: "Rewinding Motor 1.900 kW", service: "electrical-motor-rewinding", image: "/images/portofolio/rewinding-motor-1900kw.jpg" },
  { title: "Rewinding Motor DC 300 kW", service: "electrical-motor-rewinding", image: "/images/portofolio/rewinding-dc-motor-300kw.jpg" },
  { title: "Rewinding Trafo 2.800 kVA", service: "transformer-maintenance", image: "/images/portofolio/rewinding-trafo-2800kva.jpg" },
  { title: "Rewinding Trafo 1.250 kVA", service: "transformer-maintenance", image: "/images/portofolio/rewinding-trafo-1250kva.jpg" },
  { title: "Rewinding Motor Slipring 2.800 kW", service: "electrical-motor-rewinding", image: "/images/portofolio/rewinding-motor-slipring-2800kw.jpg" },
  { title: "Overhaul ID Fan 2.500 kW", client: "PLTU Babelan", industry: "Pembangkit Listrik", image: "/images/portofolio/overhaul-id-fan-2500kw-pltu-babelan.jpg" },
  { title: "Balancing Shaft Rotor 110 kW", service: "mechanical-services", image: "/images/portofolio/balancing-shaft-rotor-110kw.jpg" },
  { title: "Penggantian Shaft Rotor Motor 250 kW", service: "mechanical-services", image: "/images/portofolio/penggantian-shaft-rotor-250kw.jpg" },
  { title: "Balancing Screw", service: "mechanical-services", image: "/images/portofolio/balancing-screw.jpg" },
  { title: "Overhaul Generator 55 MW", client: "PT Gen Bontang, Kalimantan Timur", industry: "Pembangkit Listrik", image: "/images/portofolio/overhaul-generator-55mw-bontang.jpg" },
  { title: "Overhaul Motor Slipring 1.550 kW", client: "PT Timah, Bangka Kundur", industry: "Pertambangan", image: "/images/portofolio/overhaul-slipring-motor-1550kw-timah.jpg" },
  { title: "Overhaul Steam Turbine 1 MW", client: "PT PAA Dumai", image: "/images/portofolio/overhaul-steam-turbine-1mw-dumai.jpg" },
  // Halaman 2
  { title: "Overhaul Steam Turbine 7,5 MW", client: "PKS Dumai", image: "/images/portofolio/overhaul-steam-turbine-7-5mw-pks-dumai.jpg" },
  { title: "Rekondisi Steam Turbine Kapal Tanker", client: "Pertamina", industry: "Maritim", image: "/images/portofolio/rekondisi-steam-turbine-tanker-pertamina.jpg" },
  { title: "Overhaul Generator 5 MW", client: "PKS Dumai", image: "/images/portofolio/overhaul-generator-5mw-pks-dumai.jpg" },
  { title: "Alignment Laser 2.850 kW", service: "mechanical-services", image: "/images/portofolio/alignment-laser-2850kw.jpg" },
  { title: "Alignment Laser 2.860 kW", service: "mechanical-services", image: "/images/portofolio/alignment-laser-2860kw.jpg" },
  { title: "Overhaul Motor 1.100 kW", image: "/images/portofolio/overhaul-motor-1100kw.webp" },
  { title: "Overhaul Motor 1.200 kW", image: "/images/portofolio/overhaul-motor-1200kw.webp" },
  { title: "Perbaikan Rotor & Komutator 250 kW", service: "mechanical-services", image: "/images/portofolio/repairing-rotor-commutator-250kw.webp" },
  // Tiga proyek di bawah ini mungkin sama dengan proyek di atas (judul mirip, foto berbeda) — cek & hapus jika dobel
  { title: "Rekondisi Steam Turbine Kapal", industry: "Maritim", image: "/images/portofolio/rekondisi-turbine-steam-kapal.webp" },
  { title: "Overhaul Turbine 7,5 MW", image: "/images/portofolio/overhaul-turbine-7-5mw.webp" },
  { title: "Overhaul Generator 5 MW (Rotor)", image: "/images/portofolio/overhaul-generator-5mw.webp" },
  { title: "Overhaul Motor 2.500 kW", image: "/images/portofolio/overhaul-motor-2500kw.webp" },
  // Halaman 3
  { title: "Rewinding Trafo 500 kVA", service: "transformer-maintenance", image: "/images/portofolio/rewinding-trafo-500kva.webp" },
  { title: "Balancing On-site Blower", service: "mechanical-services", image: "/images/portofolio/balancing-on-site-blower.webp" },
  { title: "Rewinding Motor 400 kW", service: "electrical-motor-rewinding", image: "/images/portofolio/rewinding-motor-400kw.webp" },
  { title: "Skimming & Undercutting Komutator", service: "mechanical-services", image: "/images/portofolio/skimming-undercutting.webp" },
  { title: "Rewinding Lifting Magnet", service: "electrical-motor-rewinding", image: "/images/portofolio/rewinding-lifting-magnet.webp" },
  { title: "Overhaul Genset 225 kVA", image: "/images/portofolio/overhaul-genset-225kva.webp" },
  { title: "Overhaul Motor Slip Ring", image: "/images/portofolio/overhaul-slip-ring-motor.webp" },
];

export type Facility = {
  name: string; // mis. "Oven pengering varnish"
  desc: string;
  image?: string;
};
export const FACILITIES: Facility[] = [];

export type NewsItem = {
  slug: string;
  title: string;
  date: string; // "2026-09-01"
  category?: string;
  excerpt?: string;
  image?: string;
  // Isi artikel: satu string = satu paragraf. Awali dengan "## " untuk subjudul.
  // Selama kosong, kartu berita tampil tanpa tautan ke halaman detail.
  body?: string[];
};

export const hasBody = (n: NewsItem) => Boolean(n.body && n.body.length);

// Diambil dari halaman berita situs lama. Isi artikel (body) BELUM dipindahkan.
export const NEWS: NewsItem[] = [
  {
    slug: "pentingnya-maintenance-rutin-untuk-mesin-industri",
    title: "Pentingnya Maintenance Rutin untuk Mesin Industri",
    date: "2026-04-27",
    category: "Artikel",
    image: "/images/portofolio/overhaul-slipring-motor-1550kw-timah.jpg",
  },
  {
    slug: "perawatan-transformator-yang-benar-untuk-industri",
    title: "Perawatan Transformator yang Benar untuk Industri",
    date: "2026-04-27",
    category: "Artikel",
    image: "/images/berita/perawatan-transformator.webp",
  },
  {
    slug: "jenis-jenis-transformator-dan-fungsinya",
    title: "Jenis-Jenis Transformator dan Fungsinya",
    date: "2026-04-27",
    category: "Artikel",
    image: "/images/berita/jenis-transformator.webp",
  },
  {
    slug: "penyebab-umum-kerusakan-elektromotor-di-industri",
    title: "Penyebab Umum Kerusakan Elektromotor di Industri",
    date: "2026-04-03",
    category: "Artikel",
    image: "/images/portofolio/rewinding-lifting-magnet.webp",
  },
  {
    slug: "apa-perbedaan-motor-ac-dan-dc-dalam-industri",
    title: "Apa Perbedaan Motor AC dan DC dalam Industri?",
    date: "2026-04-03",
    category: "Artikel",
    image: "/images/berita/motor-ac-dc.webp",
  },
  {
    slug: "apa-itu-rewinding-elektromotor-dan-kapan-dibutuhkan",
    title: "Apa Itu Rewinding Elektromotor dan Kapan Dibutuhkan?",
    date: "2026-04-03",
    category: "Artikel",
    image: "/images/berita/apa-itu-rewinding.webp",
  },
];
