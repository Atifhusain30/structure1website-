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
        'primary-black': '#0A0A0A',
        'off-white': '#FAFAFA',
        'cream': '#F5F5F0',
        'text-gray': '#6B7280',
        'text-dark-gray': '#374151',
        'border-light': '#E5E7EB',
        'accent-warm': '#B8860B',
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(48px, 8vw, 96px)',
        'section': 'clamp(36px, 5vw, 56px)',
        'card': '24px',
      },
      spacing: {
        'section': 'clamp(80px, 10vw, 160px)',
      },
      maxWidth: {
        'container': '1400px',
      },
      animation: {
        'rotate-slow': 'rotate 25s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
