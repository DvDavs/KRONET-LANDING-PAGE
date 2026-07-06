"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Estados con captura real del kiosko (no recreación). */
export type KioskoShotState = "publicidad" | "asistencia" | "error";

export const KIOSKO_SHOTS: Record<
  KioskoShotState,
  { src: string; alt: string }
> = {
  publicidad: {
    src: "/kiosko/publicidad-base.png",
    alt: "Kiosko Kronet mostrando publicidad a pantalla completa mientras espera",
  },
  asistencia: {
    src: "/kiosko/asistencia-capturada.png",
    alt: "Kiosko Kronet confirmando una asistencia registrada correctamente",
  },
  error: {
    src: "/kiosko/huella-no-reconocida.png",
    alt: "Kiosko Kronet indicando huella no reconocida, con opción de reintento o NIP",
  },
};

const ORDER: KioskoShotState[] = ["publicidad", "asistencia", "error"];

/**
 * Bezel del kiosko con las capturas REALES superpuestas y crossfade entre
 * estados. Las tres imágenes se montan una sola vez y sólo cambia la opacidad,
 * así la transición es fluida y no hay reflow ni bug de re-render.
 */
export function KioskoShot({
  state = "publicidad",
  className,
  glow = true,
  priority = false,
}: {
  state?: KioskoShotState;
  className?: string;
  glow?: boolean;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <div
          className="pointer-events-none absolute -inset-12 -z-10 rounded-[40px] opacity-80"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 42%, rgba(40,162,185,0.3), transparent 68%)",
          }}
        />
      )}
      <div className="rounded-[22px] border border-white/10 bg-gradient-to-b from-[#141d28] to-[#0a1119] p-2.5 shadow-ambient-dark sm:p-3">
        <div className="relative overflow-hidden rounded-[14px] bg-navy-ink ring-1 ring-white/5">
          <div className="relative aspect-[16/10] w-full">
            {ORDER.map((s) => {
              const shot = KIOSKO_SHOTS[s];
              const isActive = s === state;
              return (
                <Image
                  key={s}
                  src={shot.src}
                  alt={isActive ? shot.alt : ""}
                  aria-hidden={!isActive}
                  fill
                  priority={priority && s === "publicidad"}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className={cn(
                    "object-cover object-center transition-opacity duration-700 ease-brand",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* reflejo inferior */}
      <div
        className="mx-auto mt-1 h-8 w-[86%] rounded-b-[40px] opacity-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(40,162,185,0.22), transparent)",
        }}
      />
    </div>
  );
}

const AUTO_SEQUENCE: { state: KioskoShotState; ms: number }[] = [
  { state: "publicidad", ms: 3400 },
  { state: "asistencia", ms: 3000 },
  { state: "publicidad", ms: 2600 },
  { state: "error", ms: 2800 },
];

/** Kiosko que rota entre las capturas reales en loop — demo viva para el hero. */
export function AutoKioskoShot({ className }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setTimeout(
      () => setI((n) => (n + 1) % AUTO_SEQUENCE.length),
      AUTO_SEQUENCE[i].ms
    );
    return () => clearTimeout(id);
  }, [i]);

  return (
    <KioskoShot state={AUTO_SEQUENCE[i].state} className={className} priority />
  );
}
