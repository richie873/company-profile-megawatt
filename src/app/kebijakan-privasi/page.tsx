import type { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi dan penggunaan cookie di situs PT. Megawatt Power Listrindo.",
};

export default function KebijakanPrivasiPage() {
  return (
    <div className="pt-32 pb-24">
      <PrivacyContent />
    </div>
  );
}
