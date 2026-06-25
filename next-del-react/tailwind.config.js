/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          DEFAULT: '#00c853',
          secondary: '#00e676',
          light: '#69f0ae',
          dark: '#00a844',
        },
        'bg': {
          primary: '#0a0e0a',
          secondary: '#111811',
          card: '#1a221a',
          'card-hover': '#243024',
          section: '#060e0a',
        },
        'text': {
          primary: '#e8f5e8',
          secondary: '#94b894',
          light: '#648a64',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float-card': 'floatCard 6s ease-in-out infinite',
        'float-badge': 'floatBadge 5s ease-in-out infinite',
        'bounce-down': 'bounceDown 2s ease-in-out infinite',
      },
      keyframes: {
        floatCard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
        bounceDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(8px)', opacity: '0.5' },
        }
      }
    },
  },
  plugins: [],
}
