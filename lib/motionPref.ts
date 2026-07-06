"use client";

import { useReducedMotion } from "framer-motion";

/**
 * True cuando las animaciones deben omitirse y el contenido renderizarse
 * en su estado final: si el usuario pide reduced-motion, o si la URL trae
 * ?static (modo sin animación — útil para captura/QA y para no depender de
 * requestAnimationFrame).
 */
export function useStaticMotion(): boolean {
  const reduce = useReducedMotion();
  const flag =
    typeof window !== "undefined" &&
    window.location.search.includes("static");
  return !!reduce || flag;
}
