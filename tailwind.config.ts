import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — fuente de verdad: Brief_Landing_Kronet §4
        navy: {
          DEFAULT: "#093d65", // primario: headlines, cuerpo
          alt: "#0c3e63", // variación sutil para layering
          ink: "#0a1628", // islas oscuras (secciones 6, 8, 10)
          deep: "#06101f", // aún más profundo para vignettes
        },
        cyan: {
          DEFAULT: "#28a2b9", // acento único: números, CTAs, highlights
          bright: "#3dc5dd", // glow / hover
          soft: "#7fd4e2",
        },
        offwhite: "#FAFAFA",
        muted: "#6B7280", // captions, metadata
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      fontWeight: {
        "300": "300",
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
      },
      fontSize: {
        // escala del brief (desktop)
        "hero": ["clamp(2.5rem, 5.4vw, 5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "section": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "stat": ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        grid: "1280px",
      },
      spacing: {
        section: "clamp(4rem, 10vw, 8rem)",
      },
      boxShadow: {
        ambient: "0 40px 120px -20px rgba(9, 61, 101, 0.35)",
        "ambient-dark": "0 50px 160px -30px rgba(0, 0, 0, 0.7)",
        cyan: "0 0 0 1px rgba(40,162,185,0.35), 0 20px 60px -15px rgba(40,162,185,0.45)",
        card: "0 1px 2px rgba(9,61,101,0.04), 0 12px 32px -12px rgba(9,61,101,0.12)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "scan": {
          "0%, 100%": { transform: "translateY(-40%)", opacity: "0" },
          "50%": { opacity: "1" },
          "90%": { transform: "translateY(40%)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": {
          "100%": { transform: "translateX(100%)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fadeIn": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "travel": {
          "0%": { left: "8%", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { left: "92%", opacity: "0" },
        },
        "dash": {
          to: { "stroke-dashoffset": "-16" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.25,0.1,0.25,1) infinite",
        "scan": "scan 2.8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
        "travel": "travel 2.6s ease-in-out infinite",
        "dash": "dash 0.8s linear infinite",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
