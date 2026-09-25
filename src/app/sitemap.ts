import type { MetadataRoute } from "next";
import { NEWS, PROJECTS, SERVICES } from "@/content/site";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://megawattpowerlistrindo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tentang-kami",
    "/layanan",
    ...SERVICES.map((s) => `/layanan/${s.slug}`),
    "/industri",
    "/fasilitas",
    ...(PROJECTS.length ? ["/portofolio"] : []),
    ...(NEWS.length ? ["/berita"] : []),
    "/kontak",
    "/kebijakan-privasi",
  ];
  return paths.map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));
}
