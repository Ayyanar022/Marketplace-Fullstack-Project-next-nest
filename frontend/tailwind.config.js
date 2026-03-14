

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "var(--color-primary)",
//         primaryHover: "var(--color-primary-hover)",
//         textPrimary: "var(--color-text-primary)",
//         textSecondary: "var(--color-text-secondary)",
//         bgMain: "var(--color-bg-main)",
//         cardBg: "var(--color-card-bg)",
//         accent: "var(--color-accent)",
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "var(--color-primary)",
      primaryHover: "var(--color-primary-hover)",
      primaryDark: "var(--color-primary-dark)",
      primaryLight: "var(--color-primary-light)",

      accent: "var(--color-accent)",

      textPrimary: "var(--color-text-primary)",
      textSecondary: "var(--color-text-secondary)",
      text: "var(--color-text)",
      textMuted: "var(--color-text-muted)",

      bgMain: "var(--color-bg-main)",
      bg: "var(--color-bg)",
      surface: "var(--color-surface)",
      cardBg: "var(--color-card-bg)",

      border: "var(--color-border)",
      danger: "var(--color-danger)",
    },

    borderRadius: {
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      full: "var(--radius-full)",
    },

    boxShadow: {
      sm: "var(--shadow-sm)",
      md: "var(--shadow-md)",
      lg: "var(--shadow-lg)",
      glow: "var(--shadow-glow)",
    },

    fontFamily: {
      // sans: ["var(--font)"],
    },

    transitionTimingFunction: {
      DEFAULT: "var(--transition)",
    },
    animation:{
      badgePop : "badgePop 0.3s ease"
    },
      keyframes: {
        badgePop: {
          "0%": { transform: "scale(0)" },
          "70%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
      },
  },
},
plugins: [],
};
