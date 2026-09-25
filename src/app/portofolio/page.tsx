import type { Metadata } from "next";
import PortfolioPage from "@/components/pages/PortfolioPage";
import { PROJECTS } from "@/content/site";

export const metadata: Metadata = {
  title: "Portofolio",
  description: "Proyek perbaikan dan perawatan motor listrik yang dikerjakan PT. Megawatt Power Listrindo.",
  // Jangan diindeks Google selama belum ada isinya
  robots: PROJECTS.length ? undefined : { index: false },
};

export default function Page() {
  return <PortfolioPage />;
}
