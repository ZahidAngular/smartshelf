import { IntroProvider } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Brands } from "@/components/Brands";
import { TextMarquee } from "@/components/TextMarquee";
import { FeatureStory } from "@/components/FeatureStory";
import { Modules } from "@/components/Modules";
import { StatBand } from "@/components/StatBand";
import { QuoteReveal } from "@/components/QuoteReveal";
import { CTA } from "@/components/CTA";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <IntroProvider>
      <ScrollProgress />
      <main className="relative">
        <Navbar />
        <Hero />
        <Brands />
        <TextMarquee />
        <FeatureStory />
        <Modules />
        <StatBand />
        <QuoteReveal />
        <CTA />
        <Pricing />
        <Contact />
        <FAQ />
        <Footer />
      </main>
    </IntroProvider>
  );
}
