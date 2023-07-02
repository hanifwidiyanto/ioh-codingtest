/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // buatkan kek gini untuk bold,extrabold, extralight, light, medium, regular,semibold
      fontFamily: {
        'oxanium-extralight': ['oxanium-extralight', 'sans-serif'],
        'oxanium-light': ['oxanium-light', 'sans-serif'],
        'oxanium': ['oxanium-regular', 'sans-serif'],
        'oxanium-medium': ['oxanium-medium', 'sans-serif'],
        'oxanium-semibold': ['oxanium-semibold', 'sans-serif'],
        'oxanium-bold': ['oxanium-bold', 'sans-serif'],
        'oxanium-extrabold': ['oxanium-extrabold', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'blue-pixel': '#4284CA',
        'red-pixel': '#FF315A',
        'yellow-pixel': '#FECB00',
        'green-pixel': '#23C69F',
      },
    },
  },
  plugins: [],
}