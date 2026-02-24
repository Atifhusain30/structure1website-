import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': '#1a1a1a',
        'charcoal': '#2a2a2a',
        'dark': '#333333',
        'off-white': '#FAFAF8',
        'cream': '#F3F1ED',
        'text-gray': '#6B6B6B',
        'text-muted': '#9A9A9A',
        'border-light': '#E5E5E5',
        'accent-warm': '#D4A447',
        'accent-warm-light': '#E5C478',
        'accent-warm-dark': '#B8892E',
        'success-green': '#16A34A',
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(36px, 6vw, 72px)',
        'section': 'clamp(30px, 4vw, 48px)',
        'card': '24px',
      },
      spacing: {
        'section': 'clamp(64px, 8vw, 120px)',
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        'card': '1.25rem',
        'card-lg': '2rem',
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'heavy': '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'rotate-slow': 'rotate 60s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
