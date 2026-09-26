import type { NextConfig } from "next";

// Alamat artikel di situs WordPress lama (tanpa /berita/ di depannya).
// Diarahkan permanen ke alamat baru agar tautan lama & peringkat Google tidak hilang
// saat domain dipindahkan ke situs ini.
const OLD_ARTICLE_SLUGS = [
  "pentingnya-maintenance-rutin-untuk-mesin-industri",
  "perawatan-transformator-yang-benar-untuk-industri",
  "jenis-jenis-transformator-dan-fungsinya",
  "penyebab-umum-kerusakan-elektromotor-di-industri",
  "apa-perbedaan-motor-ac-dan-dc-dalam-industri",
  "apa-itu-rewinding-elektromotor-dan-kapan-dibutuhkan",
];

const nextConfig: NextConfig = {
  async redirects() {
    return OLD_ARTICLE_SLUGS.map((slug) => ({
      source: `/${slug}`,
      destination: `/berita/${slug}`,
      permanent: true,
    }));
  },
  images: {
    // Sementara: foto dari Pexels (lihat src/lib/site-images.ts).
    // Hapus jika semua foto sudah disimpan di /public.
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
