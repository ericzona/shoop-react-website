/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arcade: ['"Press Start 2P"', 'cursive'],
        prometo: ['Prometo', 'sans-serif'],
      },
      colors: {
        neonRed: '#ff073a', // Neon red color for H1
        neonYellow: '#faff00', // Neon yellow for other headings
        neonFuschia: '#ff00ff', // Neon fuschia for accents
      },
    },
  },
  plugins: [],
};

