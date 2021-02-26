const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  important: true,
  theme: {
    colors: {
      green: "#4fff9e",
      red: "#ff4f4f",
      transparent: "transparent",
      current: "currentColor",
      black: { 400: "#4F4F4F" },
      white: colors.white,
      gray: {
        400: "#E5E5E5",
        450: "#BDBDBD",
        500: "#C4C4C4",
        600: "#838383",
        601: "#6C6B6B",
        602: "#585858",
      },
      blue: {
        100: "#F3F7FD",
        101: "#E8EEFA",
        102: "#E2EAFA",
        400: "#2F80ED",
        401: "#2064BF",
        402: "#194F97",
      },
      indigo: colors.indigo,
      blueGray: colors.blueGray,
      yellow: colors.amber,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
