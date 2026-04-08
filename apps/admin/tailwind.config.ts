import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#427A43',
          dark: '#2F5E31',
          soft: '#E8F2E8',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
