export const services = [
  {
    id: 'patio-covers',
    title: 'Patio Covers',
    shortDescription: 'Custom-designed outdoor living spaces that extend your home\'s comfort.',
    fullDescription: 'Transform your backyard into a stunning outdoor living area with our premium patio cover solutions. We design and build custom structures that provide shade, protection, and style to your outdoor spaces.',
    image: '/images/hero/Patio cover home 1.jpg',
    icon: 'sun',
    features: [
      'Attached & Freestanding Structures',
      'Solid & Lattice Designs',
      'Aluminum & Wood Options',
      'Integrated Lighting Systems',
      'Fan & Heater Installation',
      'Custom Color Matching'
    ]
  },
  {
    id: 'kitchens',
    title: 'Kitchens',
    shortDescription: 'Transform the heart of your home with modern, functional designs.',
    fullDescription: 'Create the kitchen of your dreams with our comprehensive renovation services. From custom cabinetry to countertop installation, we handle every detail to deliver a space that combines beauty with functionality.',
    image: '/images/hero/kitchen remodel 1.jpg',
    icon: 'chef-hat',
    features: [
      'Full Kitchen Renovations',
      'Cabinet Refacing & Installation',
      'Countertop Installation',
      'Kitchen Islands',
      'Appliance Installation',
      'Custom Cabinetry'
    ]
  },
  {
    id: 'floors',
    title: 'Floors',
    shortDescription: 'Premium flooring solutions from hardwood to luxury vinyl.',
    fullDescription: 'Elevate your space with beautiful, durable flooring that stands the test of time. Our expert team handles everything from hardwood installation to tile work, ensuring a flawless finish every time.',
    image: '/images/hero/flooring 1.jpg',
    icon: 'layers',
    features: [
      'Hardwood Installation',
      'Tile & Stone Work',
      'Luxury Vinyl Plank',
      'Epoxy Garage Floors',
      'Refinishing Services',
      'Subfloor Repair'
    ]
  },
  {
    id: 'pools',
    title: 'Pools',
    shortDescription: 'Create your backyard oasis with custom pool construction.',
    fullDescription: 'Dive into luxury with a custom-designed pool that transforms your backyard into a personal paradise. We handle everything from design to construction, including spas, water features, and decking.',
    image: '/images/hero/pool 1.jpg',
    icon: 'waves',
    features: [
      'In-Ground Pool Construction',
      'Spas & Hot Tubs',
      'Pool Remodeling',
      'Decking & Coping',
      'Water Features',
      'Equipment Installation'
    ]
  }
];

export const projects = [
  {
    id: 1,
    slug: 'modern-backyard-oasis',
    title: 'Modern Backyard Oasis',
    category: 'pools',
    location: 'Dallas, TX',
    image: '/images/hero/ai pool 2.jpg',
    images: ['/images/hero/AI pool.jpg', '/images/hero/ai pool 2.jpg', '/images/hero/ai pool 3.jpg'],
    description: 'Complete backyard transformation featuring a custom pool with water features, modern decking, and integrated lighting for the perfect outdoor entertainment space.',
    featured: true
  },
  {
    id: 2,
    slug: 'contemporary-kitchen-remodel',
    title: 'Contemporary Kitchen Remodel',
    category: 'kitchens',
    location: 'Austin, TX',
    image: '/images/hero/AI kitchen.jpg',
    images: ['/images/hero/AI kitchen.jpg'],
    description: 'A complete kitchen transformation with custom white cabinetry, quartz countertops, and state-of-the-art appliances.',
    featured: true
  },
  {
    id: 3,
    slug: 'elegant-patio-extension',
    title: 'Elegant Patio Extension',
    category: 'patio-covers',
    location: 'Houston, TX',
    image: '/images/hero/AI patio cover.jpg',
    images: ['/images/hero/AI patio cover.jpg'],
    description: 'A stunning covered patio with integrated fans, lighting, and outdoor kitchen area for year-round enjoyment.',
    featured: true
  },
  {
    id: 4,
    slug: 'luxury-hardwood-flooring',
    title: 'Luxury Hardwood Flooring',
    category: 'floors',
    location: 'San Antonio, TX',
    image: '/images/hero/AI flooring.jpg',
    images: ['/images/hero/AI flooring.jpg'],
    description: 'Premium oak hardwood flooring installation throughout a 3,500 sq ft home with custom staining.',
    featured: true
  },
  {
    id: 6,
    slug: 'resort-style-pool',
    title: 'Resort Style Pool',
    category: 'pools',
    location: 'Plano, TX',
    image: '/images/hero/AI pool project.jpg',
    images: ['/images/hero/AI pool project.jpg'],
    description: 'An expansive resort-style pool with infinity edge, spa, and natural stone surroundings.',
    featured: false
  },
  {
    id: 7,
    slug: 'modern-open-kitchen',
    title: 'Modern Open Kitchen',
    category: 'kitchens',
    location: 'Irving, TX',
    image: '/images/hero/AI open kitchen.jpg',
    images: ['/images/hero/AI open kitchen.jpg'],
    description: 'Open-concept kitchen renovation with large island, pendant lighting, and seamless flow to living areas.',
    featured: false
  },
  {
    id: 8,
    slug: 'covered-outdoor-living',
    title: 'Covered Outdoor Living',
    category: 'patio-covers',
    location: 'Frisco, TX',
    image: '/images/hero/open outdoor living.jpg',
    images: ['/images/hero/open outdoor living.jpg'],
    description: 'Aluminum patio cover with integrated ceiling fans, recessed lighting, and stone column accents.',
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    quote: 'Structure1 transformed our backyard into an absolute paradise. The pool and patio cover exceeded every expectation. Professional from start to finish.',
    author: 'Sarah & Michael Johnson',
    project: 'Pool + Patio Project',
    location: 'Dallas, TX',
    rating: 5
  },
  {
    id: 2,
    quote: 'Our kitchen renovation was seamless. The team was communicative, clean, and delivered ahead of schedule. We couldn\'t be happier with our new space.',
    author: 'Jennifer Martinez',
    project: 'Kitchen Renovation',
    location: 'Austin, TX',
    rating: 5
  },
  {
    id: 3,
    quote: 'From design to completion, Structure1 made building our dream home a reality. Their attention to detail is unmatched in the industry.',
    author: 'Robert & Linda Chen',
    project: 'Custom Home Build',
    location: 'Houston, TX',
    rating: 5
  },
  {
    id: 4,
    quote: 'The flooring installation was flawless. They helped us choose the perfect hardwood and the result is absolutely stunning. Highly recommend!',
    author: 'David Thompson',
    project: 'Hardwood Flooring',
    location: 'San Antonio, TX',
    rating: 5
  }
];

export const stats = [
  { value: 150, suffix: '+', label: 'Projects Completed' },
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' }
];

export const companyInfo = {
  name: 'Structure1 Construction',
  tagline: 'Where Quality Meets Craftsmanship',
  phone: '(555) 123-4567',
  email: 'info@structure1.com',
  address: '123 Construction Ave, Dallas, TX 75201',
  hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61585877196113',
    instagram: 'https://www.instagram.com/structure1builds/',
    linkedin: 'https://linkedin.com/company/structure1',
  }
};

export const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];


