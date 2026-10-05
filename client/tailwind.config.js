/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8A2BE2',
          light: '#A855F7',
          dark: '#6B21A8',
        },
        secondary: {
          DEFAULT: '#D81B60',
          light: '#EC4899',
          dark: '#9D174D',
        },
        tertiary: {
          DEFAULT: '#4A148C',
          light: '#7C3AED',
        },
        neutral: {
          DEFAULT: '#5E5E66',
          light: '#9CA3AF',
          dark: '#374151',
        },
        sos: {
          DEFAULT: '#DC2626',
          dark: '#991B1B',
        },
        'soft-pink': '#FAF5FF',
        'soft-lavender': '#F3E8FF',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(138, 43, 226, 0.08)',
        'soft-lg': '0 10px 40px rgba(138, 43, 226, 0.12)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};