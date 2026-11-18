import type { Config } from "tailwindcss";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const themeColor =
  (variable: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `var(${variable})`
      : `color-mix(in srgb, var(${variable}) calc(${opacityValue} * 100%), transparent)`;

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-page": themeColor("--color-bg-page"),
        "bg-card": themeColor("--color-bg-card"),
        "bg-card-hover": themeColor("--color-bg-card-hover"),
        "bg-elevated": themeColor("--color-bg-elevated"),
        divider: themeColor("--color-divider"),
        primary: themeColor("--color-primary"),
        "primary-hover": themeColor("--color-primary-hover"),
        "primary-text": themeColor("--color-primary-text"),
        "secondary-text": themeColor("--color-secondary-text"),
        "primary-btn-text": themeColor("--color-primary-btn-text"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        outfit: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [
    require('tailwindcss-visual-kit')({
      duration: '300ms', // Change default animation duration
      delay: '1s', // Add default delay
      iterationCount: '1' // Make animations repeat infinitely
    })
  ],
};

export default config;
