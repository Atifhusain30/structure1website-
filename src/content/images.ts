export type Focal = 'center' | 'top' | 'bottom';
export type Photo = { src: string; alt: string; focal?: Focal };

export const photos = {
  'gable-mckinney-1': { src: '/images/hero/buckfin1-new.JPG', alt: 'Classic gable patio cover with cedar posts and white trusses in McKinney, Texas' },
  'gable-mckinney-2': { src: '/images/hero/buckfin1.JPG', alt: 'Gable patio cover with outdoor furniture in McKinney, Texas' },
  'gable-mckinney-ceiling': { src: '/images/hero/buckfin2.JPG', alt: 'Tongue-and-groove wood ceiling and fan inside a gable patio cover in McKinney, Texas' },
  'gable-mckinney-build': { src: '/images/hero/buckfin3.JPG', alt: 'Gable patio cover framing in progress in McKinney, Texas' },
  'pergola-plano-foundation': { src: '/images/hero/sashi1.JPG', alt: 'Concrete footings poured for a cedar pergola in Plano, Texas' },
  'pergola-plano-framing': { src: '/images/hero/sashi2.jpg', alt: 'Cedar pergola frame under construction in Plano, Texas' },
  'pergola-plano-complete': { src: '/images/hero/sashi3.JPG', alt: 'Completed cedar pergola with polycarbonate roof in Plano, Texas' },
  'pergola-plano-complete-2': { src: '/images/hero/sashi3-new.JPG', alt: 'Cedar pergola with polycarbonate roof panels in Plano, Texas' },
  'pergola-plano-fan': { src: '/images/hero/sashi4.JPG', alt: 'Polycarbonate pergola roof with ceiling fan in Plano, Texas' },
  'pergola-lewisville-1': { src: '/images/hero/cover1.JPG', alt: 'Free-standing modern cedar pergola with recessed lighting in Lewisville, Texas' },
  'pergola-lewisville-2': { src: '/images/hero/cover2.JPG', alt: 'Cedar pergola with tongue-and-groove ceiling and fans in Lewisville, Texas' },
  'pergola-fort-worth': { src: '/images/hero/cover3.JPG', alt: 'Cedar pergola with polycarbonate roof and ceiling fans in Fort Worth, Texas' },
  'pergola-midlothian': { src: '/images/hero/cover4.JPG', alt: 'Cedar pergola with a privacy back wall in Midlothian, Texas' },
  'pergola-midlothian-2': { src: '/images/hero/cover4-new.JPG', alt: 'Pergola with back wall build in Midlothian, Texas' },
  'patio-cover-dfw-1': { src: '/images/hero/cover5.jpg', alt: 'Custom patio cover with polycarbonate panels in Dallas-Fort Worth' },
  'gable-dfw': { src: '/images/hero/debrabuck.JPG', alt: 'Custom gable patio cover in Dallas-Fort Worth' },
  'gable-dallas-dusk': { src: '/images/hero/main-hero.jpg', alt: 'Cedar gable patio cover at dusk in Dallas, Texas' },
  'leanto-forney-1': { src: '/images/hero/jeff1.jpg', alt: 'Lean-to patio cover attached to the roofline in Forney, Texas' },
  'leanto-forney-2': { src: '/images/hero/jeff2.JPG', alt: 'Lean-to patio cover with dark wood ceiling, recessed lighting, and fan in Forney, Texas' },
  'leanto-forney-3': { src: '/images/hero/jeff3.JPG', alt: 'Lean-to patio cover detail in Forney, Texas' },
  'stamped-flagstone': { src: '/images/hero/concrete1.jpg', alt: 'Stamped concrete patio in a flagstone pattern' },
  'stamped-wood-plank': { src: '/images/hero/concrete2.jpg', alt: 'Wood-plank stamped concrete' },
  'concrete-slab-pour': { src: '/images/hero/concrete3.jpg', alt: 'Freshly poured concrete slab' },
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
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;
export const photo = (id: PhotoId): Photo => photos[id];
