/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513', // Marron élégant
        secondary: '#D4AF37', // Or
        accent: '#2F4F4F', // Gris ardoise
        gold: {
          100: '#FDF6E3',
          200: '#FAF0D9',
          300: '#F5E5B8',
          400: '#E6C97C',
          500: '#D4AF37',
          600: '#0b4db8ff',
          700: '#996515',
        }
      },
      fontFamily: {
        'cursive': ['"Great Vibes"', 'cursive'],
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}