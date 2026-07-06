"use client";

import { Fingerprint as FingerprintIcon, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ScanState = "idle" | "scanning" | "success" | "error";

const ring: Record<ScanState, string> = {
  idle: "text-cyan-soft/70",
  scanning: "text-cyan",
  success: "text-emerald-400",
  error: "text-red-400",
};

/**
 * Huella biométrica animada — el motivo central de Kronet.
 * Estados: idle (respira), scanning (línea de escaneo + pulsos),
 * success (check), error (X). Usada dentro del kiosko y como acento.
 */
export function Fingerprint({
  state = "idle",
  size = 132,
  className,
}: {
  state?: ScanState;
  size?: number;
  className?: string;
}) {
  const showFp = state === "idle" || state === "scanning";
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Pulsos concéntricos */}
      {(state === "scanning" || state === "success" || state === "error") && (
        <>
          <span
            className={cn(
              "absolute inset-0 rounded-full border",
              state === "success"
                ? "border-emerald-400/40"
                : state === "error"
                  ? "border-red-400/40"
                  : "border-cyan/40",
              "animate-pulse-ring"
            )}
          />
          <span
            className={cn(
              "absolute inset-0 rounded-full border",
              state === "success"
                ? "border-emerald-400/30"
                : state === "error"
                  ? "border-red-400/30"
                  : "border-cyan/30",
              "animate-pulse-ring"
            )}
            style={{ animationDelay: "0.8s" }}
          />
        </>
      )}

      {/* Halo suave — radial-gradient (sin filter:blur, barato de componer) */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-500"
        style={{
          background:
            state === "success"
              ? "radial-gradient(circle, rgba(52,211,153,0.28), transparent 68%)"
              : state === "error"
                ? "radial-gradient(circle, rgba(248,113,113,0.28), transparent 68%)"
                : "radial-gradient(circle, rgba(40,162,185,0.24), transparent 68%)",
        }}
      />

      {/* Huella con máscara de escaneo */}
      {showFp && (
        <div className="relative" style={{ width: size * 0.62, height: size * 0.62 }}>
          <FingerprintIcon
            className={cn("h-full w-full transition-colors duration-500", ring[state])}
            strokeWidth={1.4}
          />
          {state === "scanning" && (
            <div
              className="pointer-events-none absolute inset-x-0 h-1/2 animate-scan"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(61,197,221,0.85), transparent)",
                filter: "blur(1px)",
              }}
            />
          )}
        </div>
      )}

      {state === "success" && (
        <Check
          className="relative h-1/2 w-1/2 text-emerald-400"
          strokeWidth={2.5}
        />
      )}
      {state === "error" && (
        <X className="relative h-1/2 w-1/2 text-red-400" strokeWidth={2.5} />
      )}
    </div>
  );
}
