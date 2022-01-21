module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
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
