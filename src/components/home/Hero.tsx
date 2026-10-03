import EstimateForm from '@/components/forms/EstimateForm';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import Photo from '@/components/ui/Photo';
import { company } from '@/content/company';

/**
 * The home hero: one calm photo with the headline on the left and the estimate card on the right, so a visitor
 * can ask for a quote without leaving the first screen. On phones the photo backs only the headline band and
 * the card follows it on a dark ground, so the photo is not stretched behind a tall form.
 */
export default function Hero() {
  return (
    <section data-dark-hero="" className="hero-photo relative flex overflow-hidden bg-black text-white lg:min-h-[92svh] lg:items-center">
      <div className="absolute inset-x-0 top-0 h-[78svh] lg:inset-0 lg:h-auto">
        <Photo id="reno-kitchen-pergola-turf" ratio="fill" sizes="100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 lg:from-black/70 lg:via-black/15" aria-hidden />
      </div>
      <div className="relative mx-auto grid w-full max-w-site gap-10 px-4 pb-10 pt-32 sm:px-6 md:pb-14 lg:grid-cols-12 lg:items-center lg:gap-12 lg:pt-28">
        <div className="hero-copy lg:col-span-7">
          <h1 className="max-w-4xl font-display text-h1">Outdoor spaces built like they belong with your home.</h1>
          <p className="mt-5 max-w-xl text-lead text-white/85">
            Patio covers, pergolas, concrete, and complete outdoor rooms across Dallas–Fort Worth. One in-house crew from drawings to final walk-through.
          </p>
          <Button href="/projects" variant="secondary" tone="dark" className="mt-8">
            See the work
          </Button>
        </div>
        <div className="hero-block lg:col-span-5">
          <div className="bg-white p-6 text-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] lg:p-7">
            <Eyebrow>Free estimate</Eyebrow>
            <h2 className="mt-2 font-display text-h3">Tell us about the project</h2>
            <p className="mt-2 text-small text-gray-700">
              We reply within one business day, then walk the site with you before quoting. Prefer to talk?{' '}
              <Button href={`tel:${company.phoneRaw}`} variant="link">
                {company.phone}
              </Button>
            </p>
            <div className="mt-5">
              <EstimateForm compact cta="Request my estimate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
