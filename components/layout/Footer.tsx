import { Mail } from "lucide-react";
import { Wordmark } from "@/components/ui/brand";

const COLS = [
  {
    title: "Producto",
    links: [
      { label: "Kiosko", href: "#kiosko" },
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Calculadora", href: "#calculadora" },
      { label: "Caso real", href: "#caso" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Kronet", href: "#top" },
      { label: "Contacto", href: "#demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-white">
      <div className="container-grid py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Wordmark className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/55">
              Control operativo y optimización de nómina para empresas con
              workforce intensivo.
            </p>
            {/*}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hola@kronet.app"
                aria-label="Correo"
                className="grid h-9 w-9 place-items-center rounded-lg border border-navy/10 text-navy/60 transition-colors hover:border-cyan hover:text-cyan"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            */}
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-700 text-navy">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-navy/55 transition-colors hover:text-cyan"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-navy/10 pt-8 text-sm text-navy/50 sm:flex-row">
          <p>© 2026 Kronet · Control operativo y optimización de nómina</p>
          <p>
            <a href="mailto:hola@kronet.app" className="hover:text-cyan">
              hola@kronet.app
            </a>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
}
