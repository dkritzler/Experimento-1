/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        'space': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'clash': ['Clash Display', 'system-ui', 'sans-serif'],
        'syne': ['Syne', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Bioluminescent greens
        'bio-green': {
          400: '#00FF88',
          500: '#00CC66',
          600: '#00AA55',
        },
        // Probiotic purples
        'probiotic': {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        // Enzyme oranges
        'enzyme': {
          400: '#FF8C42',
          500: '#FF6B35',
          600: '#E55A2E',
        },
        // Organic browns
        'organic': {
          400: '#D2691E',
          500: '#B8560F',
          600: '#8B4513',
        }
      },
      borderRadius: {
        'organic': '30% 70% 70% 30% / 30% 30% 70% 70%',
        'blob': '64% 36% 55% 45% / 67% 56% 44% 33%',
        'cell': '50% 20% 80% 50% / 60% 70% 30% 40%',
      },
      animation: {
        'pulse-bio': 'pulse-bio 3s ease-in-out infinite',
        'morph': 'morph 6s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'pulse-bio': {
          '0%, 100%': { 
            transform: 'scale(1)',
            filter: 'hue-rotate(0deg) brightness(1)',
          },
          '50%': { 
            transform: 'scale(1.05)',
            filter: 'hue-rotate(10deg) brightness(1.1)',
          },
        },
        'morph': {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
      },
      backgroundImage: {
        'cellular': 'radial-gradient(circle at 20% 80%, #00FF88 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 50%), radial-gradient(circle at 40% 40%, #FF6B35 0%, transparent 50%)',
        'microbiome': 'conic-gradient(from 180deg at 50% 50%, #00FF88, #8B5CF6, #FF6B35, #00CC66)',
        'organic-flow': 'linear-gradient(135deg, #00FF88 0%, #8B5CF6 25%, #FF6B35 50%, #D2691E 75%, #00CC66 100%)',
      },
      backdropBlur: {
        'organic': '20px',
      },
    },
  },
  plugins: [],
}