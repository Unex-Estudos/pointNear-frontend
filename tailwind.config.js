/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: {
          DEFAULT: "#D2553D",
          50: "#FDF4F2",
          100: "#FBE8E4",
          200: "#F5CFC7",
          300: "#EFB5AA",
          400: "#E99C8C",
          500: "#D2553D",
          600: "#B5422D",
          700: "#903424",
          800: "#6C271B",
          900: "#481A12",
        },
        moss: {
          DEFAULT: "#2F5D4A",
          50: "#F3F7F5",
          100: "#E6EFEB",
          200: "#C2D7CD",
          300: "#9DBFAF",
          400: "#79A791",
          500: "#558F73",
          600: "#416D58",
          700: "#2F5D4A",
          800: "#1D392E",
          900: "#0B1511",
        },
        // cores do tema escuro
        dark: {
          bg: "#0F1A14", // fundo principal — verde musgo bem escuro
          surface: "#172318", // cards e seções
          elevated: "#1E2F22", // elementos elevados
          border: "#2A3D2F", // bordas sutis
          text: "#EDE8DF", // texto principal — creme quente
          muted: "#8FA898", // texto secundário
        },
        cream: {
          DEFAULT: "#FAF6F0",
          dark: "#F0EAE0",
        },
        charcoal: {
          DEFAULT: "#333333",
          light: "#555555",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        float: "0 10px 30px -5px rgba(0, 0, 0, 0.08)",
        "dark-float": "0 10px 30px -5px rgba(0, 0, 0, 0.4)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
