import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi PT. Megawatt Power Listrindo via WhatsApp, telepon, atau email. Layanan darurat 24 jam.",
};

export default function Page() {
  return <ContactPage />;
}
