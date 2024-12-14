import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colors
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        app: {
          // Màu nền
          bg: '#1A1A1A',
          bgSecondary: '#2B2B2B',
          
          // Border colors
          border: '#333333',
          
          // Accent colors
          accent: '#FF4500',
          hover: '#FF5722',
          
          // Text colors
          text: '#FFFFFF',
          textSecondary: '#E5E5E5',
        },
        sidebar: {
          bg: '#2B2B2B',
          hover: '#333333',
          border: '#FF5722',
        },
      },
      // Font Family
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      // Font Size
      fontSize: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      // Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'sidebar-expanded': '18rem', // w-72
        'sidebar-collapsed': '5rem', // w-20
      },
      // Z-Index
      zIndex: {
        sidebar: '40',
        'sidebar-overlay': '30',
        'sidebar-toggle': '50',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
} satisfies Config;
