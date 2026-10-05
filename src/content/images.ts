import type { CSSProperties } from 'react';

/** Where a crop should center vertically: a keyword, or a percentage from the top (e.g. '40%') for tall photos shown wide. */
export type Focal = 'center' | 'top' | 'bottom' | `${number}%`;
export type Photo = { src: string; alt: string; focal?: Focal };

export const photos = {
  'gable-mckinney-1': { src: '/images/hero/buckfin1-new.JPG', alt: 'Classic gable patio cover with cedar posts and white trusses in McKinney, Texas' },
  'gable-mckinney-2': { src: '/images/hero/buckfin1.JPG', alt: 'Gable patio cover with outdoor furniture in McKinney, Texas' },
  'gable-mckinney-ceiling': { src: '/images/hero/buckfin2.JPG', alt: 'Tongue-and-groove wood ceiling and fan inside a gable patio cover in McKinney, Texas' },
  'gable-mckinney-build': { src: '/images/hero/buckfin3.JPG', alt: 'Gable patio cover framing in progress in McKinney, Texas' },
  'pergola-plano-foundation': { src: '/images/hero/sashi1.JPG', alt: 'Concrete footings poured for a cedar patio cover in Plano, Texas' },
  'pergola-plano-framing': { src: '/images/hero/sashi2.jpg', alt: 'Cedar patio cover frame under construction in Plano, Texas' },
  'pergola-plano-complete': { src: '/images/hero/sashi3.JPG', alt: 'Completed cedar patio cover with polycarbonate roof in Plano, Texas' },
  'pergola-plano-complete-2': { src: '/images/hero/sashi3-new.JPG', alt: 'Cedar patio cover with polycarbonate roof panels in Plano, Texas' },
  'pergola-plano-fan': { src: '/images/hero/sashi4.JPG', alt: 'Polycarbonate patio cover roof with ceiling fan in Plano, Texas' },
  'pergola-lewisville-1': { src: '/images/hero/cover1.JPG', alt: 'Free-standing modern cedar patio cover with recessed lighting in Lewisville, Texas' },
  'pergola-lewisville-2': { src: '/images/hero/cover2.JPG', alt: 'Cedar patio cover with tongue-and-groove ceiling and fans in Lewisville, Texas' },
  'pergola-fort-worth': { src: '/images/hero/cover3.JPG', alt: 'Cedar patio cover with polycarbonate roof and ceiling fans in Fort Worth, Texas' },
  'pergola-midlothian': { src: '/images/hero/cover4.JPG', alt: 'Cedar patio cover with a privacy back wall in Midlothian, Texas' },
  'pergola-midlothian-2': { src: '/images/hero/cover4-new.JPG', alt: 'Patio cover with back wall build in Midlothian, Texas' },
  'patio-cover-dfw-1': { src: '/images/hero/cover5.jpg', alt: 'Custom patio cover with polycarbonate panels in Dallas-Fort Worth' },
  'gable-dfw': { src: '/images/hero/debrabuck.JPG', alt: 'Custom gable patio cover in Dallas-Fort Worth' },
  'gable-dallas-dusk': { src: '/images/hero/main-hero.jpg', alt: 'Cedar gable patio cover at dusk in Dallas-Fort Worth' },
  'leanto-forney-1': { src: '/images/hero/jeff1.jpg', alt: 'Lean-to patio cover attached to the roofline in Forney, Texas' },
  'leanto-forney-2': { src: '/images/hero/jeff2.JPG', alt: 'Lean-to patio cover with dark wood ceiling, recessed lighting, and fan in Forney, Texas' },
  'leanto-forney-3': { src: '/images/hero/jeff3.JPG', alt: 'Lean-to patio cover detail in Forney, Texas' },
  'stamped-flagstone': { src: '/images/hero/concrete1.jpg', alt: 'Stamped concrete patio in a flagstone pattern' },
  'stamped-wood-plank': { src: '/images/hero/concrete2.jpg', alt: 'Wood-plank stamped concrete' },
  'concrete-slab-pour': { src: '/images/hero/concrete3.jpg', alt: 'Freshly poured and finished concrete patio slab behind a brick home in Dallas-Fort Worth', focal: '62%' },
  'stamped-tile': { src: '/images/hero/Concrete4.jpg', alt: 'Multi-tone tile-pattern stamped concrete' },
  'stamped-herringbone': { src: '/images/hero/Concrete5.jpg', alt: 'Herringbone brick-pattern stamped concrete' },
  'stamped-stone-texture': { src: '/images/hero/concrete6.jpg', alt: 'Flagstone-texture stamped concrete detail' },
  'stamped-driveway-dallas': { src: '/images/images V2/stamped concrete 2.jpeg', alt: 'Stamped concrete driveway with decorative border in Dallas, Texas' },
  'driveway-dallas': { src: '/images/images V2/concrete driveway.jpeg', alt: 'Concrete driveway in Dallas, Texas' },
  'stamped-patio-forney-1': { src: '/images/images V2/stamped concrete 3.jpeg', alt: 'Stamped concrete patio in a stone pattern in Forney, Texas' },
  'stamped-patio-forney-2': { src: '/images/images V2/stamped concrete 4.jpeg', alt: 'Stamped concrete patio under a patio cover in Forney, Texas' },
  'stamped-patio-forney-3': { src: '/images/images V2/stamped concrete 5.jpeg', alt: 'Stamped concrete patio surface detail in Forney, Texas' },
  'stamped-patio-forney-4': { src: '/images/images V2/stamped concrete 6.jpeg', alt: 'Stamped concrete patio in a slate pattern in Forney, Texas' },
  'carport-melissa-1': { src: '/images/images V2/andrew 2.jpeg', alt: 'Gable-style cedar carport with tongue-and-groove ceiling in Melissa, Texas' },
  'carport-melissa-2': { src: '/images/images V2/andrew1.jpeg', alt: 'Cedar carport with decorative metal brackets in Melissa, Texas' },
  'carport-melissa-3': { src: '/images/images V2/andrew3.jpeg', alt: 'Cedar carport detail in Melissa, Texas' },
  'reno-pergola-turf-wide': { src: '/images/outdoor-renovation/pergola-turf-wide.jpg', alt: 'Free-standing cedar patio cover over a concrete patio with an outdoor kitchen and artificial turf behind a white brick home', focal: '36%' },
  'reno-pergola-kitchen-corner': { src: '/images/outdoor-renovation/pergola-kitchen-corner.jpg', alt: 'Cedar patio cover with polycarbonate roof and stacked-stone outdoor kitchen island' },
  'reno-pergola-beam-detail': { src: '/images/outdoor-renovation/pergola-beam-detail.jpg', alt: 'Cedar post, beam, and knee-brace joinery under a polycarbonate patio cover roof with a ceiling fan' },
  'reno-kitchen-pergola-turf': { src: '/images/outdoor-renovation/kitchen-pergola-turf.jpg', alt: 'Outdoor kitchen with stainless grill, fridge, and sink under a cedar patio cover, with artificial turf in front' },
  'reno-kitchen-tile': { src: '/images/outdoor-renovation/kitchen-pergola-turf.jpg', alt: 'Outdoor kitchen with stainless grill, fridge, and sink under a cedar patio cover, with artificial turf in front', focal: '58%' }, // same photo, cropped for a wide tile
  'reno-kitchen-roof-underside': { src: '/images/outdoor-renovation/kitchen-roof-underside.jpg', alt: 'Underside of a cedar patio cover roof with polycarbonate panels and ceiling fan above a stacked-stone outdoor kitchen' },
  'gable-watauga-wide': { src: '/images/projects/gable-watauga-wide.jpg', alt: 'Cedar gable home extension with a shed-roof wing along the back of a brick home in Watauga, Texas', focal: '55%' },
  'gable-watauga-front': { src: '/images/projects/gable-watauga-front.jpg', alt: 'Gable patio cover with cedar posts and trusses over a new concrete patio in Watauga, Texas' },
  'gable-watauga-wing': { src: '/images/projects/gable-watauga-wing.jpg', alt: 'Cedar shed-roof wing with tongue-and-groove ceiling and recessed lighting on a home extension in Watauga, Texas' },
  'gable-watauga-ceiling': { src: '/images/projects/gable-watauga-ceiling.jpg', alt: 'Tongue-and-groove cedar ceiling with fan and recessed lights under a gable home extension in Watauga, Texas' },
  'freestanding-cover-wide': { src: '/images/projects/freestanding-cover-wide.jpg', alt: 'Free-standing charcoal patio cover with recessed lighting over a new concrete patio and lawn in Dallas-Fort Worth', focal: '42%' },
  'freestanding-cover-front': { src: '/images/projects/freestanding-cover-front.jpg', alt: 'Free-standing patio cover with knee braces and twin ceiling fans beside a brick home in Dallas-Fort Worth' },
  'freestanding-cover-underside': { src: '/images/projects/freestanding-cover-underside.jpg', alt: 'Underside of a charcoal patio cover roof with recessed lights and ceiling fans in Dallas-Fort Worth' },
  'freestanding-cover-walkway': { src: '/images/projects/freestanding-cover-walkway.jpg', alt: 'Concrete walkway running from a free-standing patio cover along the side of a brick home in Dallas-Fort Worth' },
  'freestanding-cover-brace': { src: '/images/projects/freestanding-cover-brace.jpg', alt: 'Painted post, beam, and knee-brace detail with a recessed light on a free-standing patio cover' },
  'paver-path-sideyard': { src: '/images/projects/paver-path-sideyard.jpg', alt: 'Large-format concrete pavers set in river rock along a fenced side yard in Dallas-Fort Worth' },
  'paver-path-gate': { src: '/images/projects/paver-path-gate.jpg', alt: 'Paver stepping-stone path in river rock leading from a concrete patio to the side gate', focal: '68%' },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
export const photo = (id: PhotoId): Photo => photos[id];
/** Inline object-position for a photo's focal point, for any renderer that crops with object-cover. Undefined keeps the default center crop. */
export const focalStyle = (p: Photo): CSSProperties | undefined => (p.focal ? { objectPosition: `50% ${p.focal}` } : undefined);
