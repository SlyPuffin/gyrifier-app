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
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        colors: {
          'regal-blue': '#243c5a',
        },
        backgroundColor: {
          skin: {
            primary: withOpacityValue("255,192,203"),
            secondary: withOpacityValue('--secondary-fill'),
            contrast: "var(--contrast-fill)",
            muted: "var(--muted-fill)",
            test: "var(--test-red)"
          }
        },
        textColor: {
          skin: {
            primary: "var(primary-text)",
            "primary-muted" : "var(primary-text-muted)",
            secondary: "var(secondary-text)",
            contrast: "var(contrast-text)"
          }
        },
        border: {
          skin: {
            primary: "var(--test-red)"
          }
        },
        }
    },
  plugins: [],
};