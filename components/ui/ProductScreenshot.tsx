import Image from "next/image";
import { cn } from "@/lib/utils";

type ProductScreenshotProps = {
  src: string;
  alt: string;
  aspect: string;
  sizes: string;
  /** compact = tarjetas en grid; default = showcase ancho */
  density?: "compact" | "default";
  dark?: boolean;
};

export function isPortraitAspect(aspect: string) {
  const [w, h] = aspect.split("/").map(Number);
  return h > w;
}

export function macWindowMobileClass(aspect: string) {
  return cn(
    "mx-auto w-full",
    isPortraitAspect(aspect) &&
      "w-fit max-w-[min(100%,15rem)] sm:max-w-xs md:w-full md:max-w-none"
  );
}

export function ProductScreenshot({
  src,
  alt,
  aspect,
  sizes,
  density = "default",
  dark = false,
}: ProductScreenshotProps) {
  const frame = (
    <div
      className={cn(
        "relative mx-auto w-auto max-w-full md:w-full",
        density === "compact"
          ? "max-h-52 sm:max-h-60"
          : "max-h-64 sm:max-h-80",
        "md:max-h-none",
        !dark && "bg-white"
      )}
      style={{ aspectRatio: aspect }}
    >
      <div
        className={cn(
          "absolute",
          dark ? "inset-2 sm:inset-3" : "inset-2.5 sm:inset-4"
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain"
        />
      </div>
    </div>
  );

  if (dark) {
    return (
      <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy-ink shadow-card">
        {frame}
      </div>
    );
  }

  return frame;
}
