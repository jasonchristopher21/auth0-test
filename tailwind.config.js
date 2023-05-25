/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      brick: "#f17720",
      orange: "#ffa630",
      slate: "#f2f2f2",
      cyan: "#00a7e1",
      blue: "#0474ba",
      black: "#1e1e1e",
      white: "#ffffff",
      dgray: "#6D6D6D",
      red: "#dc2626",
      others: {
        100: "#f58c1f"
      }
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Arial", "serif"],
      lexend: ["Lexend Deca", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};