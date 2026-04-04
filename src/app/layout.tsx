import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import StructuredData from '@/components/seo/StructuredData';
import FloatingCTA from '@/components/ui/FloatingCTA';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    default: 'Structure1 Construction | Patio Covers & Concrete in Dallas-Fort Worth',
    template: '%s | Structure1 Construction',
  },
  description:
    "Dallas-Fort Worth's premier patio cover and concrete contractor. 150+ projects completed. Licensed, insured, 2-year warranty. Get your free estimate today.",
  keywords: [
    'patio covers Dallas',
    'concrete contractor Fort Worth',
    'outdoor living DFW',
    'patio cover installation',
    'concrete driveway Dallas',
    'pergola builder Frisco',
    'patio cover McKinney',
    'concrete patio Plano',
    'patio covers Fort Worth',
    'concrete contractor Dallas',
  ],
  metadataBase: new URL('https://structure1builds.com'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Structure1 Construction' }],
  creator: 'Structure1 Construction',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://structure1builds.com',
    siteName: 'Structure1 Construction',
    title: 'Structure1 Construction | Premium Patio Covers & Concrete',
    description:
      "Transform your outdoor space with Dallas-Fort Worth's most trusted construction team. 150+ projects. Free estimates.",
    images: [
      {
        url: '/images/hero/cover1.JPG',
        width: 1200,
        height: 630,
        alt: 'Structure1 Construction - Custom patio cover in Dallas-Fort Worth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structure1 Construction | Patio Covers & Concrete DFW',
    description:
      'Premium patio covers and concrete work in Dallas-Fort Worth. Free estimates.',
    images: ['/images/hero/cover1.JPG'],
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
    <html lang="en" className={`${bodoni.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased bg-parchment text-rich-black min-h-screen touch-manipulation">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-rich-black focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <StructuredData />
        <FloatingCTA />
      </body>
    </html>
  );
}
