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
        background: "var(--background)",
        foreground: "var(--foreground)",
        color800: "#080F25",
        color1: "#101935",
        color400: "#aeb9e1",
        primaryColor: "#6c72ff",
        color700: "#212c4d",
        color500: "#7e89ac",
        color600: "#37446b",
        color200: "#D9E1FA",
      },
    },
  },
  plugins: [],
};
export default config;
