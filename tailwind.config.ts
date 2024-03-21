import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#333333",
      },
      borderColor: {
        secondary: "#999999",
      },
      backgroundColor: {
        primary: "#CCCCCC", // component bg
        "primary-hover": "#e5e5e5",
        secondary: "#F5F5F5", // body bg
        third: "#999999",
        "third-hover": " #b3b3b3",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
