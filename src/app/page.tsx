import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import ServiceIndex from '@/components/sections/ServiceIndex';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/content/projects';
import { why } from '@/content/trust';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section id="services">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="What we build" text="Seven services, one in-house crew. Every project includes drawings, engineering, permits, and a 2-year workmanship warranty." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/services" variant="link">
              All services
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <ServiceIndex />
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="Recent work" text="Real projects, photographed on site when we finished." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/projects" variant="link">
              All projects
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <ProjectGrid projects={featuredProjects(7)} feature />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader title="Built to last, handled end to end" />
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {why.map((w) => (
                <li key={w.title}>
                  <h3 className="font-display text-h3">{w.title}</h3>
                  <p className="mt-2 text-small text-gray-700">{w.blurb}</p>
                </li>
              ))}
            </ul>
            <TrustBar className="mt-10" />
          </div>
          <div className="lg:col-span-5">
            <Photo id="gable-mckinney-ceiling" ratio="3/4" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </Section>

      <Section id="process" tone="offwhite">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="How it works" text="Four steps, one project manager, no surprises." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/process" variant="link">
              The full process
            </Button>
          </div>
        </div>
        <div className="mt-12">
          <ProcessSteps compact />
        </div>
      </Section>

      <Section>
        <SectionHeader title="What homeowners say" />
        <div className="mt-10">
          <Testimonials />
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="Where we build" text="Based in Dallas, building across the metroplex. Pick your city for local projects, permit notes, and reviews." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/service-areas" variant="link">
              All service areas
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <ServiceAreaGrid />
        </div>
      </Section>

      <CTASection id="estimate" />
    </>
  );
}
