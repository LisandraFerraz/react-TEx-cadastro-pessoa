/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      pastelBlue: "#749AEB",
      pastelPurple: "#AC93CA",
      pastelPink: "#D7A1D8",
      pastelRed: "#F04E64",
      pastelYellow: "#F4DB73",
      pastelGreen: "#77F29C",
      defaultWhite: "#E6E6E6",

      inputBtnBg: "#333333",
      bgDark: "#222222",
      bgGrey: "#363636",
      bgLight: "#2E2E2E",
      bgLinear: "linear-gradient(to left, #D7A1D8, #AC93CA, #749AEB)",

      btnHeight: "35",
      btnWidth: "35",
      hightlightGrey: "#5B5B5B",
    },
    fontFamily: {
      inter: ["InterVariable", "sans-serif"],
    },
  },
};
