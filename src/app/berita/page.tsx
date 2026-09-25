import type { Metadata } from "next";
import NewsPage from "@/components/pages/NewsPage";
import { NEWS } from "@/content/site";

export const metadata: Metadata = {
  title: "Berita",
  description: "Kabar terbaru dari PT. Megawatt Power Listrindo.",
  robots: NEWS.length ? undefined : { index: false },
};

export default function Page() {
  return <NewsPage />;
}
