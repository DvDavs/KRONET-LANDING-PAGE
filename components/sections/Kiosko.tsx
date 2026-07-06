"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Wifi, WifiOff, ArrowDown } from "lucide-react";
import {
  KioskoShot,
  AutoKioskoShot,
  type KioskoShotState,
} from "@/components/ui/KioskoShot";
import { Reveal } from "@/components/ui/Reveal";
import { useIsDesktop } from "@/lib/useIsDesktop";

const STATES: { state: KioskoShotState; label: string; body: string }[] = [
  {
    state: "publicidad",
    label: "La publicidad nunca se apaga",
    body: "Los anuncios están siempre en pantalla — mientras alguien checa y mientras nadie lo usa. Recordatorios, campañas internas, cultura. Tu reloj checador también es tu medio de comunicación.",
  },
  {
    state: "asistencia",
    label: "Reconocida en 0.6 segundos",
    body: "Una huella y la entrada queda registrada. Cero papel, cero tarjetas, cero confusión. La verdad, al instante.",
  },
  {
    state: "error",
    label: "Nadie se queda sin checar",
    body: "¿La huella no lee? ¿Un adulto mayor, una discapacidad? El kiosko ofrece NIP de respaldo — configurable y sólo para empleados autorizados. La huella es la regla; el NIP, la excepción que incluye a todos.",
  },
];

export function Kiosko() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(STATES.length - 1, Math.floor(p * STATES.length)));
  });

  return (
    <section id="kiosko" className="relative scroll-mt-24 bg-navy-ink text-white">
      {/* transición claro -> oscuro (flush, sin línea blanca) */}
      <div className="fade-to-ink pointer-events-none absolute bottom-full left-0 h-32 w-full" />

      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      {/* Header */}
      <div className="container-grid relative pt-section text-center">
        <Reveal>
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            El kiosko
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-section font-700 leading-tight">
            Una huella. Una decisión.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            Lo que pasa en menos de dos segundos es lo que cambia tu nómina al
            final del mes.
          </p>
        </Reveal>
      </div>

      {/* Desktop: sticky scroll con estados */}
      {isDesktop && (
        <div
          ref={ref}
          className="relative"
          style={{ height: `${STATES.length * 80}vh` }}
        >
          <div className="sticky top-0 flex h-screen items-center">
            <div className="container-grid grid w-full items-center gap-12 lg:grid-cols-2">
              <div className="relative">
                <KioskoShot state={STATES[active].state} />
              </div>
              <div className="relative min-h-[270px]">
                {STATES.map((s, i) => (
                  <motion.div
                    key={s.label}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      x: active === i ? 0 : 24,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ pointerEvents: active === i ? "auto" : "none" }}
                  >
                    <span className="font-display text-6xl font-800 text-white/10">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-700 text-cyan lg:text-4xl">
                      {s.label}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
                      {s.body}
                    </p>
                  </motion.div>
                ))}
                {/* dots */}
                <div className="absolute -bottom-4 left-0 flex gap-2">
                  {STATES.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? "w-8 bg-cyan" : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Móvil: kiosko auto + captions */}
      {!isDesktop && (
        <div className="relative px-6 py-16">
          <AutoKioskoShot />
          <div className="mt-10 flex flex-col gap-8">
            {STATES.map((s, i) => (
              <div key={s.label}>
                <span className="font-display text-sm font-700 text-cyan">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl font-700">{s.label}</h3>
                <p className="mt-2 text-white/65">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Closing — online/offline */}
      <div className="container-grid relative pb-section">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex w-max items-center gap-6 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3">
            <span className="flex items-center gap-2 text-sm font-600 text-white/80">
              <Wifi className="h-4 w-4 text-cyan" /> En línea
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="flex items-center gap-2 text-sm font-600 text-white/80">
              <WifiOff className="h-4 w-4 text-cyan" /> Offline
            </span>
          </div>
          <p className="mt-8 font-display text-2xl font-500 leading-snug text-white md:text-3xl">
            Funciona en línea. Funciona offline.
            <br />
            <span className="text-white/55">
              Funciona aunque tu sede pierda internet durante una semana.
            </span>
          </p>
          <ArrowDown className="mx-auto mt-8 h-6 w-6 animate-bounce text-cyan/60" />
        </Reveal>
      </div>

      {/* transición oscuro -> claro (flush, sin línea blanca) */}
      <div className="fade-from-ink pointer-events-none absolute top-full left-0 h-32 w-full" />
    </section>
  );
}
