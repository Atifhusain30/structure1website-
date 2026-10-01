import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        offwhite: '#F3F2EE',
        black: '#0E0E0E',
        charcoal: '#2B2B2B',
        gray: { 200: '#E4E2DC', 500: '#8C8A84', 700: '#4A4946' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.8125rem', { lineHeight: '1.4', fontWeight: '500' }],
        h1: ['clamp(2.5rem, 5.5vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 3.2vw, 2.75rem)', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        lead: ['clamp(1.125rem, 1.4vw, 1.25rem)', { lineHeight: '1.5' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
        small: ['0.9375rem', { lineHeight: '1.55' }],
        meta: ['0.8125rem', { lineHeight: '1.4' }],
      },
      maxWidth: { site: '1280px', prose: '65ch' },
      boxShadow: { bar: '0 -4px 16px rgba(0,0,0,0.08)' },
      transitionDuration: { 150: '150ms', 250: '250ms', 400: '400ms' },
    },
  },
  plugins: [],
};
export default config;
