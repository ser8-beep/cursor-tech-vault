import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '360px',
        tablet: '768px',
        desktop: '1024px',
        laptop: '1366px',
        wide: '1920px',
      },
      colors: {
        canvas: '#e5e3df',
        brand: {
          DEFAULT: '#0038d1',
          deep: '#1e3a8a',
        },
        accent: '#1d4ed8',
        hero: {
          canvas: '#e5e3df',
          brand: '#0038d1',
          accent: '#1d4ed8',
          footer: '#f4f4f5',
          hover: '#666666',
        },
        card: {
          DEFAULT: '#f5f5f4',
          hover: '#fafafa',
          border: 'rgba(135, 135, 135, 0.4)',
        },
        footer: {
          bg: '#f4f4f5',
          text: '#09090b',
          muted: '#64748b',
        },
        nav: {
          bg: '#f4f4f5',
        },
      },
      fontFamily: {
        display: ['"Eurostile LT Std"', 'Arial Narrow', 'sans-serif'],
        body: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '3px',
      },
      boxShadow: {
        'card-hover': '8px 11px 22px 0px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
