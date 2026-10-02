import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/sections/SectionHeader';
import TrustBar from '@/components/sections/TrustBar';
import ServiceMosaic from '@/components/sections/ServiceMosaic';
import ReelStrip from '@/components/sections/ReelStrip';
import ProjectFeature from '@/components/sections/ProjectFeature';
import ProjectGrid from '@/components/sections/ProjectGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import ServiceAreaGrid from '@/components/sections/ServiceAreaGrid';
import EstimateForm from '@/components/forms/EstimateForm';
import Photo from '@/components/ui/Photo';
import Button from '@/components/ui/Button';
import { featuredProjects } from '@/content/projects';
import { reels } from '@/content/reels';
import { why, trust } from '@/content/trust';
import { company } from '@/content/company';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section className="py-6 md:py-8">
        <TrustBar />
      </Section>

      <Section id="services" className="pt-10 md:pt-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeader className="lg:col-span-7" title="What we build" text="Seven services, one in-house crew. Drawings, engineering, permits, and a 2-year workmanship warranty are part of every project." />
          <div className="lg:col-span-5 lg:text-right">
            <Button href="/services" variant="link">
              All services
            </Button>
          </div>
        </div>
        <div className="mt-8">
          <ServiceMosaic />
        </div>
      </Section>

      {reels.length > 0 && (
        <Section className="pt-0 md:pt-0">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <SectionHeader className="lg:col-span-7" title="From the job site" text="Short clips our crew shoots while the work is going in." />
            <div className="lg:col-span-5 lg:text-right">
              <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[0.9375rem] font-medium underline underline-offset-4 decoration-gray-200 hover:decoration-black">
                Follow on Instagram
              </a>
            </div>
          </div>
          <div className="mt-8">
            <ReelStrip reels={reels} />
          </div>
        </Section>
      )}

      <Section tone="offwhite">
        <ProjectFeature
          slug="full-outdoor-renovation-pergola-kitchen-turf"
          eyebrow="A complete backyard"
          heading="Full outdoor renovation: pergola, kitchen, and turf"
          text="One project, one crew, one timeline. A free-standing cedar pergola with a polycarbonate roof and fans, a stacked-stone outdoor kitchen, a wide concrete patio, and artificial turf that keeps the whole yard clean and usable year-round."
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
          <ProjectGrid projects={featuredProjects(8).filter((p) => p.slug !== 'full-outdoor-renovation-pergola-kitchen-turf')} feature />
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
          <ServiceAreaGrid />
        </div>
      </Section>

      <Section id="estimate">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-h2">Get a free estimate</h2>
            <p className="mt-4 max-w-md text-lead text-gray-700">
              Tell us about the project. We reply within one business day with next steps, then walk the site with you before quoting. No obligation.
            </p>
            <ul className="mt-8 space-y-3 text-small text-gray-700">
              {trust.slice(0, 4).map((t) => (
                <li key={t.label} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" aria-hidden />
                  <span>
                    <span className="font-medium text-black">{t.label}.</span> {t.detail}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-small text-gray-700">
              Prefer to talk?{' '}
              <a href={`tel:${company.phoneRaw}`} className="font-medium text-black underline underline-offset-4 decoration-gray-200 hover:decoration-black">
                {company.phone}
              </a>
            </p>
          </div>
          <div className="lg:col-span-7">
            <EstimateForm />
          </div>
        </div>
      </Section>
    </>
  );
}
