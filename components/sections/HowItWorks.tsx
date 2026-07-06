"use client";

import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MacWindow } from "@/components/ui/MacWindow";
import { HOW_IT_WORKS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative bg-offwhite py-section">
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
          {HOW_IT_WORKS.map((step) => {
            const dark = "dark" in step.image && step.image.dark;

            return (
            <RevealItem key={step.step}>
              <div className="flex h-full flex-col">
                {/* media */}
                <div className="relative">
                  <MacWindow>
                    <div
                      className={cn("relative", dark ? "bg-navy-ink" : "bg-white")}
                      style={{ aspectRatio: step.image.aspect }}
                    >
                      <div
                        className={cn(
                          "absolute",
                          dark ? "inset-2 sm:inset-3" : "inset-3 sm:inset-4"
                        )}
                      >
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </MacWindow>
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
            );
          })}
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
