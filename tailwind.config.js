/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.html", "**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["vazir", "system-ui"],
      },
      colors: {
        "bg-color": "#da291c",
      },
    },
    plugins: [],
  },
};
