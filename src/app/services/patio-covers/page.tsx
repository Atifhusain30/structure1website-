import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import PatioGallery from '@/components/services/PatioGallery';
import LeanToGallery from '@/components/services/LeanToGallery';
import GableGallery from '@/components/services/GableGallery';
import CTASection from '@/components/home/CTASection';
import { services } from '@/lib/data';

const service = services.find((s) => s.id === 'patio-covers')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.fullDescription,
};

export default function PatioCoversPage() {
  return (
    <>
      <ServiceHero
        title={service.title}
        description={service.fullDescription}
        image="/images/hero/debrabuck.JPG"
      />
      <ServiceFeatures title={service.title} features={service.features} />
      <PatioGallery />
      <GableGallery />
      <LeanToGallery />
      <CTASection />
    </>
  );
}

