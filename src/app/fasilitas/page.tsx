import type { Metadata } from "next";
import FacilitiesPage from "@/components/pages/FacilitiesPage";

export const metadata: Metadata = {
  title: "Fasilitas",
  description: "Workshop dan fasilitas pemeriksaan PT. Megawatt Power Listrindo.",
};

export default function Page() {
  return <FacilitiesPage />;
}
