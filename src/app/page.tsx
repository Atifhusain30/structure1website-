import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import ServicesGrid from '@/components/home/ServicesGrid';
import InlineEstimate from '@/components/home/InlineEstimate';
import RecentWork from '@/components/home/RecentWork';
import Process from '@/components/home/Process';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <InlineEstimate />
      <RecentWork />
      <Process />
      <Testimonials />
      <ServiceAreaSection />
      <CTASection />
    </>
  );
}
