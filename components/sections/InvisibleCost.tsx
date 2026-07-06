"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Check, ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { INVISIBLE_COST } from "@/lib/content";
import { useIsDesktop } from "@/lib/useIsDesktop";

const PANELS = INVISIBLE_COST.habits.length + 2; // 4 hábitos + convergencia + proverbio

export function InvisibleCost() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(PANELS - 1, Math.floor(p * PANELS));
    setActive(idx);
  });

  // Fallback apilado (móvil / reduced-motion): render vertical simple
  return (
    <section className="relative bg-white">
      {/* Desktop: sticky scroll cinematográfico */}
      {isDesktop && (
      <div ref={ref} className="relative" style={{ height: `${PANELS * 90}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_50%,black,transparent)]" />
          <div className="container-grid relative">
            {/* progress ticks */}
            <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
              {Array.from({ length: PANELS }).map((_, i) => (
                <span
                  key={i}
                  className={`h-8 w-1 rounded-full transition-all duration-500 ${
                    i === active ? "bg-cyan" : "bg-navy/10"
                  }`}
                />
              ))}
            </div>

            <div className="mx-auto max-w-4xl text-center">
              {/* Hábitos 0-3 */}
              {INVISIBLE_COST.habits.map((h, i) => (
                <Panel key={h.title} show={active === i}>
                  {i === 0 && (
                    <p className="mb-8 text-sm font-600 uppercase tracking-[0.2em] text-cyan">
                      {INVISIBLE_COST.intro}
                    </p>
                  )}
                  <h3 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-700 leading-[1.05] text-navy">
                    {h.title}
                  </h3>
                  <p className="mt-6 text-lg text-navy/50">({h.note})</p>
                  {i < INVISIBLE_COST.habits.length && (
                    <ArrowDown className="mx-auto mt-10 h-6 w-6 animate-bounce text-cyan/50" />
                  )}
                </Panel>
              ))}

              {/* Convergencia */}
              <Panel show={active === 4}>
                <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-700 leading-tight text-navy">
                  {INVISIBLE_COST.converge.title}
                  <br />
                  <span className="text-navy/55">
                    {INVISIBLE_COST.converge.subtitle}
                  </span>
                </h3>
                <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3 text-left">
                  {INVISIBLE_COST.habits.map((h) => (
                    <li
                      key={h.title}
                      className="flex items-center gap-3 text-lg font-500 text-navy/80"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </span>
                      {h.title}
                    </li>
                  ))}
                </ul>
              </Panel>

              {/* Proverbio + bridge */}
              <Panel show={active === 5}>
                <h3 className="font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-300 leading-[1.15] text-navy">
                  {INVISIBLE_COST.proverb[0]}
                  <br />
                  Lo que no se controla,{" "}
                  <span className="font-600 text-cyan">se pierde.</span>
                </h3>
                <div className="mx-auto mt-10 h-px w-40 bg-navy/15" />
                <a
                  href="#caso"
                  className="mt-8 inline-flex items-center gap-2 text-lg font-600 text-navy transition-colors hover:text-cyan"
                >
                  {INVISIBLE_COST.bridge}
                  <ArrowRight className="h-5 w-5 text-cyan" />
                </a>
              </Panel>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Móvil: bloques verticales (reveal al hacer scroll) */}
      {!isDesktop && (
      <div className="flex flex-col gap-16 px-6 py-20">
        <Reveal>
          <p className="text-sm font-600 uppercase tracking-[0.2em] text-cyan">
            {INVISIBLE_COST.intro}
          </p>
        </Reveal>
        {INVISIBLE_COST.habits.map((h) => (
          <Reveal key={h.title}>
            <h3 className="font-display text-3xl font-700 leading-tight text-navy">
              {h.title}
            </h3>
            <p className="mt-3 text-navy/50">({h.note})</p>
          </Reveal>
        ))}
        <Reveal>
          <h3 className="font-display text-2xl font-700 text-navy">
            {INVISIBLE_COST.converge.title} {INVISIBLE_COST.converge.subtitle}
          </h3>
          <ul className="mt-5 flex flex-col gap-2">
            {INVISIBLE_COST.habits.map((h) => (
              <li key={h.title} className="flex items-center gap-2 text-navy/80">
                <Check className="h-4 w-4 text-cyan" strokeWidth={3} />
                {h.title}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <h3 className="font-display text-3xl font-300 leading-snug text-navy">
            {INVISIBLE_COST.proverb[0]} Lo que no se controla,{" "}
            <span className="font-600 text-cyan">se pierde.</span>
          </h3>
        </Reveal>
        <Reveal>
          <a href="#caso" className="inline-flex items-center gap-2 font-600 text-navy">
            {INVISIBLE_COST.bridge} <ArrowRight className="h-5 w-5 text-cyan" />
          </a>
        </Reveal>
      </div>
      )}
    </section>
  );
}

/** Panel absoluto con crossfade impulsado por estado (no por mount). */
function Panel({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-x-0 top-1/2"
      initial={false}
      animate={{
        opacity: show ? 1 : 0,
        translateY: show ? "-50%" : "-46%",
        filter: show ? "blur(0px)" : "blur(3px)",
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}
