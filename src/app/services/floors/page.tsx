import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import ServiceProjects from '@/components/services/ServiceProjects';
import CTASection from '@/components/home/CTASection';
import { services } from '@/lib/data';

const service = services.find((s) => s.id === 'floors')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.fullDescription,
};

export default function FloorsPage() {
  return (
    <>
      <ServiceHero
        title={service.title}
        description={service.fullDescription}
      />
      <ServiceFeatures features={service.features} />
      <ServiceProjects category={service.id} title={service.title} />
      <CTASection />
    </>
  );
}

