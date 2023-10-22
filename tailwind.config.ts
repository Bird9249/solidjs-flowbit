import flowbite from "flowbite/plugin";
import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: colors.green,
    },
    extend: {},
  },
  plugins: [flowbite],
};

export default config;
