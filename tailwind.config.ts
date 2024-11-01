import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#CCF6FF",
          200: "#33DDFF",
          300: "#00B4D8",
          400: "#005566",
          500: "#002A33",
          600: "#00151A",
        },
        red: {
          100: "#FFE5E5",
          200: "#FF3333",
          300: "#D60000",
          400: "#CC0000",
        },
        green: {
          100: "#E5FFE5",
          200: "#33FF33",
          300: "#00FF00",
          400: "#006600",
        },
        yellow: {
          100: "#FFFCCC",
          200: "#FFF899",
          300: "#FFF133",
          400: "#FFEE00",
        },
        neutral: {
          100: "#FFFFFF",
          200: "#F2F2F2",
          300: "#B3B3B3",
          400: "#333333",
          500: "#1A1A1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
