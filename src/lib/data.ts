export const services = [
  {
    id: 'patio-covers',
    title: 'Patio Covers',
    shortDescription: 'Custom-designed outdoor living spaces that extend your home\'s comfort.',
    fullDescription: 'Transform your backyard into a stunning outdoor living area with our premium patio cover solutions. We design and build custom structures that provide shade, protection, and style to your outdoor spaces.',
    image: '/images/hero/cover5.PNG',
    images: [
      '/images/hero/cover1.JPG',
      '/images/hero/cover2.JPG',
      '/images/hero/jeff2.JPG',
      '/images/hero/cover3.JPG',
      '/images/hero/sashi3.JPG',
      '/images/hero/cover4.JPG',
    ],
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
    id: 'concrete',
    title: 'Concrete',
    shortDescription: 'Durable foundations and stunning finishes for patios, driveways, and more.',
    fullDescription: 'From solid foundations to beautiful decorative finishes, our concrete services deliver lasting quality. We specialize in patios, driveways, walkways, and custom concrete work that enhances your property.',
    image: '/images/hero/Concrete1.PNG',
    images: [
      '/images/hero/Concrete1.PNG',
      '/images/hero/concrete2.jpg',
      '/images/hero/concrete3.jpg',
      '/images/hero/Concrete4.jpg',
      '/images/hero/Concrete5.jpg',
      '/images/hero/concrete6.PNG',
    ],
    icon: 'layers',
    features: [
      'Stamped & Decorative Concrete',
      'Driveways & Walkways',
      'Patio Slabs & Extensions',
      'Foundation Work',
      'Concrete Staining & Sealing',
      'Repair & Resurfacing'
    ]
  }
];

export const projects = [
  {
    id: 1,
    slug: 'classic-gable-patio-cover',
    title: 'Classic Gable Patio Cover',
    category: 'patio-covers',
    location: 'Dallas, TX',
    image: '/images/hero/buckfin1.JPG',
    images: ['/images/hero/buckfin1.JPG', '/images/hero/buckfin2.JPG', '/images/hero/buckfin3.JPG'],
    description: 'Beautiful gable-style patio cover with cedar posts, white trusses, and outdoor living furniture for the perfect backyard retreat.',
    featured: true
  },
  {
    id: 3,
    slug: 'lean-to-patio-cover',
    title: 'Lean-To Style Patio Cover',
    category: 'patio-covers',
    location: 'Frisco, TX',
    image: '/images/hero/jeff2.JPG',
    images: ['/images/hero/jeff1.png', '/images/hero/jeff3.JPG', '/images/hero/jeff2.JPG'],
    description: 'Modern lean-to patio cover attached to the existing roofline with dark wood ceiling, recessed lighting, and ceiling fan.',
    featured: true
  },
  {
    id: 5,
    slug: 'pergola-with-polycarbonate',
    title: 'Pergola with Polycarbonate',
    category: 'patio-covers',
    location: 'Plano, TX',
    image: '/images/hero/sashi3.JPG',
    images: ['/images/hero/sashi1.JPG', '/images/hero/sashi2.jpg', '/images/hero/sashi3.JPG', '/images/hero/sashi4.JPG'],
    description: 'Custom pergola with polycarbonate roofing, cedar posts, and integrated ceiling fan for year-round outdoor comfort.',
    featured: true
  },
  {
    id: 7,
    slug: 'pergola-with-back-wall',
    title: 'Pergola with Back Wall',
    category: 'patio-covers',
    location: 'McKinney, TX',
    image: '/images/hero/cover4.JPG',
    images: ['/images/hero/cover4.JPG'],
    description: 'Custom pergola design featuring a protective back wall for added privacy and wind protection.',
    featured: true
  }
];

export const testimonials = [
  {
    id: 1,
    quote: 'Structure1 transformed our backyard into an absolute paradise. The patio cover exceeded every expectation. Professional from start to finish.',
    author: 'Sarah & Michael Johnson',
    project: 'Patio Cover Project',
    location: 'Dallas, TX',
    rating: 5
  },
  {
    id: 2,
    quote: 'Our pergola project was seamless. The team was communicative, clean, and delivered ahead of schedule. We couldn\'t be happier with our new outdoor space.',
    author: 'Jennifer Martinez',
    project: 'Pergola Project',
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
  phone: '(580) 665-2758',
  email: 'samuel.c.w.allison@gmail.com',
  address: '5473 Blair Rd Ste 100 PMB 476653, Dallas, TX 75231-4227',
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


