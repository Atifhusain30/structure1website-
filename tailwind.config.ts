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
        'rich-black': '#0D0D0D',
        'warm-charcoal': '#1C1C1A',
        'stone': '#2A2926',
        'stone-light': '#3D3A35',
        'sand': '#F5F0E8',
        'parchment': '#FAF7F2',
        'warm-white': '#FEFCF9',
        'gold': '#C5A04E',
        'gold-light': '#D4B76A',
        'gold-dark': '#9E7E32',
        'gold-muted': 'rgba(197, 160, 78, 0.12)',
        'text-primary': '#1C1C1A',
        'text-secondary': '#6E6A62',
        'text-muted': '#A09A8F',
        'border': '#E8E3DA',
        'border-dark': '#3D3A35',
        // Keep old names as aliases for components not yet updated
        'primary-black': '#0D0D0D',
        'charcoal': '#1C1C1A',
        'off-white': '#FAF7F2',
        'cream': '#F5F0E8',
        'accent-warm': '#C5A04E',
        'accent-warm-light': '#D4B76A',
        'accent-warm-dark': '#9E7E32',
        'text-gray': '#6E6A62',
        'border-light': '#E8E3DA',
        'success-green': '#16A34A',
      },
      fontFamily: {
        heading: ['var(--font-display)', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.25rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        'hero': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'section': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'subsection': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'eyebrow': ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      spacing: {
        'section': 'clamp(80px, 10vw, 160px)',
        'section-sm': 'clamp(48px, 6vw, 96px)',
      },
      maxWidth: {
        'container': '1400px',
        'narrow': '960px',
        'wide': '1600px',
      },
      borderRadius: {
        'card': '1rem',
        'card-lg': '1.5rem',
        'card-xl': '2rem',
      },
      boxShadow: {
        'card': '0 12px 48px -12px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 24px 64px -16px rgba(0, 0, 0, 0.2)',
        'subtle': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'medium': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'heavy': '0 24px 64px rgba(0, 0, 0, 0.12)',
        'image': '0 16px 48px -8px rgba(0, 0, 0, 0.25)',
        'glow-gold': '0 0 40px rgba(197, 160, 78, 0.15)',
      },
      animation: {
        'rotate-slow': 'rotate 60s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 55s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
