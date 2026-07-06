import { cn } from "@/lib/utils";

/** Wordmark completo KRONET (isotipo + logotipo). SVG vectorial de marca. */
export function Wordmark({
  className,
  variant = "color",
}: {
  className?: string;
  variant?: "color" | "white";
}) {
  const src =
    variant === "white" ? "/brand/kronet-logo-white.svg" : "/brand/kronet-logo.svg";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="Kronet" className={cn("block", className)} />;
}

/** Isotipo (huella + reloj) — la marca gráfica. */
export function Isotipo({
  className,
  variant = "color",
}: {
  className?: string;
  variant?: "color" | "white";
}) {
  const src =
    variant === "white" ? "/brand/isotipo-white.svg" : "/brand/isotipo.svg";
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden className={cn("block", className)} />;
}
