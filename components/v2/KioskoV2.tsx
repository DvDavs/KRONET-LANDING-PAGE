"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  Fingerprint,
  CheckCircle2,
  Clock3,
  LogOut,
  XCircle,
  Wifi,
  WifiOff,
  MousePointerClick,
} from "lucide-react";
import { KioskoDevice } from "@/components/ui/KioskoDevice";
import type { KioskoState } from "@/components/ui/KioskoScreen";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const STATES: {
  state: KioskoState;
  label: string;
  icon: typeof Fingerprint;
  caption: string;
}[] = [
  {
    state: "idle",
    label: "Publicidad",
    icon: Megaphone,
    caption:
      "Mientras nadie lo usa, el kiosko trabaja: anuncios, recordatorios, campañas internas.",
  },
  {
    state: "scanning",
    label: "Escaneo",
    icon: Fingerprint,
    caption: "Llegó. Acerca el dedo. No hay app, ni tarjeta, ni PIN que olvidar.",
  },
  {
    state: "success",
    label: "Entrada",
    icon: CheckCircle2,
    caption: "Reconocida en 0.6 segundos. Cero papel. Cero confusión.",
  },
  {
    state: "retardo",
    label: "Retardo",
    icon: Clock3,
    caption:
      "Si llega tarde, lo dice. El kiosko no juzga: sólo registra la verdad.",
  },
  {
    state: "salida",
    label: "Salida",
    icon: LogOut,
    caption: "Jornada cerrada, horas calculadas. Y vuelve a vender.",
  },
  {
    state: "error",
    label: "No reconocida",
    icon: XCircle,
    caption:
      "Huella ajena o dedo equivocado: rechazo inmediato. Nadie marca por otro.",
  },
];

export function KioskoV2() {
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);

  // Auto-avanza hasta que el visitante toma el control.
  useEffect(() => {
    if (manual) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setTimeout(() => setI((n) => (n + 1) % STATES.length), 3200);
    return () => clearTimeout(id);
  }, [i, manual]);

  const current = STATES[i];

  return (
    <section id="kiosko" className="relative scroll-mt-24 bg-navy-ink py-section text-white">
      <div className="fade-to-ink absolute -top-1 left-0 h-32 w-full -translate-y-full" />
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-grid relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            El kiosko
          </p>
          <h2 className="mt-5 font-display text-section font-700 leading-tight">
            Una huella. Una decisión.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60">
            Lo que pasa en menos de dos segundos es lo que cambia tu nómina al
            final del mes.{" "}
            <span className="inline-flex items-center gap-1.5 font-600 text-cyan">
              <MousePointerClick className="h-4 w-4" />
              Probalo vos:
            </span>
          </p>
        </Reveal>

        {/* Selector de estados */}
        <Reveal className="mt-10" delay={0.05}>
          <div
            className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Estados del kiosko"
          >
            {STATES.map((s, idx) => {
              const Icon = s.icon;
              const active = idx === i;
              return (
                <button
                  key={s.label}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setManual(true);
                    setI(idx);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-600 transition-all duration-300",
                    active
                      ? "border-cyan bg-cyan/15 text-cyan shadow-cyan"
                      : "border-white/12 text-white/55 hover:border-white/30 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Device + caption */}
        <Reveal className="mx-auto mt-10 max-w-3xl" delay={0.1}>
          <KioskoDevice state={current.state} />
          <p
            key={current.label}
            className="mx-auto mt-8 max-w-xl animate-[fadeIn_0.5s_ease] text-center text-lg leading-relaxed text-white/70"
          >
            {current.caption}
          </p>
        </Reveal>

        {/* Closing online/offline */}
        <Reveal className="mt-16 text-center">
          <div className="mx-auto flex w-max items-center gap-6 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3">
            <span className="flex items-center gap-2 text-sm font-600 text-white/80">
              <Wifi className="h-4 w-4 text-cyan" /> En línea
            </span>
            <span className="h-4 w-px bg-white/15" />
            <span className="flex items-center gap-2 text-sm font-600 text-white/80">
              <WifiOff className="h-4 w-4 text-cyan" /> Offline
            </span>
          </div>
          <p className="mt-6 font-display text-xl font-500 text-white/80 md:text-2xl">
            Funciona aunque tu sede pierda internet{" "}
            <span className="text-cyan">durante una semana.</span>
          </p>
        </Reveal>
      </div>

      <div className="fade-from-ink absolute -bottom-1 left-0 h-32 w-full translate-y-full" />
    </section>
  );
}
