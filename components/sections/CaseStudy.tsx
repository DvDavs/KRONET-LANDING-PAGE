"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, ScanLine } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { CASE } from "@/lib/content";
import { mxn, num } from "@/lib/utils";
import { useStaticMotion } from "@/lib/motionPref";

export function CaseStudy() {
  return (
    <section id="caso" className="relative scroll-mt-24 bg-white py-section">
      <div className="container-grid">
        {/* Bloque 1 — header */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Caso real · datos verificables
          </p>
          <h2 className="mt-4 font-display text-section font-700 text-navy">
            577 empleados. 7 meses.
            <br />
            <span className="text-cyan">{mxn(CASE.protected)}</span> protegidos.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-navy/60">
            Una institución con workforce intensivo midió lo que su sistema
            anterior no podía ver.
          </p>
        </Reveal>

        {/* Bloque 2 — hero stat */}
        <Reveal className="mt-20 text-center" delay={0.05}>
          <p className="font-display text-stat font-700 leading-none text-cyan-grad">
            <Counter value={CASE.protected} format={(n) => mxn(n)} duration={2} />
          </p>
          <div className="mx-auto mt-6 h-px w-64 max-w-full bg-gradient-to-r from-transparent via-navy/25 to-transparent" />
          <p className="mt-6 text-lg text-navy/70">
            7 meses de operación · 577 empleados · promedio{" "}
            <span className="font-600 text-navy">7.13%</span> de la nómina mensual
          </p>
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-4 text-sm font-500 text-muted">
            <span>Sep 2025</span>
            <span className="h-px flex-1 bg-navy/15" />
            <span>Abr 2026</span>
          </div>
        </Reveal>

        {/* Bloque 3 — división del valor */}
        <div className="mx-auto mt-24 max-w-3xl">
          <Reveal>
            <h3 className="text-center font-display text-2xl font-700 text-navy md:text-3xl">
              Dos fuentes de valor
            </h3>
          </Reveal>
          <div className="mt-10 space-y-8">
            <Bar
              pct={CASE.attendance.pct}
              tone="navy"
              title="Asistencia bien medida"
              detail={`${num(CASE.attendance.count)} ausencias correctamente capturadas`}
            />
            <Bar
              pct={CASE.audit.pct}
              tone="cyan"
              title="Auditoría activa"
              detail={`${num(CASE.audit.count)} registros con manipulación detectada`}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-12 text-center font-display text-2xl font-500 leading-snug text-navy md:text-[1.75rem]">
              El sistema se paga solo haciendo bien lo básico.
              <br />
              <span className="text-navy/50">La auditoría activa es la cereza.</span>
            </p>
          </Reveal>
        </div>

        {/* Bloque 4 — proyección */}
        <Reveal className="mx-auto mt-24 max-w-2xl rounded-3xl border border-navy/10 bg-offwhite p-10 text-center md:p-14">
          <p className="text-sm font-500 text-navy/60">
            En 10 años sin esto, esa institución habría pagado:
          </p>
          <p className="mt-4 font-display text-stat font-700 leading-none text-cyan-grad">
            <Counter
              value={CASE.projection10y}
              format={(n) => `$${(n / 1_000_000).toFixed(0)}M`}
              duration={2}
            />
          </p>
          <p className="mx-auto mt-5 max-w-md text-lg text-navy/60">
            El equivalente a{" "}
            <span className="font-600 text-navy">8.5 meses de nómina</span> por
            trabajo que no ocurrió.
          </p>
        </Reveal>

        {/* Bloque 5 — metodología + CTA */}
        <div className="mx-auto mt-20 max-w-3xl">
          <Reveal className="rounded-2xl border border-navy/10 bg-white p-6 md:p-8">
            <p className="flex items-center gap-2 text-xs font-700 uppercase tracking-wider text-cyan">
              <ScanLine className="h-4 w-4" /> Metodología
            </p>
            <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {[
                ["Periodo", CASE.period],
                ["Universo", "577 empleados con registro activo"],
                ["Base", "Salario mínimo CONASAMI 2026"],
                ["Proyección", "Tasa mensual constante observada"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col border-l-2 border-cyan/30 pl-3">
                  <dt className="font-600 text-navy/50">{k}</dt>
                  <dd className="text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12 text-center" delay={0.05}>
            <p className="flex items-center justify-center gap-2 text-sm font-500 text-navy/60">
              <ShieldCheck className="h-4 w-4 text-cyan" />
              Datos reales · Institución real · Impacto verificable
            </p>
            <h3 className="mt-6 font-display text-3xl font-700 text-navy md:text-4xl">
              ¿Cuánto recuperarías tú?
            </h3>
            <a href="#calculadora" className="btn-primary mt-8">
              Calcular mi ahorro
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Bar({
  pct,
  tone,
  title,
  detail,
}: {
  pct: number;
  tone: "navy" | "cyan";
  title: string;
  detail: string;
}) {
  const isStatic = useStaticMotion();
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="font-display text-lg font-700 text-navy">{title}</span>
        <span
          className={`font-display text-2xl font-700 ${
            tone === "cyan" ? "text-cyan" : "text-navy"
          }`}
        >
          {pct}%
        </span>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-navy/[0.06]">
        <motion.div
          className={`h-full rounded-full ${
            tone === "cyan"
              ? "bg-cyan"
              : "bg-gradient-to-r from-navy to-navy-alt"
          }`}
          initial={isStatic ? false : { width: 0 }}
          animate={isStatic ? { width: `${pct}%` } : undefined}
          whileInView={isStatic ? undefined : { width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <p className="mt-2 text-sm text-navy/55">{detail}</p>
    </div>
  );
}
