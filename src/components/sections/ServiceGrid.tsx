import Reveal from '@/components/ui/Reveal';
import ServiceCard from './ServiceCard';
import { services as all } from '@/content/services';
import type { Service } from '@/content/types';

export default function ServiceGrid({ services = all }: { services?: Service[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={Math.min(i, 5) * 60}>
          <ServiceCard service={s} />
        </Reveal>
      ))}
    </ul>
  );
}
