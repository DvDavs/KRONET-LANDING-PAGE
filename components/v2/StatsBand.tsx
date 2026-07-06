"use client";

import { Counter } from "@/components/ui/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { CASE } from "@/lib/content";
import { mxn } from "@/lib/utils";

const STATS = [
  {
    value: CASE.protected,
    format: (n: number) => mxn(n),
    label: "protegidos en 7 meses",
  },
  {
    value: CASE.employees,
    format: (n: number) => Math.round(n).toString(),
    label: "empleados, caso real",
  },
  {
    value: 7.13,
    format: (n: number) => `${n.toFixed(2)}%`,
    label: "de la nómina, recuperable",
  },
  {
    value: 8.2,
    format: (n: number) => `${n.toFixed(1)}×`,
    label: "retorno por $1 invertido",
  },
];

export function StatsBand() {
  return (
    <section className="relative bg-navy-ink py-16 text-white md:py-20">
      <div className="container-grid">
        <Reveal>
          <p className="text-center text-xs font-600 uppercase tracking-[0.22em] text-white/40">
            Datos reales · Institución real · Impacto verificable
          </p>
        </Reveal>
        <RevealGroup
          className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4"
          stagger={0.1}
        >
          {STATS.map((s) => (
            <RevealItem key={s.label}>
              <div className="text-center">
                <p className="font-display text-4xl font-700 text-cyan-grad md:text-5xl">
                  <Counter value={s.value} format={s.format} duration={1.8} />
                </p>
                <p className="mt-2 text-sm text-white/50">{s.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
