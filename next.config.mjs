/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: { '/blog': ['./content/blog/**'] },
  },
  images: {
    // Modern formats for iOS 14+ and Android
    formats: ['image/webp'], // AVIF encoding stalls Next's optimizer on 2000px sources; Netlify's image CDN negotiates formats in production
    // Mobile-first device sizes (iOS and Android breakpoints)
    deviceSizes: [375, 414, 428, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Aggressive caching for mobile
    minimumCacheTTL: 31536000, // 1 year
    // Disable static imports for faster builds
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Optimize bundle for mobile
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // The Pergolas service was folded into Patio Covers (Oct 2026); old URLs stay reachable.
  async redirects() {
    const moved = {
      '/services/pergolas': '/services/patio-covers',
      '/projects/pergola-with-polycarbonate': '/projects/polycarbonate-patio-cover-plano',
      '/projects/pergola-with-polycarbonate-fort-worth': '/projects/polycarbonate-patio-cover-fort-worth',
      '/projects/pergola-with-back-wall': '/projects/patio-cover-with-back-wall',
      '/projects/free-standing-modern-pergola': '/projects/free-standing-modern-patio-cover',
      '/projects/full-outdoor-renovation-pergola-kitchen-turf': '/projects/backyard-concrete-patio-kitchen-turf',
      '/blog/patio-cover-vs-pergola': '/blog/solid-roof-vs-polycarbonate-patio-cover',
    };
    return Object.entries(moved).map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  // Headers for mobile optimization
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
