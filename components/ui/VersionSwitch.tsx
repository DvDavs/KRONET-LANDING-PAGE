import { ArrowLeftRight } from "lucide-react";

/** Pill flotante para saltar entre las dos versiones de la landing. */
export function VersionSwitch({ current }: { current: "v1" | "v2" }) {
  const target = current === "v1" ? "/v2" : "/";
  const label = current === "v1" ? "Ver versión 2 · Dark" : "Ver versión 1 · Light";
  return (
    <a
      href={target}
      className={
        current === "v1"
          ? "fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-navy-ink px-4 py-2.5 text-xs font-600 text-white shadow-ambient-dark transition-transform hover:-translate-y-0.5"
          : "fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2.5 text-xs font-600 text-navy shadow-card transition-transform hover:-translate-y-0.5"
      }
    >
      <ArrowLeftRight className="h-3.5 w-3.5 text-cyan" />
      {label}
    </a>
  );
}
