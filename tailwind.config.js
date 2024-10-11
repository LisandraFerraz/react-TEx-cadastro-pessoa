/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      pastelBlue: "#749AEB",
      pastelPurple: "#AC93CA",
      pastelPink: "#D7A1D8",
      defaultWhite: "#FFFFFF",

      bgDark: "#222222",
      bgGrey: "#363636",

      hightlightGrey: "#5B5B5B",
    },
    fontFamily: {
      inter: ["InterVariable", "sans-serif"],
    },
  },
};
