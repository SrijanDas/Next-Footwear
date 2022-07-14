/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1e3a8a",
        "custom-grey": "#64748b",
      },
    },
  },
  plugins: [require("daisyui")],
};
