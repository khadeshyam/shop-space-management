import type { Config } from "tailwindcss";

export default {
  darkMode: 'media', // Enable dark mode based on user's system preference
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': "var(--background-light)",
        'foreground-light': "var(--foreground-light)",
        'background-dark': "var(--background-dark)",
        'foreground-dark': "var(--foreground-dark)",
      },
    },
  },
  plugins: [],
} satisfies Config;