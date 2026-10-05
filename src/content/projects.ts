import type { CitySlug, Project, ServiceSlug } from './types';

export const projects: Project[] = [
  {
    slug: 'backyard-concrete-patio-kitchen-turf', title: 'Backyard Concrete Patio: Cover, Kitchen & Turf', service: 'concrete', city: null, location: 'Dallas–Fort Worth',
    cover: 'reno-pergola-turf-wide', gallery: ['reno-pergola-turf-wide', 'reno-kitchen-pergola-turf', 'reno-pergola-kitchen-corner', 'reno-kitchen-roof-underside', 'reno-pergola-beam-detail'],
    overview: 'The concrete at the center of a full outdoor renovation: a wide, reinforced patio slab poured to carry a free-standing cedar patio cover and a stacked-stone outdoor kitchen, with artificial turf laid up to its edges so the whole yard stays clean and usable year-round.',
    scope: ['Site prep, compacted base, and forms set to drain away from the house', 'Reinforced concrete patio slab sized for the patio cover and outdoor kitchen', 'Footings for the cover posts', 'Control joints cut on a proper grid', 'Clean edges for the turf to meet'],
    materials: ['Rebar-reinforced concrete', 'Compacted base', 'Broom finish'],
    featured: true,
  },
  {
    slug: 'gable-home-extension-watauga', title: 'Gable Home Extension', service: 'patio-covers', city: null, location: 'Watauga, TX',
    cover: 'gable-watauga-wide', gallery: ['gable-watauga-wide', 'gable-watauga-front', 'gable-watauga-wing', 'gable-watauga-ceiling'],
    overview: 'A gable home extension engineered and designed in-house by Structure1: a cedar gable roof over the main living area, with a shed-roof wing continuing along the back of the house, tongue-and-groove ceiling, recessed lighting, and fans over a new concrete patio.',
    scope: ['Engineering drawings and permit package prepared in-house', 'Gable roof structure tied into the existing home', 'Shed-roof wing extended along the back wall', 'Cedar posts on steel-anchored footings', 'Tongue-and-groove ceiling with recessed lighting and fans', 'New concrete patio poured under the cover'],
    materials: ['Western Red Cedar posts and beams', 'Tongue-and-groove cedar ceiling', 'Recessed LED fixtures', 'Rebar-reinforced concrete patio'],
    featured: true,
  },
  {
    slug: 'free-standing-patio-cover-pavers-walkway', title: 'Free-Standing Patio Cover, Pavers & Walkway', service: 'outdoor-living', city: null, location: 'Dallas–Fort Worth',
    cover: 'freestanding-cover-wide', gallery: ['freestanding-cover-wide', 'freestanding-cover-front', 'freestanding-cover-underside', 'freestanding-cover-walkway', 'paver-path-sideyard', 'paver-path-gate', 'freestanding-cover-brace'],
    overview: 'Three jobs that read as one backyard. A free-standing patio cover in a deep charcoal finish, with recessed lighting and twin fans, sits on a new broom-finish patio. A concrete walkway wraps the side of the house, and large-format pavers set in river rock turn a forgotten side yard into a clean path to the gate.',
    scope: ['Free-standing cover on its own footings, clear of the roofline', 'Recessed lighting and two ceiling fans', 'New broom-finish concrete patio under the cover', 'Concrete walkway along the side of the home', 'Large-format pavers set in river rock down the side yard', 'Drawings, permit, and inspections handled'],
    materials: ['Painted timber posts, beams, and knee braces', 'Rebar-reinforced broom-finish concrete', 'Large-format concrete pavers', 'River rock bed', 'Recessed LED fixtures'],
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
    slug: 'polycarbonate-patio-cover-plano', title: 'Polycarbonate Patio Cover', service: 'patio-covers', city: 'plano', location: 'Plano, TX',
    cover: 'pergola-plano-complete', gallery: ['pergola-plano-foundation', 'pergola-plano-framing', 'pergola-plano-complete', 'pergola-plano-fan'],
    overview: 'A custom cedar patio cover with polycarbonate roofing and an integrated ceiling fan, documented from footings to finish, for year-round outdoor comfort in Plano.',
    scope: ['Concrete footings and steel post anchors', 'Cedar frame', 'Polycarbonate roof panels', 'Ceiling fan installation'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels', 'Galvanized hardware'],
    featured: true,
  },
  {
    slug: 'patio-cover-with-back-wall', title: 'Patio Cover with Back Wall', service: 'patio-covers', city: null, location: 'Midlothian, TX',
    cover: 'pergola-midlothian', gallery: ['pergola-midlothian', 'pergola-midlothian-2'],
    overview: 'A custom cedar patio cover with a framed back wall for added privacy and wind protection.',
    scope: ['Cedar cover structure', 'Framed privacy back wall', 'Permit drawings and inspections'],
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
    slug: 'polycarbonate-patio-cover-fort-worth', title: 'Polycarbonate Patio Cover', service: 'patio-covers', city: 'fort-worth', location: 'Fort Worth, TX',
    cover: 'pergola-fort-worth', gallery: ['pergola-fort-worth'],
    overview: 'A custom cedar patio cover with polycarbonate roofing and ceiling fans for year-round outdoor comfort in Fort Worth.',
    scope: ['Cedar frame', 'Polycarbonate roof panels', 'Ceiling fans'],
    materials: ['Western Red Cedar', 'Polycarbonate roof panels'],
    featured: false,
  },
  {
    slug: 'free-standing-modern-patio-cover', title: 'Free-Standing Modern Patio Cover', service: 'patio-covers', city: null, location: 'Lewisville, TX',
    cover: 'pergola-lewisville-1', gallery: ['pergola-lewisville-1', 'pergola-lewisville-2'],
    overview: 'A free-standing modern patio cover with cedar posts, a finished ceiling, recessed lighting, and ceiling fans.',
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
    featured: false,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
/** Featured projects in catalog order. `exclude` drops a slug (e.g. the one already shown big) before the limit is applied, so the count is stable. */
export const featuredProjects = (limit = 6, exclude?: string) => projects.filter((p) => p.featured && p.slug !== exclude).slice(0, limit);
/** Services whose projects belong under another service's filter (e.g. every concrete job under "Concrete"). */
export const serviceFamily: Record<ServiceSlug, ServiceSlug[]> = {
  'patio-covers': ['patio-covers', 'outdoor-living'],
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
    'patio-covers': ['outdoor-living'], concrete: ['stamped-concrete', 'driveways-walkways', 'outdoor-living'],
    'stamped-concrete': ['concrete', 'outdoor-living'], 'driveways-walkways': ['concrete', 'stamped-concrete', 'outdoor-living'], 'outdoor-living': ['patio-covers', 'stamped-concrete'], remodeling: ['patio-covers'],
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
