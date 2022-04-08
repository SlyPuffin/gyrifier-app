function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      console.log(`rgb(var(${variable}))`)
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
        colors: {
          'regal-blue': '#243c5a',
          james: "var(--bright-red)",
          skin: {
            primary: "var(--primary-fill)",
            secondary: "var(--secondary-fill)",
            "contrast" : 'var(--contrast-fill)',
            muted: "var(--muted-fill)",
            test: "var(--test-red)",
            oxford: "#002147",
            wowie: "var(--fun-zany)",
          }
        },
        backgroundColor: {
        },
        textColor: {
          skin: {
            primary: "var(--primary-text)",
            "primary-muted" : "var(--primary-text-muted)",
            secondary: "var(--secondary-text)",
            contrast: "var(--contrast-text)"
          }
        },
        }
    },
  plugins: [],
};