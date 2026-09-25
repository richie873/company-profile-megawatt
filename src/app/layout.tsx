import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/TranslationProvider";
import CookieConsent from "@/components/CookieConsent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsScripts from "@/components/AnalyticsScripts";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Megawatt Power Listrindo — Electromotor Rewinding & Engineering",
    template: "%s — Megawatt Power Listrindo",
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
