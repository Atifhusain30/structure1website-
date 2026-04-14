import { Metadata } from 'next';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceFeatures from '@/components/services/ServiceFeatures';
import CTASection from '@/components/home/CTASection';
import ConcreteGallery from '@/components/services/ConcreteGallery';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Concrete Services',
  description: 'Professional concrete services including stamped concrete, driveways, patios, foundations, and decorative finishes. Quality craftsmanship in Dallas-Fort Worth.',
  alternates: { canonical: '/services/concrete' },
};

export default function ConcretePage() {
  const service = services.find(s => s.id === 'concrete');
  
  if (!service) return null;

  return (
    <>
      <ServiceHero 
        title={service.title}
        description={service.fullDescription}
        image={service.image}
      />
      
      <ServiceFeatures features={service.features} />
      
      <ConcreteGallery />
      
      <CTASection />
    </>
  );
}
