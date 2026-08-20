export const MOCK_CATEGORIES = [
  {
    _id: 'cat-1',
    name: 'Audio & Acoustics',
    slug: 'audio-acoustics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'Studio grade wireless headphones, soundbars and acoustic gear.',
    itemCount: 24
  },
  {
    _id: 'cat-2',
    name: 'Wearables & Timepieces',
    slug: 'wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: 'Minimalist smartwatches, sensors and horological timepieces.',
    itemCount: 18
  },
  {
    _id: 'cat-3',
    name: 'Minimalist Tech',
    slug: 'minimalist-tech',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    description: 'CNC aluminum keyboards, workstation peripherals and wireless chargers.',
    itemCount: 32
  },
  {
    _id: 'cat-4',
    name: 'Living & Interiors',
    slug: 'living-interiors',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    description: 'Architectural lamps, ceramic stonewares, and sculptural vessels.',
    itemCount: 15
  },
  {
    _id: 'cat-5',
    name: 'Apparel & Accessories',
    slug: 'apparel-accessories',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=80',
    description: 'Heavyweight organic cotton apparel, leather bags and minimal jackets.',
    itemCount: 29
  }
];

export const MOCK_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'Aether Studio ANC Headphones',
    slug: 'aether-studio-anc-headphones',
    description: 'Immerse yourself in acoustic perfection. The Aether Studio headphones feature precision 40mm titanium drivers, adaptive active noise cancellation, custom ceramic touch controls, and 45 hours of continuous battery playback. Crafted from aircraft-grade aluminum and memory foam ear cushions.',
    shortDescription: 'Active noise cancelling wireless headphones with 45h battery life.',
    brand: 'Aether Acoustic',
    category: 'Audio & Acoustics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&q=80'
    ],
    price: 299,
    originalPrice: 349,
    discount: 14,
    ratings: 4.9,
    reviewCount: 128,
    colors: [
      { name: 'Slate Grey', hex: '#475569' },
      { name: 'Frosted Silver', hex: '#E2E8F0' },
      { name: 'Charcoal Black', hex: '#1E293B' }
    ],
    sizes: ['Standard'],
    specifications: [
      { label: 'Driver Size', value: '40mm Neodymium Titanium' },
      { label: 'Battery Life', value: '45 Hours (ANC On)' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 & 3.5mm Aux' },
      { label: 'Weight', value: '250g' }
    ],
    stock: 35,
    sku: 'ATH-ANC-001',
    tags: ['wireless', 'noise cancelling', 'premium', 'audio'],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false
  },
  {
    _id: 'prod-2',
    name: 'Monolith Watch Series 4 - Titanium Edition',
    slug: 'monolith-watch-series-4',
    description: 'Designed at the intersection of haute horology and modern smart architecture. Features a sapphire glass curved display, lightweight titanium chassis, biometric sensors, 7-day battery life, and 50m water resistance.',
    shortDescription: 'Titanium smart smartwatch with sapphire glass and 7-day battery.',
    brand: 'Monolith',
    category: 'Wearables & Timepieces',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=1000&q=80'
    ],
    price: 449,
    originalPrice: 499,
    discount: 10,
    ratings: 4.8,
    reviewCount: 94,
    colors: [
      { name: 'Natural Titanium', hex: '#94A3B8' },
      { name: 'Space Grey', hex: '#334155' }
    ],
    sizes: ['40mm', '44mm'],
    specifications: [
      { label: 'Case Material', value: 'Grade 5 Titanium' },
      { label: 'Display', value: 'Always-On Retina Sapphire Glass' },
      { label: 'Water Resistance', value: '50 Meters (5 ATM)' }
    ],
    stock: 22,
    sku: 'MON-WTCH-04',
    tags: ['smartwatch', 'titanium', 'wearable', 'luxury'],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: true
  },
  {
    _id: 'prod-3',
    name: 'Nordic Ceramic Ambient Table Lamp',
    slug: 'nordic-ceramic-ambient-lamp',
    description: 'Hand-crafted tactile stoneware base topped with a frosted glass dome. Provides smooth dimmable warm ambient light (2200K - 3000K) with touch-capacitive controls and USB-C wireless charging base.',
    shortDescription: 'Dimmable warm ambient lamp with tactile ceramic stoneware base.',
    brand: 'Kjaer Living',
    category: 'Living & Interiors',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&q=80'
    ],
    price: 189,
    originalPrice: 220,
    discount: 14,
    ratings: 4.7,
    reviewCount: 56,
    colors: [
      { name: 'Off White', hex: '#F8FAFC' },
      { name: 'Sandstone', hex: '#CBD5E1' }
    ],
    sizes: ['Compact', 'Tall'],
    specifications: [
      { label: 'Light Source', value: 'Integrated Dimmable LED' },
      { label: 'Color Temp', value: '2200K - 3000K Warm Light' },
      { label: 'Control', value: 'Touch Capacitive Stepless Dimming' }
    ],
    stock: 18,
    sku: 'KJR-LMP-01',
    tags: ['interior', 'lighting', 'ceramic', 'nordic'],
    isFeatured: true,
    isBestseller: false,
    isNewArrival: true
  },
  {
    _id: 'prod-4',
    name: 'Heavyweight Organic Cotton Relaxed Hoodie',
    slug: 'heavyweight-organic-cotton-hoodie',
    description: 'Cut from 480 GSM GOTS-certified organic French terry cotton. Features a double-layered structured hood, hidden side seam zip pockets, ribbed cuffs, and a boxy minimalist silhouette.',
    shortDescription: '480 GSM luxury organic French terry cotton hoodie.',
    brand: 'Minimalist Studio',
    category: 'Apparel & Accessories',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&q=80'
    ],
    price: 120,
    originalPrice: 150,
    discount: 20,
    ratings: 4.9,
    reviewCount: 210,
    colors: [
      { name: 'Washed Grey', hex: '#64748B' },
      { name: 'Oatmeal', hex: '#E2E8F0' },
      { name: 'Deep Charcoal', hex: '#1E293B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specifications: [
      { label: 'Material', value: '100% GOTS Organic French Terry' },
      { label: 'Fabric Weight', value: '480 GSM Heavyweight' },
      { label: 'Fit', value: 'Relaxed Boxy Fit' }
    ],
    stock: 45,
    sku: 'APP-HDD-09',
    tags: ['apparel', 'hoodie', 'cotton', 'minimalist'],
    isFeatured: false,
    isBestseller: true,
    isNewArrival: false
  },
  {
    _id: 'prod-5',
    name: 'Aether SoundBar Ultra Wireless Speaker',
    slug: 'aether-soundbar-ultra',
    description: 'Architectural wireless soundbar equipped with 6 neodymium drivers and dual passive radiators. AirPlay 2, Spotify Connect, and Bluetooth 5.3 streaming wrapped in acoustic textured fabric.',
    shortDescription: 'Hi-fi spatial soundbar with aluminum chassis and AirPlay 2.',
    brand: 'Aether Acoustic',
    category: 'Audio & Acoustics',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1000&q=80'
    ],
    price: 379,
    originalPrice: 420,
    discount: 9,
    ratings: 4.8,
    reviewCount: 42,
    colors: [
      { name: 'Concrete Grey', hex: '#94A3B8' },
      { name: 'Matte Onyx', hex: '#0F172A' }
    ],
    sizes: ['Standard'],
    specifications: [
      { label: 'Output Power', value: '160W RMS Peak' },
      { label: 'Streaming', value: 'AirPlay 2, Spotify Connect, BT 5.3' }
    ],
    stock: 14,
    sku: 'ATH-SND-02',
    tags: ['speaker', 'audio', 'soundbar', 'home'],
    isFeatured: false,
    isBestseller: false,
    isNewArrival: true
  },
  {
    _id: 'prod-6',
    name: 'Aluminum Mechanical Ergonomic Keyboard',
    slug: 'aluminum-mechanical-keyboard',
    description: 'CNC machined anodized aluminum body with custom lubricated linear switches, hot-swappable PCB, frosted polycarbonate keycaps, wireless 2.4GHz / Bluetooth tri-mode connection.',
    shortDescription: 'Custom CNC aluminum wireless mechanical keyboard.',
    brand: 'Monolith',
    category: 'Minimalist Tech',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1000&q=80'
    ],
    price: 210,
    originalPrice: 240,
    discount: 12,
    ratings: 4.9,
    reviewCount: 88,
    colors: [
      { name: 'Frosted Silver', hex: '#CBD5E1' },
      { name: 'Midnight Charcoal', hex: '#334155' }
    ],
    sizes: ['Compact 75%', 'Full Size'],
    specifications: [
      { label: 'Case', value: '6063 Anodized CNC Aluminum' },
      { label: 'Switches', value: 'Custom Lubricated Linear Smooth' },
      { label: 'Battery', value: '4000mAh (Up to 200 hours)' }
    ],
    stock: 28,
    sku: 'MON-KYB-75',
    tags: ['keyboard', 'tech', 'mechanical', 'aluminum'],
    isFeatured: true,
    isBestseller: true,
    isNewArrival: false
  }
];

export const MOCK_REVIEWS = [
  {
    _id: 'rev-1',
    userName: 'Marcus Vance',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5,
    title: 'Unbelievable acoustic soundstage and build quality',
    comment: 'The noise cancellation is shockingly good and the greyish frosted metallic finish looks even better in person. Fits seamlessly with my desktop setup.',
    verifiedPurchase: true,
    createdAt: '2026-07-14'
  },
  {
    _id: 'rev-2',
    userName: 'Elena Rostova',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    rating: 5,
    title: 'Minimalist perfection',
    comment: 'Zero clutter, extremely responsive touch controls, and ultra comfortable memory foam earcups for 8+ hour coding sessions.',
    verifiedPurchase: true,
    createdAt: '2026-08-02'
  }
];
