import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Electrical motor rewinding, mechanical services, dan transformer maintenance untuk industri di seluruh Indonesia.",
};

export default function Page() {
  return <ServicesPage />;
}
