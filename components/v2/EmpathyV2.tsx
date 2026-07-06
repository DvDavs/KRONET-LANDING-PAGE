"use client";

import { ClipboardList, TrendingUp, Waypoints, ArrowRight } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { EMPATHY_CARDS } from "@/lib/content";

const ICONS = {
  clipboard: ClipboardList,
  trending: TrendingUp,
  network: Waypoints,
} as const;

export function EmpathyV2() {
  return (
    <section className="relative bg-navy-ink py-section text-white">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="container-grid relative">
        <Reveal className="text-center">
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Tres roles · un mismo problema
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-section font-700">
            Para cada quien, su dolor.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/55">
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
                  className="group flex h-full flex-col rounded-2xl glass-dark p-8 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-cyan/40 hover:shadow-cyan"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/12 text-cyan transition-colors group-hover:bg-cyan group-hover:text-navy-ink">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <p className="mt-6 text-xs font-600 uppercase tracking-wider text-white/40">
                    {card.role}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-700 leading-snug text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-white/55">
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
