/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ← enable class-based dark mode
  theme: {
    extend: {
      animation: {
        glowLoop: "glow 8s ease-in-out infinite alternate",
        pulseSlow: "pulse 10s ease-in-out infinite",
      },
            keyframes: {
        glow: {
          "0%": { transform: "translateX(0%) rotate(0deg)" },
          "100%": { transform: "translateX(-50%) rotate(15deg)" },
        },
      },
    },
  plugins: [],
},
};