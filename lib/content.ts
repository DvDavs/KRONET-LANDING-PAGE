/**
 * Copy y datos de la landing — fuente: Brief_Landing_Kronet §5.
 * Se mantiene aquí para que los componentes de sección queden declarativos.
 */

export const NAV_LINKS = [
  { label: "Producto", href: "#kiosko" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Calculadora", href: "#calculadora" },
  { label: "Caso real", href: "#caso" },
  { label: "Suite", href: "#suite" },
] as const;

export const INDUSTRIES = [
  "Manufactura",
  "Maquila",
  "Retail multisucursal",
  "Universidades",
] as const;

export const EMPATHY_CARDS = [
  {
    role: "Para Recursos Humanos",
    icon: "clipboard",
    title: "Cerrar nómina sin perder el sueño.",
    body: "Cálculos automáticos, justificaciones trazables y reportes que se generan solos. Tres días menos de estrés cada quincena.",
    cta: "Ver módulo de reportes",
    href: "#suite",
  },
  {
    role: "Para Dirección",
    icon: "trending",
    title: "El dinero que hoy se escapa, vuelve.",
    body: "7.13% de tu nómina mensual recuperable según operación real. ROI medible desde la primera quincena, no desde la promesa.",
    cta: "Calcular mi ahorro",
    href: "#calculadora",
  },
  {
    role: "Para Operaciones",
    icon: "network",
    title: "Cada sede. En tiempo real. Sin excepción.",
    body: "Visibilidad instantánea de turnos, ausencias y retardos en todas tus sedes. Funciona aunque se caiga el internet — sincroniza después.",
    cta: "Ver dashboard",
    href: "#suite",
  },
] as const;

/** Sección 3 — El costo invisible (sticky scroll, 6 estados). */
export const INVISIBLE_COST = {
  intro: "La aritmética del descuido.",
  habits: [
    {
      title: "El retardo de los lunes.",
      note: "5, 10, 15 minutos. Repetidos. Acumulados.",
    },
    {
      title: "La salida anticipada del viernes.",
      note: "20 minutos antes. Una vez. Otra. Otra.",
    },
    {
      title: "El chequeo del amigo.",
      note: "Alguien más marca por el que no llegó.",
    },
    {
      title: "La ausencia que nadie marcó.",
      note: "No aparece en el reporte. Se paga igual.",
    },
  ],
  converge: {
    title: "Cuatro hábitos invisibles.",
    subtitle: "Una nómina que los paga todos.",
  },
  proverb: ["Lo que no se mide, no se controla.", "Lo que no se controla, se pierde."],
  bridge: "Por eso medimos. Aquí lo que encontramos.",
} as const;

/** Sección 7 — Cómo funciona. */
export const HOW_IT_WORKS = [
  {
    step: "01",
    time: "~1 día",
    title: "Instalas",
    body: "El kiosko llega preconfigurado. Conectas corriente y red. Listo.",
  },
  {
    step: "02",
    time: "~2-3 días",
    title: "Enrolas",
    body: "Flujo guiado paso a paso. Cada empleado se enrola en menos de un minuto.",
  },
  {
    step: "03",
    time: "desde el día 1",
    title: "Mides",
    body: "Reportes automáticos desde el primer día. El cierre de nómina deja de ser un dolor.",
  },
] as const;

/** Sección 8 — Tu operación, a tu medida. */
export const TAILORED = [
  {
    icon: "map",
    kicker: "Multipunto",
    title: "Una sede o cincuenta. Mismo control.",
    body: "Empresa madre, sedes hija, empleados que rotan entre ellas. Kronet centraliza la información en la nube y respeta la operación local.",
  },
  {
    icon: "wifi-off",
    kicker: "Resiliencia offline",
    title: "Cuando se cae el internet, Kronet no se cae.",
    body: "Tu sede puede pasar una semana sin conexión y los registros siguen entrando. Cuando vuelve la línea, sincroniza sola. Sin intervención manual.",
  },
  {
    icon: "palette",
    kicker: "Personalización",
    title: "Tu marca. Tu kiosko.",
    body: "Logo, colores, mensajes, publicidad. Cada terminal habla con la voz de tu organización, no con la de Kronet.",
  },
] as const;

/** Sección 9 — La suite completa (3 buckets). */
export const SUITE = [
  {
    icon: "cloud",
    title: "Una nube. Todas tus sedes.",
    kicker: "Cloud y Resiliencia",
    image: "/app/asistencias.png",
    alt: "Panel de asistencias consolidadas de Kronet con filtros por fecha, sede y estatus",
    features: [
      "Centralización en la nube",
      "Respaldo local automático",
      "Sincronización sin intervención",
      "Empresa padre + sedes hija",
    ],
  },
  {
    icon: "layers",
    title: "Tus horarios. Sin importar lo complejos que sean.",
    kicker: "Motor de Turnos",
    image: "/app/horario.png",
    alt: "Creación de horarios en Kronet con múltiples jornadas y turnos",
    features: [
      "Múltiples jornadas en un día",
      "Turnos rotativos y nocturnos",
      "Reglas especiales para jefes",
      "Fechas límite en contratos",
    ],
  },
  {
    icon: "bar-chart",
    title: "Reportes que ya no haces tú.",
    kicker: "Dashboard de Control",
    image: "/app/reporte.png",
    alt: "Reporte de asistencias generado automáticamente por Kronet",
    features: [
      "Generación automática de asistencias",
      "Justificaciones individuales, por departamento o globales",
      "Chequeos manuales con flag de auditoría",
      "Reportes filtrables por fecha, sede, status",
      "Auditoría de todos los movimientos",
    ],
  },
] as const;

/** Datos del caso de estudio real (anonimizado). */
export const CASE = {
  employees: 577,
  months: 7,
  protected: 1994833,
  rate: 7.13,
  attendance: { pct: 89, count: 5641 },
  audit: { pct: 11, count: 691 },
  projection10y: 34_000_000,
  period: "213 días calendario · 7 meses",
  window: "Sep 2025 — Abr 2026",
} as const;
