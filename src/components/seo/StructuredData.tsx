import { companyInfo } from '@/lib/data';

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": companyInfo.name,
    "image": "https://structure1builds.com/images/hero/cover1.JPG",
    "url": "https://structure1builds.com",
    "telephone": companyInfo.phone,
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5473 Blair Rd Ste 100 PMB 476653",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "postalCode": "75231",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.7767,
      "longitude": -96.7970
    },
    "areaServed": [
      { "@type": "City", "name": "Dallas" },
      { "@type": "City", "name": "Fort Worth" },
      { "@type": "City", "name": "Plano" },
      { "@type": "City", "name": "Frisco" },
      { "@type": "City", "name": "McKinney" },
      { "@type": "City", "name": "Allen" },
      { "@type": "City", "name": "Richardson" },
      { "@type": "City", "name": "Arlington" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "sameAs": [
      companyInfo.social.facebook,
      companyInfo.social.instagram,
      companyInfo.social.linkedin
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": companyInfo.name,
    "url": "https://structure1builds.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
