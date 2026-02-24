import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioSection from '@/components/home/PortfolioSection';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <PortfolioSection />
      <WhyUs />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <ServiceAreaSection />
    </>
  );
}
