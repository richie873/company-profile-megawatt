import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Megawatt Power Listrindo",
  description:
    "Kebijakan privasi dan penggunaan cookie di situs PT. Megawatt Power Listrindo.",
};

export default function KebijakanPrivasiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
