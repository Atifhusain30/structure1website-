import { Check } from 'lucide-react';

interface ServiceFeaturesProps {
  features: string[];
}

export default function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <section className="bg-parchment py-20">
      <div className="max-w-container mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="text-gold font-body text-[11px] font-semibold uppercase tracking-[0.32em] block mb-5">
            What&apos;s Included
          </span>
          <h2 className="font-heading text-rich-black font-medium tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
            Built into every project.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/60 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div key={feature} className="bg-warm-white p-6 flex items-start gap-3">
              <div className="shrink-0 w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-gold" strokeWidth={2} />
              </div>
              <span className="text-rich-black font-body font-medium text-[14.5px]">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
