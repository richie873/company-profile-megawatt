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
  title: string; // mis. "Rewinding motor HV 6 kV untuk pompa pendingin"
  client?: string; // isi hanya jika sudah ada izin dari klien
  industry: string; // salah satu nama di INDUSTRIES
  service: string; // slug di SERVICES
  year?: string;
  summary: string;
  image?: string; // "/images/portofolio/nama-file.jpg"
};
export const PROJECTS: Project[] = [];

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
  excerpt: string;
  image?: string;
};
export const NEWS: NewsItem[] = [];
