"use client";

import { ClipboardList, TrendingUp, Waypoints, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EMPATHY_CARDS } from "@/lib/content";

const ICONS = {
  clipboard: ClipboardList,
  trending: TrendingUp,
  network: Waypoints,
} as const;

export function Empathy() {
  return (
    <section className="relative bg-offwhite py-section">
      <div className="container-grid">
        <Reveal>
          <p className="eyebrow text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Tres roles · un mismo problema
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-section font-700 text-navy">
            Para cada quien, su dolor.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-navy/65">
            Si trabajas con nómina, diriges una operación o aseguras
            productividad — Kronet resuelve algo distinto para ti.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {EMPATHY_CARDS.map((card) => {
            const Icon = ICONS[card.icon];
            return (
              <RevealItem key={card.role}>
                <a
                  href={card.href}
                  className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-8 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-cyan/30 hover:shadow-ambient"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <p className="mt-6 text-xs font-600 uppercase tracking-wider text-muted">
                    {card.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-700 leading-snug text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-navy/60">
                    {card.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-600 text-cyan">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
