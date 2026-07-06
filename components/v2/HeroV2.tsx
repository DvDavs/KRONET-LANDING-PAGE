"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, TrendingDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { AutoKiosko } from "@/components/ui/KioskoDevice";
import { useStaticMotion } from "@/lib/motionPref";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/**
 * Pérdida acumulada desde que se abrió la página, para una nómina de 500
 * empleados: 500 × $600 × 22 días × 7.13% ≈ $470,580/mes → ~$0.1816/seg.
 */
const LOSS_PER_SECOND = (500 * 600 * 22 * 0.0713) / (30 * 24 * 3600);

function LossTicker() {
  const [loss, setLoss] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const tick = (ts: number) => {
      if (start.current === null) start.current = ts;
      setLoss(((ts - start.current) / 1000) * LOSS_PER_SECOND);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-red-400/25 bg-red-400/[0.06] px-4 py-2">
      <TrendingDown className="h-4 w-4 shrink-0 text-red-400" />
      <p className="text-xs font-500 text-white/70 sm:text-sm">
        Desde que abriste esta página, una nómina de 500 personas perdió{" "}
        <span className="font-display font-700 tabular-nums text-red-300">
          ${loss.toFixed(2)}
        </span>
      </p>
    </div>
  );
}

const MARQUEE = [
  "Manufactura",
  "Maquila",
  "Retail multisucursal",
  "Universidades",
  "50–500+ empleados",
  "Biometría de huella",
  "Funciona offline",
  "Auditoría activa",
];

export function HeroV2() {
  const reduce = useStaticMotion();
  const mv = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.2 },
      };
  const iv = reduce ? {} : { variants: item };

  return (
    <section id="top" className="relative overflow-hidden bg-navy-ink pb-16 pt-28 text-white md:pt-36">
      {/* atmósfera */}
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(75%_60%_at_50%_0%,black,transparent)]" />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[800px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 30%, rgba(40,162,185,0.22), transparent 70%)",
        }}
      />

      <div className="container-grid relative grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div {...mv}>
          <motion.p className="eyebrow text-cyan" {...iv}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Kronet · Control operativo &amp; nómina
          </motion.p>

          <h1 className="mt-6 font-display text-hero font-700 text-white">
            <motion.span className="block" {...iv}>
              Tu nómina pierde
            </motion.span>
            <motion.span className="block" {...iv}>
              <span className="text-cyan-grad text-glow-cyan">7.13%</span> al mes.
            </motion.span>
            <motion.span className="block text-white/60" {...iv}>
              Sin que lo veas.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/65 md:text-xl"
            {...iv}
          >
            Plataforma de control operativo y auditoría activa para empresas con
            workforce intensivo. Caso real:{" "}
            <span className="font-600 text-cyan">$1,994,833</span> protegidos en 7
            meses, 577 empleados, datos verificables.
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" {...iv}>
            <a
              href="https://wa.me/529514709685?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20brindara%20m%C3%A1s%20informaci%C3%B3n%20de%20Kronet"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <CalendarCheck className="h-4 w-4" />
              Agendar demo
            </a>
            <a
              href="#calculadora"
              className="group inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-cyan transition-colors hover:text-white"
            >
              Calcular mi ahorro
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div className="mt-10" {...iv}>
            <LossTicker />
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AutoKiosko />
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-500 text-white/45">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Demo en vivo · una huella, una decisión
          </div>
        </motion.div>
      </div>

      {/* marquee de industrias */}
      <div className="relative mt-16 border-y border-white/[0.07] py-4">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-sm font-500 uppercase tracking-wider text-white/35"
            >
              {m}
              <span className="h-1 w-1 rounded-full bg-cyan/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
