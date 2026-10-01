import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        offwhite: '#F7F6F3',
        black: '#0A0A0A',
        charcoal: '#1C1C1C',
        gray: { 200: '#E3E1DC', 500: '#7A7975', 700: '#4A4A48' },
        timber: '#9C7A5B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '500' }],
        h1: ['clamp(2.375rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        h3: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
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
