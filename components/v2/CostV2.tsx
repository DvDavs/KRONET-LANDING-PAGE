"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { INVISIBLE_COST } from "@/lib/content";

/**
 * V2 del costo invisible: lista dramática vertical (sin sticky scroll).
 * Cada hábito revela al entrar al viewport; el proverbio cierra en grande.
 */
export function CostV2() {
  return (
    <section className="relative bg-navy-ink pb-section text-white">
      <div className="container-grid">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            {INVISIBLE_COST.intro}
          </p>
          <h2 className="mt-4 font-display text-section font-700">
            Cuatro hábitos invisibles.
            <br />
            <span className="text-white/50">Una nómina que los paga todos.</span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {INVISIBLE_COST.habits.map((h, i) => (
            <Reveal key={h.title} delay={0.05}>
              <div className="group flex items-baseline gap-6 border-t border-white/[0.08] py-8 transition-colors hover:bg-white/[0.02] md:gap-10 md:py-10">
                <span className="font-display text-4xl font-800 text-white/12 transition-colors group-hover:text-cyan/40 md:text-6xl">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-700 leading-snug md:text-4xl">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-base text-white/45 md:text-lg">({h.note})</p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-white/[0.08]" />
        </div>

        <Reveal className="mt-20 text-center">
          <p className="mx-auto max-w-3xl font-display text-[clamp(1.8rem,3.5vw,3rem)] font-300 leading-[1.2] text-white/85">
            {INVISIBLE_COST.proverb[0]}
            <br />
            Lo que no se controla, <span className="font-600 text-cyan">se pierde.</span>
          </p>
          <a
            href="#caso"
            className="group mt-10 inline-flex items-center gap-2 text-lg font-600 text-white transition-colors hover:text-cyan"
          >
            {INVISIBLE_COST.bridge}
            <ArrowRight className="h-5 w-5 text-cyan transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>

      {/* transición oscuro -> claro (sigue isla clara: caso de estudio) */}
      <div className="fade-from-ink absolute -bottom-1 left-0 h-32 w-full translate-y-full" />
    </section>
  );
}
