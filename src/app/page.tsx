import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import RecentWork from '@/components/home/RecentWork';
import WhyUs from '@/components/home/WhyUs';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <RecentWork />
      <WhyUs />
      <Testimonials />
      <CTASection />
    </>
  );
}
