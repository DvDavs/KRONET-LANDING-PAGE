"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  SALARIES,
  SCENARIOS,
  computeRoi,
  type ScenarioKey,
} from "@/lib/calc";
import { mxn } from "@/lib/utils";

type SalaryMode = "minimo" | "promedio" | "custom";

export function Calculator() {
  const [employees, setEmployees] = useState(250);
  const [salaryMode, setSalaryMode] = useState<SalaryMode>("promedio");
  const [custom, setCustom] = useState(500);
  const [scenario, setScenario] = useState<ScenarioKey>("real");

  const dailySalary =
    salaryMode === "minimo"
      ? SALARIES.minimo
      : salaryMode === "promedio"
        ? SALARIES.promedio
        : Math.max(1, custom);

  const r = computeRoi(employees, dailySalary, SCENARIOS[scenario]);

  return (
    <section id="calculadora" className="relative scroll-mt-24 bg-offwhite py-section">
      <div className="container-grid">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Tu número, en 10 segundos
          </p>
          <h2 className="mt-4 font-display text-section font-700 text-navy">
            ¿Cuánto recuperarías tú?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-navy/60">
            Misma metodología del caso real. Mete el tamaño de tu operación y
            calculamos cuánto pierde tu nómina al mes — y cuánto retorno deja
            Kronet.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-14 max-w-5xl">
          <div className="grid overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-ambient lg:grid-cols-2">
            {/* Inputs */}
            <div className="flex flex-col gap-8 p-8 md:p-10">
              {/* Empleados */}
              <div>
                <div className="flex items-end justify-between">
                  <label htmlFor="emp" className="text-sm font-600 text-navy/70">
                    ¿Cuántos empleados?
                  </label>
                  <span className="font-display text-3xl font-700 tabular-nums text-navy">
                    {employees}
                    {employees >= 500 ? "+" : ""}
                  </span>
                </div>
                <input
                  id="emp"
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="kronet-range mt-4 w-full"
                  style={
                    {
                      "--pct": `${((employees - 50) / 450) * 100}%`,
                    } as React.CSSProperties
                  }
                  aria-valuetext={`${employees} empleados`}
                />
                <div className="mt-1 flex justify-between text-xs text-muted">
                  <span>50</span>
                  <span>500+</span>
                </div>
              </div>

              {/* Salario */}
              <fieldset>
                <legend className="text-sm font-600 text-navy/70">
                  Salario diario promedio
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Choice
                    active={salaryMode === "minimo"}
                    onClick={() => setSalaryMode("minimo")}
                    label="Mínimo"
                    sub="$315"
                  />
                  <Choice
                    active={salaryMode === "promedio"}
                    onClick={() => setSalaryMode("promedio")}
                    label="Promedio"
                    sub="$600"
                  />
                  <Choice
                    active={salaryMode === "custom"}
                    onClick={() => setSalaryMode("custom")}
                    label="Otro"
                    sub="$…"
                  />
                </div>
                {salaryMode === "custom" && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-navy/15 px-3 py-2">
                    <span className="text-navy/50">$</span>
                    <input
                      type="number"
                      min={1}
                      value={custom}
                      onChange={(e) => setCustom(Number(e.target.value))}
                      className="w-full bg-transparent text-navy outline-none"
                      aria-label="Salario diario personalizado"
                    />
                    <span className="text-sm text-muted">/día</span>
                  </div>
                )}
              </fieldset>

              {/* Escenario */}
              <fieldset>
                <legend className="text-sm font-600 text-navy/70">Escenario</legend>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <Choice
                    active={scenario === "conservador"}
                    onClick={() => setScenario("conservador")}
                    label="Conservador"
                    sub="3%"
                  />
                  <Choice
                    active={scenario === "real"}
                    onClick={() => setScenario("real")}
                    label="Real"
                    sub="7.13%"
                  />
                  <Choice
                    active={scenario === "severo"}
                    onClick={() => setScenario("severo")}
                    label="Severo"
                    sub="10%"
                  />
                </div>
              </fieldset>
            </div>

            {/* Outputs — panel oscuro */}
            <div className="relative flex flex-col justify-center gap-6 overflow-hidden bg-navy-ink p-8 text-white md:p-10">
              <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative">
                <p className="text-sm font-500 text-white/60">Recuperas hasta</p>
                <p className="mt-1 font-display text-[clamp(2.5rem,6vw,4rem)] font-700 leading-none text-cyan-grad">
                  <AnimatedValue value={r.yearlyRecovery} format={mxn} />
                </p>
                <p className="mt-1 text-sm font-500 text-white/50">al año</p>
              </div>

              <div className="relative grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <Metric label="Al mes" value={<AnimatedValue value={r.monthlyRecovery} format={mxn} />} />
                <Metric label="Inversión Kronet/mes" value={mxn(r.kronetMonthly)} />
              </div>

              <div className="relative flex items-center justify-between rounded-2xl bg-white/[0.04] p-5 ring-1 ring-cyan/20">
                <div>
                  <p className="font-display text-5xl font-700 leading-none text-cyan">
                    <AnimatedValue
                      value={r.ratio}
                      format={(n) => `${n.toFixed(1)}×`}
                    />
                  </p>
                  <p className="mt-1 text-xs text-white/55">por cada $1 invertido</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">Se paga en</p>
                  <p className="font-display text-2xl font-700 text-white">
                    <AnimatedValue
                      value={r.paybackDays}
                      format={(n) => `${Math.max(1, Math.round(n))} días`}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <a href="#demo" className="btn-primary">
              <Sparkles className="h-4 w-4" />
              Recibir análisis personalizado
            </a>
            <a
              href="https://wa.me/529514709685?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20brindara%20m%C3%A1s%20informaci%C3%B3n%20de%20Kronet"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group"
            >
              Agendar demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted">
            Cifras orientativas calculadas con la metodología del caso de estudio
            (22 días hábiles, salario CONASAMI 2026). El análisis personalizado
            ajusta a tu industria, esquema de turnos y reglas reales.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Choice({
  active,
  onClick,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex flex-col items-center rounded-xl border px-2 py-3 text-center transition-all duration-200 ${
        active
          ? "border-cyan bg-cyan/5 shadow-[0_0_0_1px_rgba(40,162,185,0.5)]"
          : "border-navy/12 hover:border-navy/25"
      }`}
    >
      <span className={`text-xs font-600 ${active ? "text-navy" : "text-navy/60"}`}>
        {label}
      </span>
      <span
        className={`mt-0.5 font-display text-lg font-700 ${
          active ? "text-cyan" : "text-navy/40"
        }`}
      >
        {sub}
      </span>
    </button>
  );
}

function Metric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-500 text-white/50">{label}</p>
      <p className="mt-1 font-display text-xl font-700 tabular-nums">{value}</p>
    </div>
  );
}

/** Tween suave del display cuando cambia el valor (brief §5/§8). */
function AnimatedValue({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    prev.current = value;
    if (from === to) return;
    let raf = 0;
    let start: number | null = null;
    const dur = 500;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setDisplay(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span className="tabular-nums">{format(display)}</span>;
}
