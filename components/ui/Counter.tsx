"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useStaticMotion } from "@/lib/motionPref";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Cuenta de 0 → value al entrar al viewport (brief §4/§8).
 * Reduced-motion: muestra el valor final directo.
 */
export function Counter({
  value,
  duration = 1.6,
  format = (n) => Math.round(n).toLocaleString("es-MX"),
  className,
  start = 0,
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  start?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useStaticMotion();
  const [display, setDisplay] = useState(start);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    let startTs: number | null = null;
    const from = start;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const p = Math.min((ts - startTs) / (duration * 1000), 1);
      setDisplay(from + (value - from) * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce, start]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
