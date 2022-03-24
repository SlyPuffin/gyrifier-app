module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        backgroundColor: {
          skin: {
            primary: "var(--primary-fill)",
            secondary: "var(--secondary-fill)"
          }
        },
        textColor: {
          skin: {
            primary: "var(primary-text)",
            "primary-muted" : "var(primary-text-muted)",
            secondary: "var(secondary-text)"
          }
        },
        border: {
          skin: {
            primary: "var(--border)"
          }
        }
        }
    },
  plugins: [],
};