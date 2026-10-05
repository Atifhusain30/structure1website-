import type { PhotoId } from './images';

export type ServiceSlug =
  | 'patio-covers' | 'concrete' | 'stamped-concrete'
  | 'driveways-walkways' | 'outdoor-living' | 'remodeling';
export type CitySlug =
  | 'dallas' | 'fort-worth' | 'plano' | 'frisco' | 'mckinney'
  | 'arlington' | 'allen' | 'carrollton' | 'flower-mound' | 'prosper';
export type Topic = ServiceSlug | 'planning';

export type Faq = { id: string; question: string; answer: string };

export type Service = {
  slug: ServiceSlug;
  name: string;
  navLabel: string;
  navBlurb: string;
  seo: { title: string; description: string };
  hero: PhotoId;
  gallery: PhotoId[];
  lead: string;
  overview: string[];
  options: Array<{ name: string; blurb: string; range?: string }>;
  reasons: Array<{ title: string; blurb: string }>;
  construction: string[];
  faqIds: string[];
  relatedServices: ServiceSlug[];
  topic: Topic;
  ownerReview?: boolean;
};

/** One tile in the services photo mosaic. Usually derived from a Service; the home page swaps one slot for a project-led tile. */
export type MosaicTile = { key: string; href: string; photo: PhotoId; name: string; blurb: string; wide?: boolean };

export type Project = {
  slug: string;
  title: string;
  service: ServiceSlug;
  city: CitySlug | null;
  location: string;
  cover: PhotoId;
  gallery: PhotoId[];
  overview: string;
  scope: string[];
  materials: string[];
  featured: boolean;
};

export type City = {
  slug: CitySlug;
  name: string;
  county: string;
  seo: { title: string; description: string };
  hero: PhotoId;
  intro: string[];
  permitNote: string;
  neighborhoods: string[];
  faqIds: string[];
  testimonialIds: number[];
};

export type Testimonial = {
  id: number; quote: string; author: string; project: string; location: string; rating: number;
  service: ServiceSlug; city: CitySlug | null;
};

export type ProcessStep = {
  number: string; title: string; summary: string; homeownerDoes: string; weDo: string; timing: string;
};
