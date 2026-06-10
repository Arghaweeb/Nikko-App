import type { Config } from "tailwindcss";

/**
 * Nikko Passport design tokens
 * Light: forest green · soft beige · white · deep indigo accents · gold highlights
 * Dark:  charcoal black · deep green · muted gold · soft white text
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f2f7f3",
          100: "#e0ede2",
          200: "#c1dbc8",
          300: "#95c0a3",
          400: "#649e78",
          500: "#43815b",
          600: "#316747",
          700: "#27523a",
          800: "#214230",
          900: "#1b3628",
          950: "#0d1e16",
        },
        beige: {
          50: "#faf8f2",
          100: "#f3efe2",
          200: "#e6ddc4",
          300: "#d6c7a0",
          400: "#c4ad7a",
          500: "#b6985f",
        },
        indigo2: {
          400: "#6f74b8",
          500: "#4d5398",
          600: "#3c4180",
          700: "#2f3366",
          800: "#262a52",
          900: "#1c1f3d",
        },
        gold: {
          300: "#e8c878",
          400: "#d9ad4f",
          500: "#c2922f",
          600: "#9d7424",
        },
        ink: {
          DEFAULT: "#1e241f",
          soft: "#475249",
        },
        charcoal: {
          800: "#181c19",
          900: "#111512",
          950: "#0b0e0c",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "var(--font-jp)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20,30,22,0.06), 0 8px 24px -12px rgba(20,30,22,0.18)",
        lift: "0 2px 4px rgba(20,30,22,0.08), 0 16px 40px -16px rgba(20,30,22,0.28)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .5s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
