"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/ui/brand";
import { NAV_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function NavbarV2() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-brand",
        scrolled
          ? "border-b border-white/10 bg-navy-ink/95 shadow-[0_2px_24px_-8px_rgba(0,0,0,0.6)]"
          : "border-b border-transparent"
      )}
    >
      <nav className="container-grid flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label="Kronet — inicio" className="shrink-0">
          <Wordmark variant="white" className="h-6 w-auto md:h-7" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-500 text-white/65 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#calculadora"
            className="hidden text-sm font-600 text-white/65 transition-colors hover:text-white md:block"
          >
            Calcular ahorro
          </a>
          <a
            href="https://wa.me/529514709685?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20brindara%20m%C3%A1s%20informaci%C3%B3n%20de%20Kronet"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden !px-5 !py-2.5 !text-sm md:inline-flex"
          >
            Agendar demo
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-white lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-navy-ink transition-[max-height] duration-300 ease-brand lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        )}
      >
        <ul className="container-grid flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-500 text-white/80 hover:bg-white/5"
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-cyan" />
              </a>
            </li>
          ))}
          <li className="mt-2 px-3">
            <a
              href="https://wa.me/529514709685?text=Hola%2C%20me%20gustar%C3%ADa%20que%20me%20brindara%20m%C3%A1s%20informaci%C3%B3n%20de%20Kronet"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Agendar demo
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
