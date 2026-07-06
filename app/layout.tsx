import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const SITE_URL = "https://kronet.mx";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kronet · Control operativo y optimización de nómina",
  description:
    "Plataforma antifraude de control de asistencia para empresas con workforce intensivo. Recupera hasta 7.13% de tu nómina. Caso real verificable: $1,994,833 protegidos en 7 meses.",
  keywords: [
    "control de asistencia",
    "optimización de nómina",
    "checador biométrico",
    "antifraude nómina",
    "control operativo",
    "kiosko de asistencia",
  ],
  authors: [{ name: "Kronet" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    title: "Kronet · Control operativo y optimización de nómina",
    description:
      "Tu nómina pierde 7.13% al mes. Sin que lo veas. Plataforma de control operativo y auditoría activa. Caso real: $1,994,833 protegidos en 7 meses.",
    siteName: "Kronet",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kronet · Control operativo y optimización de nómina",
    description:
      "Tu nómina pierde 7.13% al mes. Sin que lo veas. Recupera el dinero que se fuga sin que lo veas.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1628",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kronet",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Cloud, Edge",
  description:
    "Plataforma de control operativo y optimización de nómina con biometría de huella, auditoría activa y resiliencia offline para empresas con workforce intensivo.",
  offers: {
    "@type": "Offer",
    priceCurrency: "MXN",
    price: "15000",
    description: "Desde, según tamaño de operación",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
