"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useStaticMotion } from "@/lib/motionPref";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * Envuelve un screenshot y lo abre a pantalla completa al hacer click.
 * Cierra con Esc, click en el fondo o el botón X. Bloquea el scroll del body
 * mientras está abierto y respeta prefers-reduced-motion.
 */
export function Lightbox({
  src,
  alt,
  children,
  className,
}: {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useStaticMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        aria-label={`Ampliar imagen: ${alt}`}
        className={cn(
          "block w-full cursor-zoom-in rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2",
          className
        )}
      >
        {children}
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={alt}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/85 p-4 backdrop-blur-sm sm:p-8"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              >
                <button
                  type="button"
                  aria-label="Cerrar"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur transition-colors hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={src}
                  alt={alt}
                  onClick={(e) => e.stopPropagation()}
                  className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
                  initial={
                    reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }
                  }
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
