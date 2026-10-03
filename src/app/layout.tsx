import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TranslationProvider } from "@/components/TranslationProvider";
import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsScripts from "@/components/AnalyticsScripts";

// Font disimpan di proyek sendiri (src/app/fonts), tidak diunduh dari Google Fonts
// saat build — lebih cepat dan tidak bisa gagal karena masalah koneksi ke Google.
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-variable.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ibm-plex-mono-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Megawatt Power Listrindo - Electromotor Rewinding & Engineering",
    template: "%s - Megawatt Power Listrindo",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://megawattpowerlistrindo.com"),
  description:
    "PT. Megawatt Power Listrindo melayani perbaikan, rewinding, dan perawatan electromotor tegangan rendah hingga tinggi untuk industri energi, manufaktur, dan pertambangan di seluruh Indonesia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body bg-paper text-ink">
        <TranslationProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </TranslationProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
