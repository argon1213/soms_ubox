/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/pages/order/**/*.{js,ts,jsx,tsx}",
    "./src/app/pages/client/**/*.{js,ts,jsx,tsx}",
    "./src/app/modules/auth/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
