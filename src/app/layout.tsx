import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import StructuredData from '@/components/seo/StructuredData';
import FloatingPhone from '@/components/ui/FloatingPhone';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Separate viewport export for Next.js 14+ (iOS/Android optimized)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
  // iOS specific
  interactiveWidget: 'resizes-visual',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    default: 'Structure1 Construction | Premium Home Construction Services',
    template: '%s | Structure1 Construction',
  },
  description:
    'Transform your outdoor living space with Structure1 Construction. Expert patio cover design and build services including gable, lean-to, and pergola styles. Free consultations available.',
  keywords: [
    'construction',
    'patio covers',
    'gable patio cover',
    'pergola',
    'outdoor living',
    'Texas contractor',
    'Dallas patio covers',
  ],
  metadataBase: new URL('https://structure1.com'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Structure1 Construction' }],
  creator: 'Structure1 Construction',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Structure1',
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://structure1.com',
    siteName: 'Structure1 Construction',
    title: 'Structure1 Construction | Premium Home Construction Services',
    description:
      'Transform your living space with expert design-build services for patio covers, kitchens, floors, new builds, and pools.',
    images: [
      {
        url: '/images/hero/hero-1.png',
        width: 1200,
        height: 630,
        alt: 'Structure1 Construction - Premium Home Construction Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structure1 Construction | Premium Home Construction Services',
    description:
      'Transform your living space with expert design-build services.',
    images: ['/images/hero/hero-1.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* iOS splash screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* Prevent phone number detection on iOS */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-body antialiased bg-off-white text-primary-black min-h-screen touch-manipulation">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary-black focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <StructuredData />
        <FloatingPhone />
      </body>
    </html>
  );
}
