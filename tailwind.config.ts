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
        primary: {
          DEFAULT: "#7F5836",
          dark: "#443025",
          light: "#AA7F66",
        },
        accent: "#EC9C9D",
        highlight: "#F2CF2A",
        bg: "#fdfbf7",
      },
    },
  },
  plugins: [],
};
export default config;
