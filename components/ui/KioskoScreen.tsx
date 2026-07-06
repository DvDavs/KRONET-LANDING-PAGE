"use client";

import { memo, useEffect, useState } from "react";
import {
  Volume2,
  Maximize2,
  RefreshCw,
  Fingerprint as FpChip,
  Calendar,
  LogIn,
  LogOut,
  User,
  Megaphone,
} from "lucide-react";
import { Fingerprint, type ScanState } from "./Fingerprint";
import { cn } from "@/lib/utils";

export type KioskoState =
  | "idle"
  | "scanning"
  | "success"
  | "retardo"
  | "salida"
  | "error";

interface StateConfig {
  fp: ScanState;
  accent: "cyan" | "green" | "amber" | "red";
  heading?: string;
  status: string;
  sub: string;
  employee: string;
  entrada: string;
  salida: string;
}

const CONFIG: Record<KioskoState, StateConfig> = {
  idle: {
    fp: "idle",
    accent: "cyan",
    status: "Coloque su dedo en el escáner",
    sub: "Usar No. de tarjeta",
    employee: "Usuario",
    entrada: "00:00",
    salida: "00:00",
  },
  scanning: {
    fp: "scanning",
    accent: "cyan",
    status: "Leyendo huella…",
    sub: "No retire el dedo",
    employee: "Verificando…",
    entrada: "00:00",
    salida: "00:00",
  },
  success: {
    fp: "success",
    accent: "green",
    heading: "Entrada registrada",
    status: "Carlos Ramírez",
    sub: "Reconocido en 0.6 s · Puntual",
    employee: "Carlos Ramírez",
    entrada: "07:58",
    salida: "—",
  },
  retardo: {
    fp: "success",
    accent: "amber",
    heading: "Entrada · con retardo",
    status: "Carlos Ramírez",
    sub: "Retardo · 12 minutos",
    employee: "Carlos Ramírez",
    entrada: "08:12",
    salida: "—",
  },
  salida: {
    fp: "success",
    accent: "green",
    heading: "Salida registrada",
    status: "Jornada completa",
    sub: "8h 02m trabajadas hoy",
    employee: "Carlos Ramírez",
    entrada: "07:58",
    salida: "17:00",
  },
  error: {
    fp: "error",
    accent: "red",
    heading: "Huella no reconocida",
    status: "Intente nuevamente",
    sub: "O use su número de tarjeta",
    employee: "Usuario",
    entrada: "00:00",
    salida: "00:00",
  },
};

const accentBorder: Record<StateConfig["accent"], string> = {
  cyan: "border-cyan/15",
  green: "border-emerald-400/40 shadow-[inset_0_0_40px_-10px_rgba(52,211,153,0.35)]",
  amber: "border-amber-400/40 shadow-[inset_0_0_40px_-10px_rgba(251,191,36,0.3)]",
  red: "border-red-400/40 shadow-[inset_0_0_40px_-10px_rgba(248,113,113,0.35)]",
};
const accentText: Record<StateConfig["accent"], string> = {
  cyan: "text-white",
  green: "text-emerald-300",
  amber: "text-amber-300",
  red: "text-red-300",
};

/** Reloj aislado: sólo esto re-renderiza cada segundo, no todo el device. */
const Clock = memo(function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now ? now.toLocaleTimeString("es-MX", { hour12: false }) : "--:--:--";
  const date = now
    ? now.toLocaleDateString("es-MX", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">
        <FpChip className="h-5 w-5 text-cyan sm:h-6 sm:w-6" strokeWidth={1.6} />
        <span className="font-display text-xl font-700 tabular-nums tracking-tight sm:text-3xl">
          {time}
        </span>
      </div>
      <div className="hidden items-center gap-2 text-sm font-500 text-white/80 md:flex">
        <Calendar className="h-4 w-4 text-cyan" />
        <span className="capitalize">{date}</span>
      </div>
    </>
  );
});

const AD_SLIDES = [
  { kicker: "Este espacio es tuyo", title: "Tu publicidad", accent: "irá aquí." },
  { kicker: "Comunicación interna", title: "Junta general", accent: "viernes 3 pm." },
  { kicker: "Cultura", title: "Felicidades", accent: "a los del mes." },
];

