import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Users, Target, Heart } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Counter from '@/components/ui/Counter';
import CTASection from '@/components/home/CTASection';
import { stats } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Structure1 Construction - over 4 years of experience delivering quality construction services in Texas. Meet our team and discover our values.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Award,
    title: 'Quality First',
    description:
      'We never compromise on quality. Every project receives our complete attention to detail and finest craftsmanship.',
  },
  {
    icon: Users,
    title: 'Client Focused',
    description:
      'Your vision drives our work. We listen, collaborate, and deliver results that exceed expectations.',
  },
  {
    icon: Target,
    title: 'Precision',
    description:
      'From planning to execution, we maintain exacting standards to ensure perfect results every time.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description:
      'We love what we do. That passion shows in every project we complete and every relationship we build.',
  },
];

const milestones = [
  { year: '2021', title: 'Company Founded', description: 'Structure1 Construction established in Dallas, TX' },
  { year: '2022', title: 'Expanded Services', description: 'Added pool construction and patio covers to our offerings' },
  { year: '2023', title: '50th Project', description: 'Celebrated completing our 50th construction project' },
  { year: '2024', title: 'Regional Growth', description: 'Expanded operations across major Texas cities' },
  { year: '2025', title: '150+ Projects', description: 'Continuing to grow with unwavering commitment to quality' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-gray mb-8">
              <Link href="/" className="hover:text-primary-black transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary-black">About</span>
            </div>

            <h1 className="font-heading font-bold text-hero text-primary-black mb-6">
              Building Dreams Since 2021
            </h1>
            <p className="text-text-gray text-xl leading-relaxed mb-8">
              For over 4 years, Structure1 Construction has been transforming homes 
              across Texas. We combine traditional craftsmanship with modern innovation 
              to deliver exceptional results.
            </p>
            <p className="text-text-gray leading-relaxed">
              What started as a small family operation has grown into one of the most 
              trusted construction companies in the region. Our commitment to quality, 
              transparency, and customer satisfaction remains unchanged.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary-black">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <span className="block font-heading font-bold text-6xl text-white mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-gray-400 text-lg">{stat.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-section bg-off-white">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
              Our Values
            </span>
            <h2 className="font-heading font-bold text-section text-primary-black mb-6">
              What Drives Us
            </h2>
            <p className="text-text-gray text-lg max-w-2xl mx-auto">
              Our core values guide every decision we make and every project we undertake.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <div className="bg-white rounded-2xl p-8 h-full">
                  <div className="w-14 h-14 bg-accent-warm/10 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-accent-warm" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-primary-black mb-3">
                    {value.title}
                  </h3>
                  <p className="text-text-gray leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-section bg-cream">
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-accent-warm text-sm font-medium uppercase tracking-[0.2em] mb-4 block">
              Our Journey
            </span>
            <h2 className="font-heading font-bold text-section text-primary-black">
              Company Milestones
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={milestone.year} delay={index * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="shrink-0">
                    <span className="inline-block bg-primary-black text-white font-heading font-bold px-4 py-2 rounded-full">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-heading font-bold text-xl text-primary-black mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-text-gray">{milestone.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}

