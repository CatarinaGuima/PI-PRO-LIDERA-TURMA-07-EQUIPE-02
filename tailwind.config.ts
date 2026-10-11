import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Design tokens da PRO Lidera Skills.
 *
 * A paleta nasce do logo (verde → azul-petróleo) e dos três níveis do
 * resultado: verde = frágil/começo, azul = em desenvolvimento, violeta =
 * alta performance. As cores "text-safe" (leaf-700, primary, violet-600)
 * passam contraste AA sobre fundo claro; as cores de marca originais
 * (leaf, brand, violet) ficam para superfícies e gráficos.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Superfícies e texto
        background: "#F4F8F6",
        foreground: "#12303F",
        ink: {
          DEFAULT: "#12303F",
          soft: "#3D5A68",
          muted: "#5C7480",
        },
        paper: "#FFFFFF",
        line: "#D5E3DE",

        // Marca
        primary: {
          DEFAULT: "#1F6F8B",
          hover: "#18596F",
          foreground: "#FFFFFF",
        },
        brand: "#3590B5",
        leaf: {
          DEFAULT: "#88C16C",
          700: "#3F7A2E",
        },
        violet: {
          DEFAULT: "#AE85E9",
          600: "#7C55C7",
        },

        // Tokens semânticos usados pelos componentes shadcn/ui
        secondary: { DEFAULT: "#E7F0EC", foreground: "#12303F" },
        muted: { DEFAULT: "#E7F0EC", foreground: "#5C7480" },
        accent: { DEFAULT: "#E7F0EC", foreground: "#12303F" },
        destructive: { DEFAULT: "#B3261E", foreground: "#FFFFFF" },
        popover: { DEFAULT: "#FFFFFF", foreground: "#12303F" },
        border: "#D5E3DE",
        input: "#B7CBC4",
        ring: "#1F6F8B",

        // Nomes antigos, mantidos para não quebrar usos existentes
        secundary: "#88C16C",
        terciary: "#AE85E9",
        textColor: "#3D5A68",
        btnTextColor: "#FFFFFF",
        shadowColor: "rgba(18, 48, 63, 0.18)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      fontFamily: {
        sans: [
          '"Figtree Variable"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          '"Bricolage Grotesque Variable"',
          '"Figtree Variable"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        lift: "0 1px 0 rgba(18,48,63,0.04), 0 12px 32px -16px rgba(18,48,63,0.28)",
        shadowColor: "0 1px 2px rgba(18,48,63,0.18)",
      },
      keyframes: {
        // Único movimento "de entrada" do site: a escada da liderança sobe
        // degrau por degrau quando a página abre.
        rise: {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [animate],
};
export default config;
