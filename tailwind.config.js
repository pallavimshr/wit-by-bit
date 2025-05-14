/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "sky-light": "#ECF7FF",
        "brand-blue": "#1F8CD0",
        "light-gray": " #E1E7EB",
        "custom-gray": "#F8F8F8",
        "medium-gray": "#808080",
        "soft-blue": "#DAEDF9",
      },
      fontFamily: {
        worksans: ['"Work Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
