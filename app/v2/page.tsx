import type { Metadata } from "next";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { StatsBand } from "@/components/v2/StatsBand";
import { EmpathyV2 } from "@/components/v2/EmpathyV2";
import { CostV2 } from "@/components/v2/CostV2";
import { KioskoV2 } from "@/components/v2/KioskoV2";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Calculator } from "@/components/sections/Calculator";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Tailored } from "@/components/sections/Tailored";
import { Suite } from "@/components/sections/Suite";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/layout/Footer";
import { VersionSwitch } from "@/components/ui/VersionSwitch";

export const metadata: Metadata = {
  title: "Kronet · Control operativo y optimización de nómina (V2)",
  description:
    "Tu nómina pierde 7.13% al mes. Sin que lo veas. Plataforma antifraude de control de asistencia — versión dark cinematográfica.",
};

/**
 * Versión 2 — dark-first "defense-grade": ritmo invertido respecto a v1.
 * Base oscura continua (hero → stats → empathy → costo) con islas claras
 * (caso, calculadora, cómo funciona, suite) como spotlights de datos.
 */
export default function PageV2() {
  return (
    <>
      <NavbarV2 />
      <main className="bg-navy-ink">
        <HeroV2 />
        <StatsBand />
        <EmpathyV2 />
        <CostV2 />
        <CaseStudy />
        <Calculator />
        <KioskoV2 />
        <HowItWorks />
        <Tailored />
        <Suite />
        <Closing />
      </main>
      <Footer />
      <VersionSwitch current="v2" />
    </>
  );
}
