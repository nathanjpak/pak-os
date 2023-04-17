/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", "./build/*.html",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        "dark-navy": "#0b1627",
      },
      backgroundImage: {
        "default-static": "url('/public/bg.svg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
