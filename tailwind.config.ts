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
        hover: "bg-blue-700",
        textColor: "#4d4d4d",
        btnTextColor: "#ffff",
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
