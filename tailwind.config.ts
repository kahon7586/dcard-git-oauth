import type { Config } from "tailwindcss";

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "selector",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-hover": "#e5e5e5",
        "primary-hover-d": "#222d3d",
        "text-primary": "#333333",
        "text-primary-d": "#f1f7ff",
      },
      textColor: {
        primary: "#333333",
        secondary: "#595959",
        "primary-d": "#f1f7ff",
        "secondary-d": "#a8acb2",
      },
      borderColor: {
        primary: "#505050",
        "primary-d": "#e5e5e5",
        secondary: "#999999",
        bubble: "#F5F5F5",
      },
      backgroundColor: {
        primary: "#dfdfdf", // component bg
        "primary-hover": "#ebebeb",
        secondary: "#F5F5F5", // body bg
        third: "#999999",
        "third-hover": " #b3b3b3",

        "primary-d": "#0d1117", // component bg
        "primary-hover-d": "#222d3d",
        "secondary-d": "#010409", // body bg
        "third-d": "#161b22",
        "third-hover-d": " #2e3948",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
