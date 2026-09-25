import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSplit from "@/components/AboutSplit";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSection from "@/components/ProcessSection";
import WhyUs from "@/components/WhyUs";
import IndustriesStrip from "@/components/IndustriesStrip";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSplit />
      <StatsBar />
      <ServicesGrid />
      <ProcessSection />
      <WhyUs />
      <IndustriesStrip />
      <CTASection />
    </>
  );
}
