import Image from 'next/image';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import HeaderTheme from '@/components/layout/HeaderTheme';
import { photos } from '@/content/images';
import { company } from '@/content/company';

export default function Hero() {
  const p = photos['gable-mckinney-1'];
  return (
    <section className="relative bg-black text-white">
      <HeaderTheme dark />
      <div className="relative h-[72svh] max-h-[820px] min-h-[520px] md:h-[82svh]">
        <Image src={p.src} alt={p.alt} fill priority sizes="100vw" quality={82} className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/75 via-black/30 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-site px-4 pb-10 sm:px-6 md:pb-16">
            <Eyebrow tone="dark" className="mb-4">
              {company.tagline}
            </Eyebrow>
            <h1 className="max-w-3xl font-display text-h1">Outdoor spaces built like they belong with your home.</h1>
            <p className="mt-5 max-w-xl text-lead text-white/80">
              Custom patio covers, pergolas, concrete, and outdoor living — designed, permitted, and built by one in-house crew across Dallas–Fort Worth.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/estimate" tone="dark" arrow>
                Get My Free Estimate
              </Button>
              <Button href="/projects" variant="secondary" tone="dark">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
