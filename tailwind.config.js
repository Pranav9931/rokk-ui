const { colors: defaultColors } = require("tailwindcss/defaultTheme");

const colors = {
  ...defaultColors,
  ...{
    primary: "#FF8303",
  },
};

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
      colors,
    },
    fontFamily: {
      primary: ["var(--head-font)", "sans-serif"],
    },
  },
  important: "#root",
  plugins: [],
};
