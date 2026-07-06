import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Chrome de ventana estilo macOS para presentar screenshots de producto
 * (tratamiento del brief para el tour de módulos).
 */
export function MacWindow({
  children,
  url,
  className,
  barClassName,
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div className={cn("mac-chrome ring-1 ring-white/10", className)}>
      <div className={cn("mac-bar", barClassName)}>
        <span className="mac-dot bg-[#ff5f57]" />
        <span className="mac-dot bg-[#febc2e]" />
        <span className="mac-dot bg-[#28c840]" />
        {url && (
          <div className="ml-3 hidden flex-1 sm:block">
            <div className="mx-auto w-max max-w-full truncate rounded-md bg-black/25 px-3 py-1 text-[11px] font-medium text-white/45">
              {url}
            </div>
          </div>
        )}
      </div>
      <div className="relative bg-white">{children}</div>
    </div>
  );
}
