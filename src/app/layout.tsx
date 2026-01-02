import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import StructuredData from '@/components/seo/StructuredData';

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

export const metadata: Metadata = {
  title: {
    default: 'Structure1 Construction | Premium Home Construction Services',
    template: '%s | Structure1 Construction',
  },
  description:
    'Transform your living space with Structure1 Construction. Expert design-build services for patio covers, kitchens, floors, and pools. Free consultations available.',
  keywords: [
    'construction',
    'home renovation',
    'patio covers',
    'kitchen remodeling',
    'flooring',
    'pool construction',
    'Texas contractor',
  ],
  metadataBase: new URL('https://structure1.com'),
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Structure1 Construction' }],
  creator: 'Structure1 Construction',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased bg-off-white text-primary-black">
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
      </body>
    </html>
  );
}
