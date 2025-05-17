/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // if you're using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}", // for any shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
