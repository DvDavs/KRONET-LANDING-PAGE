"use client";

import { useEffect, useState } from "react";

/**
 * True en viewport >= 768px. Default desktop hasta montar (evita hydration
 * mismatch: SSR y primer render cliente coinciden), luego corrige.
 * Permite renderizar SOLO la variante necesaria y no montar componentes
 * pesados (kioskos con timers) que estarían ocultos.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
