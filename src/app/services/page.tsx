import { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServiceCard from '@/components/ui/ServiceCard';
import CTASection from '@/components/home/CTASection';
import { services } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Explore our premium construction services including patio covers, concrete work, and outdoor living spaces. Quality craftsmanship for your home.',
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary-black">Services</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Our Services
            </h1>
            <p className="text-text-gray text-xl leading-relaxed">
              From concept to completion, we deliver exceptional construction services 
              tailored to transform your living spaces with quality and precision.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                shortDescription={service.shortDescription}
                image={service.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

