import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import ServiceMosaic from '@/components/sections/ServiceMosaic';
import ReelStrip from '@/components/sections/ReelStrip';
import JobSiteBackdrop from '@/components/sections/JobSiteBackdrop';
import ProjectFeature from '@/components/sections/ProjectFeature';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import CTASection from '@/components/sections/CTASection';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/content/projects';
import { homeMosaicTiles } from '@/content/services';
import { reels } from '@/content/reels';
import { why } from '@/content/trust';
import { company } from '@/content/company';

export const metadata: Metadata = { alternates: { canonical: '/' } };

/** The project shown big above the "Recent work" grid; the grid excludes it and shows one wide lead plus two rows of three. */
const HOME_FEATURE = 'gable-home-extension-watauga';
const GRID_COUNT = 7;

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section className="py-6 md:py-8">
        <TrustBar />
      </Section>

      <Section id="services" className="pt-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="What we build" text="Patio covers to concrete, one in-house crew. Drawings, engineering, permits, and a 2-year workmanship warranty are part of every project." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/services" variant="link">
              All services
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <ServiceMosaic tiles={homeMosaicTiles} />
        </div>
      </Section>

      {reels.length > 0 && (
        <Section className="relative overflow-hidden pt-0 md:pt-0 md:pb-48">
          <JobSiteBackdrop />
          <div className="relative grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeader className="lg:col-span-7" title="From the job site" text="Short clips our crew shoots while the work is going in." />
            <div className="lg:col-span-5 lg:text-right">
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-white px-1 text-[0.9375rem] font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-black">
                Follow on Instagram
              </a>
            </div>
          </div>
          <div className="relative mt-8">
            <ReelStrip reels={reels} />
          </div>
        </Section>
      )}

      <Section tone="offwhite">
        <ProjectFeature
          slug={HOME_FEATURE}
          eyebrow="Engineered and designed in-house"
          heading="Gable home extension in Watauga"
          text="A cedar gable roof over the main living area, with a shed-roof wing continuing along the back of the house. Tongue-and-groove ceiling, recessed lighting, and fans over a new concrete patio, from our drawings to the final walk-through."
        />
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="Recent work" text="Real projects, photographed on site when we finished." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/projects" variant="link">
              All projects
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <ProjectGrid projects={featuredProjects(GRID_COUNT, HOME_FEATURE)} feature />
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Photo id="gable-mckinney-ceiling" ratio="3/4" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
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
          </div>
        </div>
      </Section>

      <Section id="process" tone="offwhite">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
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
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="Where we build" text="Based in Dallas, building across the metroplex. Pick your city for local projects, permit notes, and reviews." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/service-areas" variant="link">
              All service areas
            </Button>
          </div>
        </div>
        <div className="mt-10">
          <ServiceAreaGrid variant="links" />
        </div>
      </Section>

      <CTASection heading="Ready to plan your project?" text="Tell us what you have in mind. We reply within one business day and walk the site with you before quoting." />
    </>
  );
}
