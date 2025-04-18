import type { Config } from "tailwindcss"
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
      "3xl": "1620px"
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      }
    }
  },
  plugins: []
} satisfies Config
