import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3590B5",
        secundary: "#88C16C",
        terciary: "#AE85E9",
        hover: "bg-blue-700",
        textColor: "#4d4d4d",
        btnTextColor: "#ffff",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      fontFamily: {
        baloo: "var(--font-baloo)",
      },
    },
  },
  plugins: [],
};
export default config;
