import type { City, CitySlug } from './types';

export const cities: City[] = [
  {
    slug: 'dallas', name: 'Dallas', county: 'Dallas County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Dallas, TX | Structure1', description: 'Dallas-based patio cover, pergola, and stamped concrete builder. Permits handled, 2-year warranty, free on-site estimates across Dallas neighborhoods.' },
    hero: 'gable-dallas-dusk',
    intro: [
      'Structure1 Construction is based in Dallas, and Dallas backyards are where a large share of our patio covers, pergolas, and concrete work gets built. From older neighborhoods in East Dallas and Lake Highlands with mature trees and established patios, to North Dallas and Far North Dallas homes with larger lots, we size each structure to the house and work around what you already love about the yard.',
      'Our Dallas work includes a reinforced driveway with a stamped stone-pattern border and a cedar gable cover photographed at dusk. Being local means short drives for site visits, quick follow-ups, and a crew that knows the city\'s permit process.',
    ],
    permitNote: 'The City of Dallas requires a building permit for patio covers, pergolas, and other permanent accessory structures, issued through Development Services. Structure1 prepares the drawings, submits the application, and schedules inspections — permits are included in every Dallas project.',
    neighborhoods: ['Lake Highlands', 'East Dallas', 'Preston Hollow', 'North Dallas', 'Far North Dallas', 'Oak Cliff'],
    faqIds: [], testimonialIds: [1],
  },
  {
    slug: 'fort-worth', name: 'Fort Worth', county: 'Tarrant County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Fort Worth, TX | Structure1', description: 'Custom patio covers, cedar pergolas, and stamped concrete in Fort Worth. Permits included, engineered for Texas wind, 2-year warranty. Free estimates.' },
    hero: 'pergola-fort-worth',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Fort Worth, TX — including a recent pergola with polycarbonate roofing, cedar posts, and ceiling fans for a Fort Worth family who wanted year-round outdoor comfort.',
      'From established neighborhoods near the Cultural District to growing communities in far north Fort Worth, our crews build the same way everywhere: Western Red Cedar, steel-anchored footings, and roofing matched to your home.',
    ],
    permitNote: 'The City of Fort Worth requires a building permit for patio covers, issued through Development Services. Structure1 prepares the drawings, submits the application, and schedules every inspection — permits are included in every Fort Worth project.',
    neighborhoods: ['Tanglewood', 'Fairmount', 'Alliance', 'Keller area', 'Benbrook area', 'West Fort Worth'],
    faqIds: [], testimonialIds: [5],
  },
  {
    slug: 'plano', name: 'Plano', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Plano, TX | Structure1', description: 'Patio cover contractor in Plano, TX. Gable, lean-to, and polycarbonate designs, cedar pergolas, stamped concrete. Permits handled, free estimates.' },
    hero: 'pergola-plano-complete',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Plano, TX — from established neighborhoods around Legacy and Willow Bend to newer builds in East Plano. Plano backyards tend to have mature trees and established landscaping, so we design structures that work around what you already love about your yard.',
      'We\'re based in Dallas, minutes down the tollway — Plano is one of our most active service areas, and our crews are in the city on projects nearly every week.',
    ],
    permitNote: 'The City of Plano requires a building permit for patio covers and permanent shade structures, with plan review through Building Inspections. Structure1 prepares the drawings, submits the application, and schedules inspections — the permit process is included in every Plano project.',
    neighborhoods: ['Legacy West', 'Willow Bend', 'Deerfield', 'Kings Ridge', 'East Plano', 'West Plano'],
    faqIds: [], testimonialIds: [3],
  },
  {
    slug: 'frisco', name: 'Frisco', county: 'Collin & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Frisco, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Frisco, TX. HOA and city permit packages handled. 2-year warranty. Free estimates.' },
    hero: 'pergola-lewisville-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Frisco, TX. Frisco\'s newer neighborhoods mean blank-slate backyards — the perfect starting point for a complete outdoor living space with a covered patio and stamped concrete designed together instead of pieced together over years.',
      'Most Frisco neighborhoods have active HOAs with architectural review requirements. We prepare the drawings and documentation your HOA needs alongside the city permit package, so both approvals move in parallel.',
    ],
    permitNote: 'The City of Frisco requires a building permit for patio covers and permanent structures, and most Frisco HOAs require architectural approval before construction. Structure1 handles the city permit end to end and prepares the plans and renderings your HOA review needs.',
    neighborhoods: ['Phillips Creek Ranch', 'Starwood', 'Richwoods', 'The Trails', 'Panther Creek', 'Newman Village'],
    faqIds: [], testimonialIds: [2],
  },
  {
    slug: 'mckinney', name: 'McKinney', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in McKinney, TX | Structure1', description: 'Patio cover builder in McKinney, TX. Gable covers with roofing matched to your home, cedar pergolas, stamped concrete. Permits handled, free estimates.' },
    hero: 'gable-mckinney-2',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout McKinney, TX — from historic districts near downtown to newer communities in Craig Ranch and Trinity Falls. One of our signature gable patio covers, with cedar posts and white trusses, was built for a McKinney family.',
      'McKinney\'s mix of home styles calls for structures that match — we color-match shingles to your existing roof, size posts and beams to your home\'s proportions, and engineer every build for North Texas wind.',
    ],
    permitNote: 'The City of McKinney requires a building permit for patio covers, issued through Development Services; engineering documentation is commonly requested for larger spans. Structure1 handles drawings, engineering, submission, and inspections on every McKinney project.',
    neighborhoods: ['Craig Ranch', 'Stonebridge Ranch', 'Trinity Falls', 'Adriatica', 'Historic Downtown', 'Eldorado'],
    faqIds: [], testimonialIds: [4],
  },
  {
    slug: 'arlington', name: 'Arlington', county: 'Tarrant County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Arlington, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Arlington, TX. Wind-load engineering, permits handled, 2-year warranty. Free estimates.' },
    hero: 'pergola-midlothian',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Arlington, TX. Sitting in the heart of the metroplex between Dallas and Fort Worth, Arlington homeowners get the same crews, the same cedar-and-steel construction, and the same 2-year workmanship warranty we deliver everywhere in DFW.',
      'Arlington\'s established neighborhoods often have larger lots — room for a full outdoor living project: covered patio and stamped concrete extension built as one job on one timeline.',
    ],
    permitNote: 'The City of Arlington requires a building permit for patio covers and permanent shade structures, with wind-load engineering per North Central Texas building codes. Structure1 handles the complete permit package — drawings, engineering, submission, and inspections.',
    neighborhoods: ['North Arlington', 'Dalworthington Gardens area', 'Southwest Arlington', 'Viridian', 'East Arlington', 'Pantego area'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'allen', name: 'Allen', county: 'Collin County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Allen, TX | Structure1', description: 'Custom patio covers, cedar pergolas, and stamped concrete in Allen, TX. HOA and city permits handled, 2-year warranty. Free on-site estimates.' },
    hero: 'gable-dfw',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Allen, TX. Allen sits between Plano and McKinney, two of our busiest service areas, so our crews are nearby most weeks. Allen neighborhoods such as Twin Creeks and Star Creek are largely HOA communities with established backyards, which usually means an architectural approval alongside the city permit.',
      'An Allen family\'s patio cover is one of our favorite reviews: on time, on budget, and built to the standard we bring to every DFW project.',
    ],
    permitNote: 'The City of Allen requires a building permit for patio covers and other permanent accessory structures, and most Allen HOAs require architectural approval before construction. Structure1 prepares the drawings, submits the city permit, and provides the HOA package.',
    neighborhoods: ['Twin Creeks', 'Star Creek', 'Watters Crossing', 'Bethany Lakes', 'Montgomery Farm', 'Cumberland Crossing'],
    faqIds: [], testimonialIds: [5],
  },
  {
    slug: 'carrollton', name: 'Carrollton', county: 'Dallas & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Carrollton, TX | Structure1', description: 'Patio covers, cedar pergolas, and stamped concrete for Carrollton, TX homes. Permits handled, engineered for Texas wind, 2-year warranty. Free estimates.' },
    hero: 'patio-cover-dfw-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Carrollton, TX. Carrollton is a short drive up the Dallas North Tollway from our base, and its mix of established 1980s–90s neighborhoods and newer developments near Castle Hills means we see everything from replacing a worn patio slab to adding a full covered outdoor room.',
      'Older Carrollton patios are often the right candidates for tear-out and replacement with a reinforced stamped slab before a cover goes up, so the whole project is done once and done right.',
    ],
    permitNote: 'The City of Carrollton requires a building permit for patio covers and permanent accessory structures, reviewed through its Building Inspection division. Structure1 prepares the drawings, submits the application, and schedules inspections on every Carrollton project.',
    neighborhoods: ['Castle Hills area', 'Indian Creek', 'Rosemeade', 'Old Downtown Carrollton', 'Hebron', 'Josey Ranch'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'flower-mound', name: 'Flower Mound', county: 'Denton County',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Flower Mound, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete in Flower Mound, TX. HOA packages and town permits handled, 2-year warranty. Free estimates.' },
    hero: 'pergola-lewisville-2',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Flower Mound, TX. Flower Mound lots are often larger and more wooded than the rest of the metroplex, with homes set among mature trees, so we size structures to the house and design around the yard rather than clearing it.',
      'Our free-standing modern pergola in neighboring Lewisville, with cedar posts, recessed lighting, and ceiling fans, is the kind of build that fits Flower Mound backyards well.',
    ],
    permitNote: 'The Town of Flower Mound requires a building permit for patio covers and permanent accessory structures, and many Flower Mound HOAs require architectural approval. Structure1 handles the town permit end to end and prepares the drawings your HOA review needs.',
    neighborhoods: ['Bridlewood', 'Wellington', 'Tour 18', 'Lakeside', 'Wichita Chase', 'Canyon Falls area'],
    faqIds: [], testimonialIds: [],
  },
  {
    slug: 'prosper', name: 'Prosper', county: 'Collin & Denton Counties',
    seo: { title: 'Patio Covers, Pergolas & Concrete in Prosper, TX | Structure1', description: 'Custom patio covers, pergolas, and stamped concrete for new Prosper, TX homes. HOA and town permits handled, 2-year warranty. Free estimates.' },
    hero: 'gable-mckinney-1',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete in Prosper, TX. Prosper is one of the fastest-growing towns north of Frisco, and most of its homes are new builds with blank-slate backyards: a small builder-grade patio and a lot of lawn. That is the ideal starting point for a complete outdoor room designed as one project.',
      'Nearly every Prosper neighborhood has an active HOA with architectural review, so we prepare the HOA package alongside the town permit and keep both moving in parallel.',
    ],
    permitNote: 'The Town of Prosper requires a building permit for patio covers and permanent accessory structures, and Prosper HOAs require architectural approval before construction. Structure1 prepares the drawings, submits the permit, and provides the HOA package on every Prosper project.',
    neighborhoods: ['Windsong Ranch', 'Light Farms', 'Star Trail', 'Whitley Place', 'Lakes of Prosper', 'Gentle Creek'],
    faqIds: [], testimonialIds: [],
  },
];

export const getCity = (slug: string): City | undefined => cities.find((c) => c.slug === slug);
export const citySlugs = cities.map((c) => c.slug) as CitySlug[];

/** Full list for the hub footer and LocalBusiness areaServed. */
export const serviceAreaList = [
  'Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Allen', 'Richardson', 'Arlington', 'Garland', 'Irving',
  'Grand Prairie', 'Mesquite', 'Carrollton', 'Denton', 'Lewisville', 'Flower Mound', 'Mansfield', 'Cedar Hill', 'Rowlett', 'Wylie', 'Prosper',
];
