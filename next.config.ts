import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sementara: foto dari Pexels (lihat src/lib/site-images.ts).
    // Hapus jika semua foto sudah disimpan di /public.
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
