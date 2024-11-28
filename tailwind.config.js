/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tableBorder: '#062995',
        tableText: '#ea5c44',
      },
    },
  },
  plugins: [],
}
