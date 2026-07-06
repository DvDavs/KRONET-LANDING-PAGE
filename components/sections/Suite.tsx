"use client";

import Image from "next/image";
import { Cloud, Layers, BarChart3, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MacWindow } from "@/components/ui/MacWindow";
import { SUITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const ICONS = { cloud: Cloud, layers: Layers, "bar-chart": BarChart3 } as const;
const URLS = [
  "kronet.app/asistencias",
  "kronet.app/horarios",
  "kronet.app/reportes",
] as const;
const MEDIA = [
  { aspect: "1660/1297", mobileMaxW: "" },
  { aspect: "907/1247", mobileMaxW: "max-w-[320px]" },
  { aspect: "920/672", mobileMaxW: "" },
] as const;

export function Suite() {
  return (
    <section id="suite" className="relative bg-white py-section">
      <div className="container-grid">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            La suite completa
          </p>
          <h2 className="mt-4 font-display text-section font-700 text-navy">
            Más allá del registro de entrada y salida.
          </h2>
          <p className="mt-5 text-lg text-navy/60">
            Tres motores. Una sola plataforma. Configurable según el tamaño de tu
            operación.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24">
          {SUITE.map((mod, i) => {
            const Icon = ICONS[mod.icon as keyof typeof ICONS];
            const flip = i % 2 === 1;
            return (
              <div
                key={mod.kicker}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <Reveal
                  direction={flip ? "left" : "right"}
                  className={cn(flip && "md:order-2")}
                >
                  <div className="flex items-center gap-2 text-cyan">
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-700 uppercase tracking-[0.18em]">
                      {mod.kicker}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-700 leading-snug text-navy md:text-[2.5rem]">
                    {mod.title}
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3">
                    {mod.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-navy/70">
                        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cyan/12 text-cyan">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal
                  direction={flip ? "right" : "left"}
                  delay={0.1}
                  className={cn(flip && "md:order-1")}
                >
                  <div className={cn("mx-auto md:max-w-none", MEDIA[i].mobileMaxW)}>
                    <MacWindow url={URLS[i]}>
                      <div
                        className="relative bg-white"
                        style={{ aspectRatio: MEDIA[i].aspect }}
                      >
                        <div className="absolute inset-3 sm:inset-4">
                          <Image
                            src={mod.image}
                            alt={mod.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </MacWindow>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="font-display text-2xl font-500 text-navy md:text-3xl">
            Todo configurable. Todo medible.{" "}
            <span className="text-cyan">Todo trazable.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
