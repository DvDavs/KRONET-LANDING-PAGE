"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MacWindow } from "@/components/ui/MacWindow";
import { HOW_IT_WORKS } from "@/lib/content";
import { ZoomIn } from "lucide-react";

const MEDIA = [
  { src: "/kiosko/idle.png", alt: "Kiosko Kronet preconfigurado y conectado", dark: true, aspect: "1978/1236", zoom: 1.55 },
  { src: "/app/huella-dedo.png", alt: "Flujo guiado de enrolamiento de huella, selección de dedo", dark: false, aspect: "1332/1144" },
  { src: "/app/reporte-status.png", alt: "Reporte de asistencias con estatus por empleado: retardo, tolerancia, normal, falta", dark: false, aspect: "920/672" },
] as const;

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative scroll-mt-24 bg-offwhite py-section">
      <div className="container-grid">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            Cómo funciona
          </p>
          <h2 className="mt-4 font-display text-section font-700 text-navy">
            De cero a midiendo, en una semana.
          </h2>
          <p className="mt-5 text-lg text-navy/60">
            Sin consultor. Sin meses de implementación. Sin Excel.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8" stagger={0.15}>
          {HOW_IT_WORKS.map((step, i) => (
            <RevealItem key={step.step}>
              <div className="flex h-full flex-col">
                {/* media */}
                <div className="relative">
                  {MEDIA[i].dark ? (
                    <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy-ink shadow-card">
                      <div
                        className="relative"
                        style={{ aspectRatio: MEDIA[i].aspect }}
                      >
                        <div className="absolute inset-2 sm:inset-3">
                          <Image
                            src={MEDIA[i].src}
                            alt={MEDIA[i].alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <MacWindow>
                      <div
                        className="relative bg-white"
                        style={{ aspectRatio: MEDIA[i].aspect }}
                      >
                        <div className="absolute inset-3 sm:inset-4">
                          <Image
                            src={MEDIA[i].src}
                            alt={MEDIA[i].alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </MacWindow>
                  )}
                </div>

                {/* text */}
                <div className="mt-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl font-700 leading-none text-cyan">
                      {step.step}
                    </span>
                    <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-600 text-cyan">
                      {step.time}
                    </span>
                  </div>
                  <div className="mt-4 h-px w-12 bg-cyan" />
                  <h3 className="mt-4 font-display text-2xl font-700 text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-navy/60">{step.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16 text-center" delay={0.1}>
          <p className="font-display text-2xl font-500 text-navy md:text-3xl">
            Una semana. Y el caos manual queda{" "}
            <span className="text-cyan">en otra vida.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
