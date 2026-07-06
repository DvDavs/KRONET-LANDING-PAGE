"use client";

import { CalendarCheck, ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Isotipo } from "@/components/ui/brand";
import { useStaticMotion } from "@/lib/motionPref";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export function Closing() {
  const reduce = useStaticMotion();
  const mv = reduce
    ? {}
    : {
        variants: container,
        initial: "hidden" as const,
        whileInView: "show" as const,
        viewport: { once: true, amount: 0.3 },
      };
  const iv = reduce ? {} : { variants: item };

  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-navy-ink text-white"
    >
      <div className="fade-to-ink absolute -top-1 left-0 h-32 w-full -translate-y-full" />
      {/* glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(40,162,185,0.22), transparent 66%)",
        }}
      />

      <motion.div className="container-grid relative py-section text-center" {...mv}>
        <motion.div {...iv} className="flex justify-center">
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(40,162,185,0.45), transparent 70%)",
              }}
            />
            <Isotipo
              variant="white"
              className="relative h-14 w-14 drop-shadow-[0_0_18px_rgba(40,162,185,0.6)]"
            />
          </div>
        </motion.div>

        <motion.h2
          className="mx-auto mt-10 max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-300 leading-[1.12] text-white/90"
          {...iv}
        >
          Lo que no se mide, no se controla.
          <br />
          Lo que no se controla,{" "}
          <span className="font-600 text-cyan">se pierde.</span>
        </motion.h2>

        <motion.div className="mx-auto mt-12 h-px w-48 bg-white/15" {...iv} />

        <motion.p
          className="mt-12 font-display text-3xl font-700 text-white md:text-5xl"
          {...iv}
        >
          Empieza a medir.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-5"
          {...iv}
        >
          <a
            href="https://wa.me/529514709685?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20brindara%20m%C3%A1s%20informaci%C3%B3n%20de%20Kronet"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-8 !py-4 !text-base"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar demo · 30 min · Sin compromiso
          </a>
          <a
            href="#caso"
            className="group inline-flex items-center gap-2 text-sm font-500 text-white/60 transition-colors hover:text-white"
          >
            Descargar el caso de estudio completo
            <ArrowRight className="h-4 w-4 text-cyan transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div className="mx-auto mt-14 h-px w-48 bg-white/15" {...iv} />
        <motion.p
          className="mt-8 text-sm font-400 text-white/40"
          {...iv}
        >
          Datos reales · Institución real · Impacto verificable
        </motion.p>
      </motion.div>
    </section>
  );
}
