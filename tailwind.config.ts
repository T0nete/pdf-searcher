import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        dosis: ['Dosis', 'sans-serif'],
      },
      colors: {
        'brand-orange': '#FF4F18',
        'brand-orange-hover': '#FF7F50',
        dark: '#2c2c2c',
        'light-gray': '#3e3e3e',
        'light-gray-hover': '#5c5c5c',
        'dark-gray': '#333333',
      },
    },
  },
  plugins: [],
};
export default config;
