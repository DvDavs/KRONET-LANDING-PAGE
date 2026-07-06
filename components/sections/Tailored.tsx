"use client";

import { MapPin, WifiOff, Palette, RefreshCw, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { TAILORED } from "@/lib/content";
import { cn } from "@/lib/utils";

const VISUALS = [MapVisual, SyncVisual, BrandVisual];

export function Tailored() {
  return (
    <section className="relative bg-navy-ink text-white">
      <div className="fade-to-ink pointer-events-none absolute bottom-full left-0 h-32 w-full" />
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-grid relative py-section">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Tu operación, a tu medida
          </p>
          <h2 className="mt-5 font-display text-section font-700 leading-tight">
            Una empresa con varias sedes no es la suma de sus oficinas.
          </h2>
          <p className="mt-5 text-lg text-white/60">
            Es un solo organismo. Kronet lo entiende así.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-20 md:gap-28">
          {TAILORED.map((block, i) => {
            const Visual = VISUALS[i];
            const Icon =
              block.icon === "map" ? MapPin : block.icon === "wifi-off" ? WifiOff : Palette;
            const flip = i % 2 === 1;
            return (
              <div
                key={block.kicker}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <Reveal
                  direction={flip ? "left" : "right"}
                  className={cn(flip && "md:order-2")}
                >
                  <div className="flex items-center gap-2 text-cyan">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-700 uppercase tracking-[0.18em]">
                      {block.kicker}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-700 leading-snug md:text-4xl">
                    {block.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-white/65">
                    {block.body}
                  </p>
                </Reveal>

                <Reveal
                  direction={flip ? "right" : "left"}
                  delay={0.1}
                  className={cn(flip && "md:order-1")}
                >
                  <Visual />
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-24 text-center">
          <p className="font-display text-2xl font-500 leading-snug md:text-3xl">
            Una sola plataforma.
            <br />
            <span className="text-white/55">Cualquier escala. </span>
            <span className="text-cyan">Tu identidad.</span>
          </p>
        </Reveal>
      </div>

      <div className="fade-from-ink pointer-events-none absolute top-full left-0 h-32 w-full" />
    </section>
  );
}

function VisualShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass-dark relative overflow-hidden rounded-2xl p-6">
      <div className="dot-grid-dark absolute inset-0 opacity-40" />
      <div className="relative aspect-[16/11]">{children}</div>
    </div>
  );
}

/** Multipunto — red de sedes con nube central y paquetes de datos animados. */
function MapVisual() {
  const reduce = useReducedMotion();
  const hub = { x: 160, y: 110 };
  const nodes = [
    { x: 58, y: 48, label: "Matriz", d: "M160 110 Q95 68 58 48" },
    { x: 262, y: 52, label: "Sede Norte", d: "M160 110 Q225 70 262 52" },
    { x: 58, y: 172, label: "Planta Sur", d: "M160 110 Q95 152 58 172" },
    { x: 262, y: 168, label: "Sucursal", d: "M160 110 Q225 150 262 168" },
  ];

  return (
    <VisualShell>
      <svg
        viewBox="0 0 320 220"
        className="absolute inset-0 h-full w-full"
        fill="none"
        role="img"
        aria-label="Nube central de Kronet conectada a cuatro sedes que sincronizan en tiempo real"
      >
        {/* Conexiones con flujo de datos */}
        {nodes.map((n, i) => (
          <g key={n.label}>
            <path
              id={`route-${i}`}
              d={n.d}
              stroke="rgba(40,162,185,0.28)"
              strokeWidth="1.5"
              strokeDasharray="1 6"
              strokeLinecap="round"
              className="animate-dash"
            />
            {!reduce && (
              <circle r="2.6" fill="#3dc5dd" style={{ filter: "drop-shadow(0 0 4px rgba(61,197,221,0.9))" }}>
                <animateMotion
                  dur="2.6s"
                  begin={`${i * 0.55}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                >
                  <mpath href={`#route-${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}

        {/* Sedes */}
        {nodes.map((n, i) => (
          <g key={`node-${n.label}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="22"
              fill="none"
              stroke="rgba(40,162,185,0.5)"
              strokeWidth="1"
              className="animate-ping"
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animationDelay: `${i * 0.5}s`,
              }}
            />
            <rect
              x={n.x - 15}
              y={n.y - 18}
              width="30"
              height="36"
              rx="4"
              fill="#0d2337"
              stroke="rgba(40,162,185,0.55)"
              strokeWidth="1"
            />
            {/* ventanas */}
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={n.x - 9 + col * 10}
                  y={n.y - 12 + row * 9}
                  width="6"
                  height="5"
                  rx="1"
                  fill="rgba(125,212,226,0.55)"
                />
              ))
            )}
            <text
              x={n.x}
              y={n.y + 31}
              textAnchor="middle"
              fontFamily="inherit"
              fontSize="10"
              fontWeight="600"
              fill="rgba(255,255,255,0.7)"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Nube central */}
        <circle cx={hub.x} cy={hub.y - 2} r="34" fill="rgba(40,162,185,0.16)" />
        <g fill="#28a2b9">
          <circle cx={hub.x - 14} cy={hub.y + 2} r="12" />
          <circle cx={hub.x + 2} cy={hub.y - 8} r="16" />
          <circle cx={hub.x + 18} cy={hub.y + 2} r="12" />
          <rect x={hub.x - 20} y={hub.y - 2} width="42" height="16" rx="8" />
        </g>
        <path
          d={`M${hub.x - 6} ${hub.y + 3} l5 5 l9 -11`}
          stroke="#0a1628"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={hub.x}
          y={hub.y + 40}
          textAnchor="middle"
          fontFamily="inherit"
          fontSize="10.5"
          fontWeight="700"
          fill="#3dc5dd"
        >
          Nube Kronet
        </text>
      </svg>

      <span className="absolute bottom-1 left-1 text-[11px] font-600 text-white/45">
        Nube central · sedes en tiempo real
      </span>
    </VisualShell>
  );
}

/** Offline — sede sin conexión que sincroniza sola al volver la línea. */
function SyncVisual() {
  return (
    <VisualShell>
      <div className="flex h-full items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-white/[0.04]">
            <WifiOff className="h-7 w-7 text-white/70" />
          </div>
          <span className="rounded-full bg-red-400/15 px-2 py-0.5 text-[10px] font-600 text-red-300">
            Sin conexión
          </span>
        </div>

        <div className="relative h-px flex-1">
          <div className="absolute inset-0 top-1/2 border-t border-dashed border-cyan/40" />
          <span className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 animate-travel rounded-full bg-cyan shadow-cyan" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cyan/15 ring-1 ring-cyan/40">
            <RefreshCw className="h-7 w-7 animate-spin text-cyan" style={{ animationDuration: "3s" }} />
          </div>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-600 text-emerald-300">
            Sincronizado
          </span>
        </div>
      </div>
      <span className="absolute bottom-1 left-1 text-[11px] font-600 text-white/45">
        Los registros nunca se pierden
      </span>
    </VisualShell>
  );
}

/** Personalización — el mismo kiosko con distintas identidades. */
function BrandVisual() {
  const brands = [
    { name: "Tu marca", color: "#28a2b9" },
    { name: "Corp. Azteca", color: "#c0562e" },
    { name: "Grupo Vértice", color: "#7c5cff" },
  ];
  return (
    <VisualShell>
      <div className="flex h-full flex-col justify-center gap-3">
        {brands.map((b, i) => (
          <div
            key={b.name}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
            style={{ boxShadow: i === 0 ? `0 0 0 1px ${b.color}66` : undefined }}
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-lg font-display text-sm font-800 text-white"
              style={{ background: b.color }}
            >
              {b.name.charAt(0)}
            </span>
            <div className="h-2 flex-1 rounded-full" style={{ background: `${b.color}44` }}>
              <div className="h-full w-2/3 rounded-full" style={{ background: b.color }} />
            </div>
            <Check className="h-4 w-4" style={{ color: b.color }} />
          </div>
        ))}
      </div>
      <span className="absolute bottom-1 left-1 text-[11px] font-600 text-white/45">
        Logo, colores, mensajes · por terminal
      </span>
    </VisualShell>
  );
}
