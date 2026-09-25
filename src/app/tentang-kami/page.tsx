import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil PT. Megawatt Power Listrindo, spesialis perbaikan dan rewinding motor listrik industri tegangan rendah hingga tinggi.",
};

export default function Page() {
  return <AboutPage />;
}
