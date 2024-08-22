/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4.5s linear infinite', //
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      fontFamily: {
        conthrax: ['Conthrax', 'sans-serif'],
        myriad: ['Myriad Pro Regular', 'serif'],
        myriadb: ['Myriad Pro Bold', 'serif'],
        myriadl: ['Myriad Pro Light', 'serif'],
      },
      backgroundImage: {
        teal: "linear-gradient(180deg, #64DFE7 0%, #0E757E 100%)"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('@tailwindcss/typography'),
  ],
}
