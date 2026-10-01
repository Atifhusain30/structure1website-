import type { CitySlug, Testimonial } from './types';

export const testimonials: Testimonial[] = [
  { id: 1, quote: 'Structure1 transformed our backyard into an absolute paradise. The patio cover exceeded every expectation. Professional from start to finish.', author: 'Sarah & Michael Johnson', project: 'Patio Cover', location: 'Dallas, TX', rating: 5, service: 'patio-covers', city: 'dallas' },
  { id: 2, quote: "Our pergola project was seamless. The team was communicative, clean, and delivered ahead of schedule. We couldn't be happier with our new outdoor space.", author: 'Jennifer Martinez', project: 'Pergola', location: 'Frisco, TX', rating: 5, service: 'pergolas', city: 'frisco' },
  { id: 3, quote: 'From design to completion, Structure1 made our concrete patio a reality. Their attention to detail is unmatched in the industry.', author: 'Robert & Linda Chen', project: 'Concrete Patio', location: 'Plano, TX', rating: 5, service: 'concrete', city: 'plano' },
  { id: 4, quote: 'The concrete driveway looks incredible. They helped us choose the perfect finish and the result is absolutely stunning. Highly recommend!', author: 'David Thompson', project: 'Concrete Driveway', location: 'McKinney, TX', rating: 5, service: 'driveways-walkways', city: 'mckinney' },
  { id: 5, quote: "Best construction experience we've ever had. On time, on budget, and the patio cover quality is top notch. Our neighbors are jealous!", author: 'Amanda & Chris Davis', project: 'Patio Cover', location: 'Allen, TX', rating: 5, service: 'patio-covers', city: 'allen' },
];

export const testimonialsForCity = (city: CitySlug) => testimonials.filter((t) => t.city === city);
