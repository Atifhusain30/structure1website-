import { companyInfo } from '@/lib/data';

export default function StructuredData() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": companyInfo.name,
    "description": "Premium home construction services including patio covers, kitchens, floors, and pools in Texas.",
    "url": "https://structure1.com",
    "telephone": companyInfo.phone,
    "email": companyInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Construction Ave",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "postalCode": "75201",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.7767",
      "longitude": "-96.7970"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "State",
      "name": "Texas"
    },
    "sameAs": [
      companyInfo.social.facebook,
      companyInfo.social.instagram,
      companyInfo.social.linkedin
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "150"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": companyInfo.name,
    "url": "https://structure1.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://structure1.com/projects?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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

