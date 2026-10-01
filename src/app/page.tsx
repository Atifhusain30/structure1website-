import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import ServiceGrid from '@/components/sections/ServiceGrid';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/content/projects';
import { why } from '@/content/trust';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section className="py-0">
        <TrustBar className="border-t-0" />
      </Section>
      <Section className="pt-10 md:pt-14">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          <Photo id="leanto-forney-2" ratio="3/4" sizes="33vw" />
          <Photo id="pergola-plano-complete" ratio="3/4" sizes="33vw" />
          <Photo id="stamped-patio-forney-1" ratio="3/4" sizes="33vw" />
        </div>
      </Section>
      <Section id="services" tone="offwhite">
        <SectionHeader
          eyebrow="Services"
          title="What we build"
          text="Seven services, one in-house crew. Every project includes drawings, engineering, permits, and a 2-year workmanship warranty."
        />
        <div className="mt-12">
          <ServiceGrid />
        </div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeader eyebrow="Why Structure1" title="Built to last, handled end to end" />
            <ul className="mt-10 grid gap-px border border-gray-200 bg-gray-200 sm:grid-cols-2">
              {why.map((w) => (
                <li key={w.title} className="bg-white p-6">
                  <h3 className="font-display text-h3">{w.title}</h3>
                  <p className="mt-2 text-small text-gray-700">{w.blurb}</p>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="lg:col-span-5">
            <Photo id="gable-mckinney-ceiling" ratio="3/4" sizes="(max-width: 1024px) 100vw, 40vw" />
          </Reveal>
        </div>
      </Section>
      <Section tone="offwhite">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Projects" title="Recent work" />
          <Button href="/projects" variant="link" arrow>
            View all projects
          </Button>
        </div>
        <div className="mt-12">
          <ProjectGrid projects={featuredProjects(6)} />
        </div>
      </Section>
      <Section id="process">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Process" title="How it works" text="Four steps, one project manager, no surprises." />
          <Button href="/process" variant="link" arrow>
            See the full process
          </Button>
        </div>
        <div className="mt-12">
          <ProcessSteps compact />
        </div>
      </Section>
      <Section tone="offwhite">
        <SectionHeader eyebrow="Reviews" title="What homeowners say" />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>
      <Section>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Service areas" title="Serving Dallas–Fort Worth" text="Based in Dallas, building across the metroplex." />
          <Link href="/service-areas" className="text-sm font-medium underline-offset-4 hover:text-timber hover:underline">
            All service areas →
          </Link>
        </div>
        <div className="mt-12">
          <ServiceAreaGrid />
        </div>
      </Section>
      <CTASection id="estimate" />
    </>
  );
}
