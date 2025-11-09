/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B8860B', // Or classique
        secondary: '#8B0000', // Rouge bordeaux
        accent: '#2F4F4F', // Gris ardoise
        gold: {
          100: '#FDF6E3',
          200: '#FAF0D9',
          300: '#F5E5B8',
          400: '#E6C97C',
          500: '#B8860B',
          600: '#996515',
          700: '#7A4F1F',
        }
      },
      fontFamily: {
        'cursive': ['"Great Vibes"', 'cursive'],
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #FFD700 100%)',
        'elegant-pattern': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
      }
    },
  },
  plugins: [],
}