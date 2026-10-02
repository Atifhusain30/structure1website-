import type { CitySlug, Project, ServiceSlug } from './types';

export const projects: Project[] = [
  {
    slug: 'full-outdoor-renovation-pergola-kitchen-turf', title: 'Full Outdoor Renovation: Pergola, Kitchen & Turf', service: 'outdoor-living', city: null, location: 'Dallas–Fort Worth',
    cover: 'reno-pergola-turf-wide', gallery: ['reno-pergola-turf-wide', 'reno-kitchen-pergola-turf', 'reno-pergola-kitchen-corner', 'reno-kitchen-roof-underside', 'reno-pergola-beam-detail'],
    overview: 'A complete backyard built as one project: a large free-standing cedar pergola with a polycarbonate roof and ceiling fans, a stacked-stone outdoor kitchen with a built-in grill, fridge, and sink, a wide concrete patio, and artificial turf that keeps the whole yard clean and usable year-round.',
    scope: ['Free-standing cedar pergola on steel-anchored footings', 'Polycarbonate roof panels with ceiling fans', 'Stacked-stone outdoor kitchen with grill, fridge, sink, and storage', 'Concrete patio poured to size', 'Artificial turf installed across the yard'],
    materials: ['Western Red Cedar posts, beams, and rafters', 'Polycarbonate roofing', 'Stacked-stone veneer and stainless appliances', 'Reinforced concrete', 'Artificial turf'],
    featured: true,
  },
  {
    slug: 'classic-gable-patio-cover', title: 'Classic Gable Patio Cover', service: 'patio-covers', city: 'mckinney', location: 'McKinney, TX',
    cover: 'gable-mckinney-2', gallery: ['gable-mckinney-2', 'gable-mckinney-ceiling', 'gable-mckinney-build', 'gable-mckinney-1'],
    overview: 'A gable-style patio cover with cedar posts and white trusses, finished with a tongue-and-groove ceiling and fan, built as a backyard living room for a McKinney family.',
    scope: ['Gable roof structure attached to the home', 'Cedar posts on steel-anchored footings', 'Tongue-and-groove ceiling with fan', 'Permit drawings, submission, and inspections'],
    materials: ['Western Red Cedar posts', 'Painted white trusses', 'Tongue-and-groove ceiling'],
    featured: true,
  },
  {
    slug: 'lean-to-patio-cover', title: 'Lean-To Style Patio Cover', service: 'patio-covers', city: null, location: 'Forney, TX',
    cover: 'leanto-forney-2', gallery: ['leanto-forney-1', 'leanto-forney-3', 'leanto-forney-2'],
    overview: 'A modern lean-to patio cover attached to the existing roofline, with a dark-stained wood ceiling, recessed lighting, and a ceiling fan.',
    scope: ['Lean-to roof tied into the existing roofline with flashing', 'Dark-stained wood ceiling', 'Recessed lighting and ceiling fan', 'Permit package handled'],
    materials: ['Cedar framing', 'Dark-stained ceiling boards', 'Recessed LED fixtures'],
    featured: true,
  },
  {
    slug: 'pergola-with-polycarbonate', title: 'Pergola with Polycarbonate', service: 'pergolas', city: 'plano', location: 'Plano, TX',
    cover: 'pergola-plano-complete', gallery: ['pergola-plano-foundation', 'pergola-plano-framing', 'pergola-plano-complete', 'pergola-plano-fan'],
    overview: 'A custom cedar pergola with polycarbonate roofing and an integrated ceiling fan, documented from footings to finish, for year-round outdoor comfort in Plano.',
    scope: ['Concrete footings and steel post anchors', 'Cedar pergola frame', 'Polycarbonate roof panels', 'Ceiling fan installation'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels', 'Galvanized hardware'],
    featured: true,
  },
  {
    slug: 'pergola-with-back-wall', title: 'Pergola with Back Wall', service: 'pergolas', city: null, location: 'Midlothian, TX',
    cover: 'pergola-midlothian', gallery: ['pergola-midlothian', 'pergola-midlothian-2'],
    overview: 'A custom pergola design with a framed back wall for added privacy and wind protection.',
    scope: ['Cedar pergola structure', 'Framed privacy back wall', 'Permit drawings and inspections'],
    materials: ['Western Red Cedar', 'Framed and finished back wall'],
    featured: true,
  },
  {
    slug: 'concrete-driveway', title: 'Concrete Driveway', service: 'driveways-walkways', city: 'dallas', location: 'Dallas, TX',
    cover: 'stamped-driveway-dallas', gallery: ['stamped-driveway-dallas', 'driveway-dallas'],
    overview: 'A reinforced concrete driveway with a decorative stamped border and a premium stone-pattern finish.',
    scope: ['Compacted base and steel reinforcement', 'Reinforced driveway slab', 'Stamped decorative border', 'Control joints and sealer'],
    materials: ['Rebar-reinforced concrete', 'Stamped stone-pattern border', 'Sealer'],
    featured: true,
  },
  {
    slug: 'carport', title: 'Carport', service: 'remodeling', city: null, location: 'Melissa, TX',
    cover: 'carport-melissa-1', gallery: ['carport-melissa-1', 'carport-melissa-2', 'carport-melissa-3'],
    overview: 'A custom gable-style carport with cedar posts, a tongue-and-groove ceiling, and decorative metal bracket accents.',
    scope: ['Gable carport structure', 'Cedar posts on footings', 'Tongue-and-groove ceiling', 'Decorative metal brackets'],
    materials: ['Western Red Cedar', 'Tongue-and-groove ceiling', 'Decorative metal brackets'],
    featured: true,
  },
  {
    slug: 'pergola-with-polycarbonate-fort-worth', title: 'Pergola with Polycarbonate', service: 'pergolas', city: 'fort-worth', location: 'Fort Worth, TX',
    cover: 'pergola-fort-worth', gallery: ['pergola-fort-worth'],
    overview: 'A custom cedar pergola with polycarbonate roofing and ceiling fans for year-round outdoor comfort in Fort Worth.',
    scope: ['Cedar pergola frame', 'Polycarbonate roof panels', 'Ceiling fans'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels'],
    featured: false,
  },
  {
    slug: 'free-standing-modern-pergola', title: 'Free Standing Modern Pergola', service: 'pergolas', city: null, location: 'Lewisville, TX',
    cover: 'pergola-lewisville-1', gallery: ['pergola-lewisville-1', 'pergola-lewisville-2'],
    overview: 'A free-standing modern pergola with cedar posts, a finished ceiling, recessed lighting, and ceiling fans.',
    scope: ['Free-standing structure on its own footings', 'Finished ceiling', 'Recessed lighting and ceiling fans'],
    materials: ['Western Red Cedar', 'Tongue-and-groove ceiling', 'Recessed LED fixtures'],
    featured: false,
  },
  {
    slug: 'stamped-concrete-patio', title: 'Stamped Concrete Patio', service: 'stamped-concrete', city: null, location: 'Forney, TX',
    cover: 'stamped-patio-forney-1', gallery: ['stamped-patio-forney-1', 'stamped-patio-forney-2', 'stamped-patio-forney-3', 'stamped-patio-forney-4'],
    overview: 'A stamped concrete patio with a premium stone-pattern finish, installed under a custom patio cover.',
    scope: ['Compacted base and rebar', 'Stamped stone-pattern patio', 'Sealer after cure', 'Built together with the patio cover above'],
    materials: ['Rebar-reinforced concrete', 'Stone-pattern stamp with integral color', 'Sealer'],
    featured: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = (limit = 6) => projects.filter((p) => p.featured).slice(0, limit);
/** Services whose projects belong under another service's filter (e.g. every concrete job under "Concrete"). */
export const serviceFamily: Record<ServiceSlug, ServiceSlug[]> = {
  'patio-covers': ['patio-covers', 'pergolas'],
  pergolas: ['pergolas'],
  concrete: ['concrete', 'stamped-concrete', 'driveways-walkways'],
  'stamped-concrete': ['stamped-concrete'],
  'driveways-walkways': ['driveways-walkways'],
  'outdoor-living': ['outdoor-living'],
  remodeling: ['remodeling'],
};
export const inServiceFamily = (p: Project, slug: ServiceSlug) => serviceFamily[slug].includes(p.service);

export const projectsForService = (slug: ServiceSlug, limit = 6) => {
  const direct = projects.filter((p) => inServiceFamily(p, slug));
  const siblings: Record<ServiceSlug, ServiceSlug[]> = {
    'patio-covers': ['pergolas', 'outdoor-living'], pergolas: ['patio-covers'], concrete: ['stamped-concrete', 'driveways-walkways'],
    'stamped-concrete': ['concrete'], 'driveways-walkways': ['concrete', 'stamped-concrete'], 'outdoor-living': ['patio-covers', 'pergolas', 'stamped-concrete'], remodeling: ['patio-covers'],
  };
  const extra = projects.filter((p) => siblings[slug].includes(p.service) && !direct.includes(p));
  return [...direct, ...extra].slice(0, limit);
};
export const projectsForCity = (slug: CitySlug) => projects.filter((p) => p.city === slug);
export const relatedProjects = (project: Project, limit = 3) =>
  [...projects.filter((p) => p.slug !== project.slug && p.service === project.service),
   ...projects.filter((p) => p.slug !== project.slug && p.service !== project.service && p.city !== null && p.city === project.city),
   ...projects.filter((p) => p.slug !== project.slug && p.service !== project.service && p.featured)]
    .filter((p, i, arr) => arr.indexOf(p) === i).slice(0, limit);
