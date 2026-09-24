"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

// Isi di Vercel → Settings → Environment Variables, contoh: G-XXXXXXXXXX
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function AnalyticsScripts() {
  const consent = useConsent();

  // Script analitik hanya dimuat setelah pengunjung menyetujui cookie analitik
  if (!GA_ID || !consent?.analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