/** Panel de publicidad aislado: sólo esto rota cada 3.2s. */
const AdPanel = memo(function AdPanel() {
  const [ad, setAd] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAd((a) => (a + 1) % AD_SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative hidden overflow-hidden rounded-xl border border-cyan/10 bg-gradient-to-b from-[#0e2a44] to-[#0a1c30] lg:block">
      <div className="dot-grid-dark absolute inset-0 opacity-60" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-center gap-1.5 text-cyan">
          <Megaphone className="h-4 w-4" />
          <span className="text-[10px] font-700 uppercase tracking-[0.18em]">
            {AD_SLIDES[ad].kicker}
          </span>
        </div>
        <div key={ad} className="animate-[fadeIn_0.6s_ease]">
          <p className="font-display text-2xl font-800 leading-tight text-white">
            {AD_SLIDES[ad].title}
            <br />
            <span className="text-cyan">{AD_SLIDES[ad].accent}</span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {AD_SLIDES.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === ad ? "w-5 bg-cyan" : "w-1.5 bg-white/25"
                )}
              />
            ))}
          </div>
          <span className="text-[9px] font-600 uppercase tracking-wider text-white/40">
            Kronet Ads
          </span>
        </div>
      </div>
    </div>
  );
});

/** Recreación fiel de la pantalla del kiosko Kronet (estructura estática). */
export function KioskoScreen({
  state = "idle",
  className,
}: {
  state?: KioskoState;
  className?: string;
}) {
  const c = CONFIG[state];

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col gap-3 bg-navy-ink p-3 text-white sm:gap-4 sm:p-4",
        className
      )}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between rounded-xl border border-cyan/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
        <Clock />
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1.5 rounded-full bg-cyan/20 px-2 py-1 sm:flex">
            <span className="h-3 w-5 rounded-full bg-cyan/80 p-0.5">
              <span className="block h-2 w-2 translate-x-2 rounded-full bg-white" />
            </span>
            <Volume2 className="h-3.5 w-3.5 text-cyan" />
          </div>
          <IconBtn>
            <Maximize2 className="h-3.5 w-3.5" />
          </IconBtn>
          <IconBtn>
            <RefreshCw className="h-3.5 w-3.5" />
          </IconBtn>
          <div className="flex items-center gap-1 rounded-lg border border-cyan/20 bg-white/[0.03] px-2 py-1 text-[10px] font-600 text-cyan">
            <FpChip className="h-3.5 w-3.5" />
            B2FE
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid min-h-0 flex-1 grid-cols-[1fr] gap-3 sm:gap-4 lg:grid-cols-[1.7fr_1fr]">
        {/* Left column */}
        <div className="flex min-h-0 flex-col gap-3 sm:gap-4">
          {/* Main scanner panel */}
          <div
            className={cn(
              "relative grid flex-1 place-items-center rounded-xl border bg-white/[0.02] p-4 transition-all duration-500",
              accentBorder[c.accent]
            )}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              {c.heading && (
                <p className={cn("text-lg font-700 sm:text-2xl", accentText[c.accent])}>
                  {c.heading}
                </p>
              )}
              <Fingerprint state={c.fp} size={112} />
              <div>
                <p className={cn("text-base font-600 sm:text-lg", accentText[c.accent])}>
                  {c.status}
                </p>
                <p className="mt-1 text-xs text-white/45 sm:text-sm">{c.sub}</p>
              </div>
            </div>
          </div>

          {/* User card */}
          <div className="rounded-xl border border-cyan/10 bg-white/[0.03] p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan/15 text-cyan sm:h-12 sm:w-12">
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <p className="text-lg font-700 sm:text-xl">{c.employee}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
              <TimeCard icon={<LogIn className="h-4 w-4" />} label="Entrada" value={c.entrada} active={c.entrada !== "00:00"} />
              <TimeCard icon={<LogOut className="h-4 w-4" />} label="Salida" value={c.salida} active={c.salida !== "00:00" && c.salida !== "—"} />
            </div>
          </div>
        </div>

        {/* Ad panel (9:16) */}
        <AdPanel />
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-7 w-7 place-items-center rounded-lg border border-cyan/15 bg-white/[0.03] text-white/60">
      {children}
    </div>
  );
}

function TimeCard({
  icon,
  label,
  value,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-2.5 transition-colors sm:p-3",
        active ? "border-cyan/25 bg-cyan/[0.06]" : "border-white/5 bg-white/[0.01]"
      )}
    >
      <div className="flex items-center gap-1.5 text-xs font-500 text-white/70">
        <span className={active ? "text-cyan" : "text-white/40"}>{icon}</span>
        {label}
      </div>
      <p
        className={cn(
          "mt-1 font-display text-2xl font-700 tabular-nums sm:text-3xl",
          active ? "text-white" : "text-white/30"
        )}
      >
        {value}
      </p>
    </div>
  );
}
