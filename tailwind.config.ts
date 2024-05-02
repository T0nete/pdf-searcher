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
        dark: '#2c2c2c',
        // dark: '#141517',
        // 'light-gray': '#F2F4F7',
        'light-gray': '#3e3e3e',
        'dark-gray': '#333333',
      },
    },
  },
  plugins: [],
};
export default config;
