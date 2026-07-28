import { companyInfo, serviceAreas } from '@/lib/data';

const BASE_URL = 'https://structure1builds.com';

interface ServiceSchemaProps {
  name: string;
  description: string;
  path: string;
  image?: string;
}

export default function ServiceSchema({ name, description, path, image }: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${path}`,
    ...(image ? { image: `${BASE_URL}${image}` } : {}),
    serviceType: name,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: companyInfo.name,
      url: BASE_URL,
      telephone: companyInfo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dallas',
        addressRegion: 'TX',
        addressCountry: 'US',
      },
    },
    areaServed: serviceAreas.map((city) => ({ '@type': 'City', name: `${city}, TX` })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
