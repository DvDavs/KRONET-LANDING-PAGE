"use client";

import { ArrowRight, CalendarCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { AutoKioskoShot } from "@/components/ui/KioskoShot";
import { INDUSTRIES } from "@/lib/content";
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

export function Hero() {
  const reduce = useStaticMotion();
  // Cuando reduce está activo, no ocultamos nada: todo visible sin animación.
  const mv = reduce
    ? {}
    : ({
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.2 },
      });
  const iv = reduce ? {} : { variants: item };

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[700px] w-[700px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(40,162,185,0.18), transparent 62%)",
        }}
      />

      <div className="container-grid grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Texto */}
        <motion.div {...mv}>
          <motion.p className="eyebrow text-cyan" {...iv}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Kronet · Control operativo &amp; nómina
          </motion.p>

          <h1 className="mt-6 font-display text-hero font-700 text-navy">
            <motion.span className="block" {...iv}>
              Tu nómina pierde
            </motion.span>
            <motion.span className="block" {...iv}>
              <span className="text-cyan-grad text-glow-cyan">7.13%</span> al mes.
            </motion.span>
            <motion.span className="block text-navy/90" {...iv}>
              Sin que lo veas.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-lg leading-relaxed text-navy/70 md:text-xl"
            {...iv}
          >
            Plataforma de control operativo y auditoría activa para empresas con
            workforce intensivo. Caso real:{" "}
            <span className="font-600 text-cyan">$1,994,833</span> protegidos en 7
            meses, 577 empleados, datos verificables.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            {...iv}
          >
            <a href="#demo" className="btn-primary">
              <CalendarCheck className="h-4 w-4" />
              Agendar demo
            </a>
            <a href="#calculadora" className="btn-ghost group">
              Calcular mi ahorro
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          <motion.div className="mt-12" {...iv}>
            <p className="text-xs font-500 uppercase tracking-wider text-muted">
              Diseñado para 100–500 empleados
            </p>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 text-sm font-500 text-navy/55">
              {INDUSTRIES.map((ind, i) => (
                <span key={ind} className="flex items-center gap-2">
                  {i > 0 && <span className="text-cyan/40">·</span>}
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Kiosko vivo */}
        <motion.div
          className="relative"
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AutoKioskoShot />
          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-500 text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            Demo en vivo · una huella, una decisión
          </div>
        </motion.div>
      </div>
    </section>
  );
}
