import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { lg: "960px", xl: "1140px" },
    },
    extend: {
      colors: {
        uciblue: "#0064A4",
        ucigold: "#FDB515",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
}
export default config
