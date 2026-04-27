import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import ServicesGrid from '@/components/home/ServicesGrid';
import CommitmentBlock from '@/components/home/CommitmentBlock';
import RecentProjectsStrip from '@/components/home/RecentProjectsStrip';
import Testimonials from '@/components/home/Testimonials';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesGrid />
      <CommitmentBlock />
      <RecentProjectsStrip />
      <Testimonials />
      <FAQSection />
      <ServiceAreaSection />
      <ContactSection />
    </>
  );
}
