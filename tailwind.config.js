module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        skin: {
          primary: "var(--primary-fill)",
          secondary: "var(--secondary-fill)",
          contrast: "var(--contrast-fill)",
          muted: "var(--muted-fill)",
          test: "var(--test-red)",
          oxford: "#002147",
          special: "var(--bright-special)",
          logo: "var(--secondary-text)",
        },
      },
      borderColor: {
        skin: {
          primary: "var(--primary-border)",
          secondary: "var(--secondary-border)",
          muted: "var(--muted-border)",
        },
      },
      textColor: {
        skin: {
          primary: "var(--primary-text)",
          muted: "var(--primary-text-muted)",
          secondary: "var(--secondary-text)",
          contrast: "var(--contrast-text)",
        },
      },
    },
  },
  plugins: [],
};
