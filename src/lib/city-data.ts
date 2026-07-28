import type { FaqItem } from './faq-data';

export interface CityInfo {
  slug: string;
  name: string;
  heroImage: string;
  intro: string[];
  permitNote: string;
  neighborhoods: string[];
  projectSlugs: string[];
  testimonialIds: number[];
}

export const cities: CityInfo[] = [
  {
    slug: 'plano',
    name: 'Plano',
    heroImage: '/images/hero/sashi3.JPG',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Plano, TX — from established neighborhoods around Legacy and Willow Bend to newer builds in East Plano. Plano backyards tend to have mature trees and established landscaping, so we design structures that work around what you already love about your yard.',
      'We\'re based in Dallas, minutes down the tollway — Plano is one of our most active service areas, and our crews are in the city on projects nearly every week.',
    ],
    permitNote:
      'The City of Plano requires a building permit for patio covers and permanent shade structures, with plan review through Building Inspections. Structure1 prepares the drawings, submits the application, and schedules inspections — the permit process is included in every Plano project.',
    neighborhoods: ['Legacy West', 'Willow Bend', 'Deerfield', 'Kings Ridge', 'East Plano', 'West Plano'],
    projectSlugs: ['pergola-with-polycarbonate'],
    testimonialIds: [3],
  },
  {
    slug: 'frisco',
    name: 'Frisco',
    heroImage: '/images/hero/cover1.JPG',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Frisco, TX. Frisco\'s newer neighborhoods mean blank-slate backyards — the perfect starting point for a complete outdoor living space with a covered patio and stamped concrete designed together instead of pieced together over years.',
      'Most Frisco neighborhoods have active HOAs with architectural review requirements. We prepare the drawings and documentation your HOA needs alongside the city permit package, so both approvals move in parallel.',
    ],
    permitNote:
      'The City of Frisco requires a building permit for patio covers and permanent structures, and most Frisco HOAs require architectural approval before construction. Structure1 handles the city permit end to end and prepares the plans and renderings your HOA review needs.',
    neighborhoods: ['Phillips Creek Ranch', 'Starwood', 'Richwoods', 'The Trails', 'Panther Creek', 'Newman Village'],
    projectSlugs: [],
    testimonialIds: [2],
  },
  {
    slug: 'mckinney',
    name: 'McKinney',
    heroImage: '/images/hero/buckfin1.JPG',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout McKinney, TX — from historic districts near downtown to newer communities in Craig Ranch and Trinity Falls. One of our signature gable patio covers, with cedar posts and white trusses, was built for a McKinney family.',
      'McKinney\'s mix of home styles calls for structures that match — we color-match shingles to your existing roof, size posts and beams to your home\'s proportions, and engineer every build for North Texas wind.',
    ],
    permitNote:
      'The City of McKinney requires a building permit for patio covers, issued through Development Services; engineering documentation is commonly requested for larger spans. Structure1 handles drawings, engineering, submission, and inspections on every McKinney project.',
    neighborhoods: ['Craig Ranch', 'Stonebridge Ranch', 'Trinity Falls', 'Adriatica', 'Historic Downtown', 'Eldorado'],
    projectSlugs: ['classic-gable-patio-cover'],
    testimonialIds: [4],
  },
  {
    slug: 'arlington',
    name: 'Arlington',
    heroImage: '/images/hero/cover4.JPG',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete across Arlington, TX. Sitting in the heart of the metroplex between Dallas and Fort Worth, Arlington homeowners get the same crews, the same cedar-and-steel construction, and the same 2-year workmanship warranty we deliver everywhere in DFW.',
      'Arlington\'s established neighborhoods often have larger lots — room for a full outdoor living project: covered patio and stamped concrete extension built as one job on one timeline.',
    ],
    permitNote:
      'The City of Arlington requires a building permit for patio covers and permanent shade structures, with wind-load engineering per North Central Texas building codes. Structure1 handles the complete permit package — drawings, engineering, submission, and inspections.',
    neighborhoods: ['North Arlington', 'Dalworthington Gardens area', 'Southwest Arlington', 'Viridian', 'East Arlington', 'Pantego area'],
    projectSlugs: [],
    testimonialIds: [1],
  },
  {
    slug: 'fort-worth',
    name: 'Fort Worth',
    heroImage: '/images/hero/cover3.JPG',
    intro: [
      'Structure1 Construction builds custom patio covers, pergolas, and stamped concrete throughout Fort Worth, TX — including a recent pergola with polycarbonate roofing, cedar posts, and ceiling fans for a Fort Worth family who wanted year-round outdoor comfort.',
      'From established neighborhoods near the Cultural District to growing communities in far north Fort Worth, our crews build the same way everywhere: Western Red Cedar, steel-anchored footings, and roofing matched to your home.',
    ],
    permitNote:
      'The City of Fort Worth requires a building permit for patio covers, issued through Development Services. Structure1 prepares the drawings, submits the application, and schedules every inspection — permits are included in every Fort Worth project.',
    neighborhoods: ['Tanglewood', 'Fairmount', 'Alliance', 'Keller area', 'Benbrook area', 'West Fort Worth'],
    projectSlugs: ['pergola-with-polycarbonate-fort-worth'],
    testimonialIds: [5],
  },
];

export function getCityFaqItems(city: CityInfo): FaqItem[] {
  return [
    {
      question: `How much does a patio cover cost in ${city.name}, TX?`,
      answer: `Patio covers in ${city.name} typically run $8,000 to $25,000+ depending on size, style, and finishes. A basic lean-to cover starts around $8,000-$12,000, while a custom gable design with a shingled roof matched to your home usually lands between $14,000 and $25,000. Stamped concrete patios run $12-$22 per square foot. Structure1 provides free, itemized on-site estimates anywhere in ${city.name}.`,
    },
    {
      question: `Do I need a permit for a patio cover in ${city.name}?`,
      answer: city.permitNote,
    },
    {
      question: `What services does Structure1 offer in ${city.name}?`,
      answer: `We build custom patio covers (gable, lean-to, and polycarbonate designs), cedar pergolas, and stamped or broom-finish concrete for patios, driveways, and walkways — all engineered for North Texas weather and backed by a 2-year workmanship warranty.`,
    },
    {
      question: `How soon can you start a project in ${city.name}?`,
      answer: `Most projects begin 2-3 weeks after contract signing, which covers permit approval and material procurement. Construction itself takes 3-7 days for most patio covers and 1-2 weeks for larger outdoor living projects. We serve ${city.name} year-round — fall and winter often have the shortest wait times.`,
    },
  ];
}
