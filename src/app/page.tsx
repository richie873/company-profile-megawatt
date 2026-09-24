import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSplit from "@/components/AboutSplit";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSection from "@/components/ProcessSection";
import WhyUs from "@/components/WhyUs";
import IndustriesStrip from "@/components/IndustriesStrip";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <AboutSplit />
        <ServicesGrid />
        <ProcessSection />
        <WhyUs />
        <IndustriesStrip />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
