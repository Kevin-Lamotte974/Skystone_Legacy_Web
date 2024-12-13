/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fantasy': {
          'primary': '#2C1810',    // Deep brown
          'secondary': '#8B4513',  // Saddle brown
          'accent': '#DAA520',     // Golden rod
          'light': '#FFF8DC',      // Cornsilk
          'dark': '#1a0f0a',       // Very dark brown
        },
      },
      fontFamily: {
        'medieval': ['MedievalSharp', 'cursive'],
        'fantasy': ['Luminari', 'Fantasy'],
      },
      backgroundImage: {
        'fantasy-pattern': "url('/src/assets/patterns/fantasy-bg.png')",
      },
    },
  },
  plugins: [],
}
