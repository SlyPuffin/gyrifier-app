module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orangeweboxfordblue: {
          background: "#FFFFFF",
          border: "#000000",
          primary: "#14213D",
          secondary: "#FFFFFF",
          tertiary: "#FCA311",
          quaternary: "#E5E5E5",
        },
      },
    },
  },
  plugins: [],
};
