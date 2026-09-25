import type { Metadata } from "next";
import IndustriesPage from "@/components/pages/IndustriesPage";

export const metadata: Metadata = {
  title: "Industri",
  description:
    "Layanan motor listrik untuk pembangkit listrik, pertambangan, manufaktur, minyak & gas, maritim, dan utilitas.",
};

export default function Page() {
  return <IndustriesPage />;
}
