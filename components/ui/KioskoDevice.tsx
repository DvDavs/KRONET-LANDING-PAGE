"use client";

import { useEffect, useState } from "react";
import { KioskoScreen, type KioskoState } from "./KioskoScreen";
import { cn } from "@/lib/utils";

/** Bezel del dispositivo kiosko con sombra ambiental y reflejo. */
export function KioskoDevice({
  state = "idle",
  className,
  glow = true,
}: {
  state?: KioskoState;
  className?: string;
  glow?: boolean;
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
        <div className="overflow-hidden rounded-[14px] ring-1 ring-white/5">
          <div className="aspect-[16/10] w-full">
            <KioskoScreen state={state} className="h-full" />
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

const SEQUENCE: { state: KioskoState; ms: number }[] = [
  { state: "idle", ms: 2600 },
  { state: "scanning", ms: 1500 },
  { state: "success", ms: 2800 },
  { state: "idle", ms: 2200 },
  { state: "scanning", ms: 1500 },
  { state: "retardo", ms: 2800 },
  { state: "idle", ms: 2000 },
  { state: "scanning", ms: 1400 },
  { state: "error", ms: 2200 },
  { state: "scanning", ms: 1400 },
  { state: "salida", ms: 3000 },
];

/** Kiosko que recorre estados en loop — demo viva para el hero. */
export function AutoKiosko({ className }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setTimeout(
      () => setI((n) => (n + 1) % SEQUENCE.length),
      SEQUENCE[i].ms
    );
    return () => clearTimeout(id);
  }, [i]);

  return <KioskoDevice state={SEQUENCE[i].state} className={className} />;
}
