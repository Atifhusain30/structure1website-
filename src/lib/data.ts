export const services = [
  {
    id: 'patio-covers',
    title: 'Patio Covers',
    shortDescription: 'Custom-designed outdoor living spaces that extend your home\'s comfort.',
    fullDescription: 'Transform your backyard into a stunning outdoor living area with our premium patio cover solutions. We design and build custom structures that provide shade, protection, and style to your outdoor spaces.',
    image: '/images/services/patio-covers.jpg',
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
    image: '/images/services/kitchens.jpg',
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
    image: '/images/services/floors.jpg',
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
    id: 'new-builds',
    title: 'New Builds',
    shortDescription: 'Custom homes and additions built to your exact specifications.',
    fullDescription: 'From ground-up construction to room additions, we bring your vision to life with precision and care. Our full design-build service ensures a seamless experience from concept to completion.',
    image: '/images/services/new-builds.jpg',
    icon: 'building',
    features: [
      'Custom Home Construction',
      'ADUs & Guest Houses',
      'Room Additions',
      'Garage Conversions',
      'Full Design-Build Service',
      'Permit Management'
    ]
  },
  {
    id: 'pools',
    title: 'Pools',
    shortDescription: 'Create your backyard oasis with custom pool construction.',
    fullDescription: 'Dive into luxury with a custom-designed pool that transforms your backyard into a personal paradise. We handle everything from design to construction, including spas, water features, and decking.',
    image: '/images/services/pools.jpg',
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
    image: '/images/projects/pool-1.jpg',
    images: ['/images/projects/pool-1.jpg', '/images/projects/pool-1b.jpg'],
    description: 'Complete backyard transformation featuring a custom pool with water features, modern decking, and integrated lighting for the perfect outdoor entertainment space.',
    featured: true
  },
  {
    id: 2,
    slug: 'contemporary-kitchen-remodel',
    title: 'Contemporary Kitchen Remodel',
    category: 'kitchens',
    location: 'Austin, TX',
    image: '/images/projects/kitchen-1.jpg',
    images: ['/images/projects/kitchen-1.jpg'],
    description: 'A complete kitchen transformation with custom white cabinetry, quartz countertops, and state-of-the-art appliances.',
    featured: true
  },
  {
    id: 3,
    slug: 'elegant-patio-extension',
    title: 'Elegant Patio Extension',
    category: 'patio-covers',
    location: 'Houston, TX',
    image: '/images/projects/patio-1.jpg',
    images: ['/images/projects/patio-1.jpg'],
    description: 'A stunning covered patio with integrated fans, lighting, and outdoor kitchen area for year-round enjoyment.',
    featured: true
  },
  {
    id: 4,
    slug: 'luxury-hardwood-flooring',
    title: 'Luxury Hardwood Flooring',
    category: 'floors',
    location: 'San Antonio, TX',
    image: '/images/projects/floors-1.jpg',
    images: ['/images/projects/floors-1.jpg'],
    description: 'Premium oak hardwood flooring installation throughout a 3,500 sq ft home with custom staining.',
    featured: true
  },
  {
    id: 5,
    slug: 'custom-family-home',
    title: 'Custom Family Home',
    category: 'new-builds',
    location: 'Fort Worth, TX',
    image: '/images/projects/newbuild-1.jpg',
    images: ['/images/projects/newbuild-1.jpg'],
    description: 'A beautiful 4-bedroom custom home built from the ground up with modern amenities and energy-efficient features.',
    featured: true
  },
  {
    id: 6,
    slug: 'resort-style-pool',
    title: 'Resort Style Pool',
    category: 'pools',
    location: 'Plano, TX',
    image: '/images/projects/pool-2.jpg',
    images: ['/images/projects/pool-2.jpg'],
    description: 'An expansive resort-style pool with infinity edge, spa, and natural stone surroundings.',
    featured: false
  },
  {
    id: 7,
    slug: 'modern-open-kitchen',
    title: 'Modern Open Kitchen',
    category: 'kitchens',
    location: 'Irving, TX',
    image: '/images/projects/kitchen-2.jpg',
    images: ['/images/projects/kitchen-2.jpg'],
    description: 'Open-concept kitchen renovation with large island, pendant lighting, and seamless flow to living areas.',
    featured: false
  },
  {
    id: 8,
    slug: 'covered-outdoor-living',
    title: 'Covered Outdoor Living',
    category: 'patio-covers',
    location: 'Frisco, TX',
    image: '/images/projects/patio-2.jpg',
    images: ['/images/projects/patio-2.jpg'],
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
  { value: 15, suffix: '+', label: 'Years Experience' },
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
    facebook: 'https://facebook.com/structure1',
    instagram: 'https://instagram.com/structure1',
    linkedin: 'https://linkedin.com/company/structure1',
  }
};

export const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

