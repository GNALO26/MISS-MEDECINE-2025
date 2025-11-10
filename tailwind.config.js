/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'cursive': ['Great Vibes', 'cursive'],
      },
      colors: {
        'gold': {
          50: '#FDF8E7',
          100: '#FAF1CF',
          200: '#F5E39F',
          300: '#F0D56F',
          400: '#EBC73F',
          500: '#D4AF37', // Couleur or principale
          600: '#B8860B',
          700: '#8B6508',
          800: '#5E4405',
          900: '#312302',
        },
        'charcoal': {
          50: '#F7F7F7',
          100: '#E1E1E1',
          200: '#CFCFCF',
          300: '#B1B1B1',
          400: '#9E9E9E',
          500: '#7E7E7E',
          600: '#626262',
          700: '#515151',
          800: '#3B3B3B',
          900: '#1A1A1A', // Noir élégant
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        }
      }
    },
  },
  plugins: [],
}