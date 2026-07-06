import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Empathy } from "@/components/sections/Empathy";
import { InvisibleCost } from "@/components/sections/InvisibleCost";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Calculator } from "@/components/sections/Calculator";
import { Kiosko } from "@/components/sections/Kiosko";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Tailored } from "@/components/sections/Tailored";
import { Suite } from "@/components/sections/Suite";
import { Closing } from "@/components/sections/Closing";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Empathy />
        <InvisibleCost />
        <CaseStudy />
        <Calculator />
        <Kiosko />
        <HowItWorks />
        <Tailored />
        <Suite />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
