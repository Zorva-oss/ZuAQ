import { Product, VideoPromotion, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'beosound-horizon',
    name: 'BeoSound Horizon Max Wireless',
    tagline: 'Spatial Audio • Coral Blush edition',
    description: 'Experience studio-master spatial acoustic clarity. Featuring custom beryllium 40mm drivers, adaptive active noise cancellation with transparency mode, and sculpted lambskin memory foam ear cushions for all-day listening bliss.',
    price: 289,
    originalPrice: 349,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 1420,
    category: 'Electronics',
    department: 'Audio & Gadgets',
    tags: ['Audio', 'Wireless', 'ANC', 'Over-Ear', 'Luxury'],
    badge: 'Editor Choice',
    colors: [
      { name: 'Coral Blush', hex: '#F28B82' },
      { name: 'Champagne Gold', hex: '#E6C280' },
      { name: 'Obsidian Black', hex: '#1E293B' },
    ],
    sizes: ['Standard Fit'],
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop',
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Next-gen Spatial Audio with Dynamic Head Tracking',
      '45-Hour Battery Life with 10-minute Rapid Boost',
      'Quad-Beamforming Microphones for Crystal-Clear Calls',
      'Custom EQ App Tuning with ZuAQ Acoustic Profile',
    ],
    specs: {
      'Driver Size': '40mm Beryllium Custom',
      'Frequency Response': '10Hz – 40,000Hz',
      'Bluetooth': 'Bluetooth 5.3 LE Audio / LDAC / AAC',
      'Weight': '265g',
      'Charging': 'USB-C Fast Charging & Qi Wireless Pad',
    },
    isFeatured: true,
  },
  {
    id: 'cloudstrider-runner',
    name: 'CloudStrider V3 Pastel Runner',
    tagline: 'Ultra-cushioned responsive sole',
    description: 'Designed for effortless urban movement and long-distance comfort. The CloudStrider V3 pairs a breathable organic mesh upper with a dual-density bio-foam rebound midsole in an exclusive pastel color-blocked palette.',
    price: 145,
    originalPrice: 170,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 980,
    category: 'Shoes',
    department: 'Modern Footwear',
    tags: ['Footwear', 'Running', 'Pastel', 'Sneakers', 'Streetwear'],
    badge: 'Best Seller',
    colors: [
      { name: 'Pastel Lavender & Mint', hex: '#D8B4E2' },
      { name: 'Desert Oat & Coral', hex: '#F6D2B8' },
      { name: 'Cloud White & Slate', hex: '#E2E8F0' },
    ],
    sizes: ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11'],
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Bio-Responsive Energy Return Midsole',
      'Ortholite® Anti-Microbial Breathable Insole',
      'Reinforced Heel Stabilizer & Grippy Rubber Lug Outsole',
      '100% Recycled Technical Engineered Knit',
    ],
    specs: {
      'Drop': '8mm Heel-to-Toe Drop',
      'Weight': '248g (Men US 9)',
      'Upper Material': 'Engineered Recycled Monofilament Knit',
      'Terrain': 'Road, Gym, Urban Lifestyle',
    },
    isFeatured: true,
  },
  {
    id: 'pulsestream-boom',
    name: 'PulseStream Boom 360',
    tagline: 'IP67 Waterproof • 24hr Playtime',
    description: 'The ultimate all-weather acoustic companion. Pumping 360-degree room-filling audio with dual passive bass radiators, wrapped in a tough ocean-teal fabric that floats in water and withstands dust, drops, and pool parties.',
    price: 119,
    originalPrice: 149,
    discountPercent: 20,
    rating: 5.0,
    reviewCount: 310,
    category: 'Electronics',
    department: 'Audio & Gadgets',
    tags: ['Speaker', 'Bluetooth', 'Waterproof', 'Outdoor', 'Bass'],
    badge: 'New Arrival',
    colors: [
      { name: 'Ocean Teal', hex: '#0D9488' },
      { name: 'Coral Sunrise', hex: '#FB7185' },
      { name: 'Deep Midnight', hex: '#0F172A' },
    ],
    sizes: ['Compact 360'],
    stock: 22,
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop',
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Omnidirectional 360° Sound Wave Dispersion',
      'True Wireless Stereo (TWS) Pairing for Dual Boom Setup',
      'IP67 Submersible Waterproof and Dustproof',
      'Integrated Carabiner Bungee Loop',
    ],
    specs: {
      'Output Power': '32W Peak RMS',
      'Battery Capacity': '7,200mAh (with Reverse Power Bank Output)',
      'Water Rating': 'IP67 Submersible up to 1m for 30 min',
      'Dimensions': '190 x 78 x 78 mm',
    },
    isFeatured: true,
  },
  {
    id: 'apex-chrono',
    name: 'Apex Chrono Titanium Ultra',
    tagline: 'ECG Sensor • Dual GPS tracking',
    description: 'Precision engineering meets rugged exploration. Built with an aerospace-grade titanium chassis, scratch-proof sapphire crystal glass, 2,000 nits daylight display, and multi-band dual-frequency GNSS for millimeter-accurate adventure tracking.',
    price: 420,
    originalPrice: 480,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 2100,
    category: 'Electronics',
    department: 'Smart Wear',
    tags: ['Smartwatch', 'Titanium', 'Health', 'Fitness', 'GPS'],
    badge: 'Trending',
    colors: [
      { name: 'Titanium Orange', hex: '#EA580C' },
      { name: 'Alpine White', hex: '#F1F5F9' },
      { name: 'Tactical Black', hex: '#18181B' },
    ],
    sizes: ['46mm Titanium', '49mm Ultra Pro'],
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
    ],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    videoPoster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    features: [
      'Clinical-grade Optical Heart Rate & ECG Monitor',
      'Dual-Band Multi-Satellite GPS with Offline Waypoint Maps',
      '14-Day Battery in Smart Mode (48hr in Full GPS Tracking)',
      '100M Water Resistance with Scuba Diving Depth Gauge',
    ],
    specs: {
      'Case Material': 'Grade 5 Aerospace Titanium',
      'Display': '1.43” AMOLED Always-on Sapphire',
      'Sensors': 'ECG, SpO2, Barometer, Skin Temp, Accelerometer',
      'Water Resistance': '10 ATM / 100 meters',
    },
    isFeatured: true,
  },
  {
    id: 'retrofilm-camera',
    name: 'RetroFilm X-Compact Mirrorless',
    tagline: '26.1MP APS-C • Analog dial controls',
    description: 'The golden age of analog photography reimagined. Combines physical machined aluminum shutter speed dials, tactile mechanical aperture ring, and 18 film simulation modes that mimic vintage 35mm film grain directly in-camera.',
    price: 899,
    originalPrice: 999,
    discountPercent: 10,
    rating: 5.0,
    reviewCount: 210,
    category: 'Electronics',
    department: 'Audio & Gadgets',
    tags: ['Camera', 'Photography', 'Vintage', 'Retro', 'Mirrorless'],
    badge: 'Sold Out',
    colors: [
      { name: 'Silver Duo-Tone', hex: '#CBD5E1' },
      { name: 'Matte All-Black', hex: '#1E293B' },
    ],
    sizes: ['Body Only', 'With 28mm f/2.8 Prime'],
    stock: 0, // SOLD OUT DEMO
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      '26.1MP X-Trans CMOS Sensor with Zero Low-Pass Filter',
      'Machined Aluminum Analog Shutter & ISO Dials',
      '4K/60p 10-Bit Cinematic Video Recording',
      'Hybrid Optical / OLED Electronic Viewfinder',
    ],
    specs: {
      'Sensor': 'APS-C 26.1 Megapixels',
      'ISO Range': '160 – 12,800 (Extended 80 – 51,200)',
      'Storage': 'UHS-II Dual SD Card Slots',
      'Weight': '440g with Battery and Card',
    },
    isFeatured: true,
  },
  {
    id: 'lumina-lamp',
    name: 'Lumina Ambient Glow Smart Lamp',
    tagline: '16M Colors • Circadian Rhythm Mode',
    description: 'Transform your room atmosphere. Sculpted frosted blown-glass shade with warm candlelight flickering, sunrise alarm wake-up sequence, and ambient music synchronization through the companion ZuAQ smart ecosystem.',
    price: 78,
    originalPrice: 95,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 520,
    category: 'Home & Lifestyle',
    department: 'Home Aesthetics',
    tags: ['Home', 'Lighting', 'Smart Living', 'Design', 'Minimalist'],
    badge: 'Best Seller',
    colors: [
      { name: 'Warm Opal Glass', hex: '#FEF08A' },
      { name: 'Smoked Amber', hex: '#F97316' },
      { name: 'Frosted Glacier', hex: '#E0F2FE' },
    ],
    sizes: ['Standard 28cm'],
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      'Natural Sunset Dimming & Sunrise Wakeup Alarm',
      'Matter & Apple HomeKit / Google Home Compatible',
      'Touch-Sensitive Brass Base with Stepless Dimming',
      'Cordless 10-Hour Lithium Battery with Magnetic Dock',
    ],
    specs: {
      'Brightness': '650 Lumens Adjustable',
      'Color Temp': '1800K (Candlelight) to 6500K (Daylight)',
      'Connectivity': 'Thread, Wi-Fi 6, Bluetooth 5.2',
    },
    isFeatured: false,
  },
  {
    id: 'nomad-sling',
    name: 'Nomad Tech Sling 6L',
    tagline: 'Weatherproof Cordura® • Fidlock® buckle',
    description: 'Compact, streamlined everyday utility. Tailored for your iPad mini, mirrorless camera, power banks, and everyday essentials. Crafted with ballistic waterproof Cordura 500D fabric and self-locking magnetic hardware.',
    price: 89,
    originalPrice: 110,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 430,
    category: 'Bags',
    department: 'Everyday Carry',
    tags: ['Bag', 'Sling', 'Everyday Carry', 'Waterproof', 'Tech'],
    badge: 'Editor Choice',
    colors: [
      { name: 'Stealth Olive', hex: '#4D7C0F' },
      { name: 'Slate Charcoal', hex: '#334155' },
      { name: 'Desert Sand', hex: '#D97706' },
    ],
    sizes: ['6L Compact', '9L Expanded'],
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      'Fidlock® German Magnetic Quick-Release Buckle',
      'Padded Microfiber Tablet Compartment up to 11”',
      'YKK AquaGuard® Weather-Sealed Zippers',
      'Hidden RFID-blocking Passport & AirTag Pocket',
    ],
    specs: {
      'Volume': '6 Liters',
      'Dimensions': '31 x 20 x 10 cm',
      'Weight': '390g',
      'Fabric': 'Recycled 500D Cordura® Ripstop Nylon',
    },
    isFeatured: false,
  },
  {
    id: 'hyperhydro-flask',
    name: 'HyperHydro Vacuum Flask 32oz',
    tagline: 'Cold for 36 hours • Leak-proof flex cap',
    description: 'Engineered for extreme temperature retention. Made from double-walled pro-grade 18/8 food-safe stainless steel with copper lining, maintaining ice-cold water through blazing summer heat or piping hot espresso on mountain peaks.',
    price: 42,
    originalPrice: 50,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 1150,
    category: 'Accessories',
    department: 'Wellness & Fit',
    tags: ['Hydration', 'Flask', 'Eco', 'Gym', 'Travel'],
    badge: 'Best Seller',
    colors: [
      { name: 'Mint Glacier', hex: '#6EE7B7' },
      { name: 'Blush Rose', hex: '#FDA4AF' },
      { name: 'Electric Cyan', hex: '#38BDF8' },
      { name: 'Matte Onyx', hex: '#1F2937' },
    ],
    sizes: ['24oz / 710ml', '32oz / 950ml', '40oz / 1180ml'],
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      'TempShield™ Double Wall Vacuum Insulation',
      'Zero Condensation Sweat-Free Powder Coat',
      'BPA-Free & Phthalate-Free Food-Grade Steel',
      'Lifetime Warranty against Thermal Failure',
    ],
    specs: {
      'Capacity': '32 oz (946 ml)',
      'Mouth Diameter': '2.28 in (Wide Mouth)',
      'Cold Retention': 'Up to 36 hours',
      'Hot Retention': 'Up to 18 hours',
    },
    isFeatured: false,
  },
  {
    id: 'aeroknit-hoodie',
    name: 'AeroKnit Studio Oversized Hoodie',
    tagline: '480gsm heavyweight French terry',
    description: 'The pinnacle of relaxed streetwear silhouette. Custom knit from 100% organic combed cotton with double-layered hood, dropped shoulders, and pre-shrunk pigment dye vintage wash that gets softer with every wash cycle.',
    price: 98,
    originalPrice: 120,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 640,
    category: 'Fashion',
    department: 'Fashion',
    tags: ['Hoodie', 'Streetwear', 'Cotton', 'Apparel', 'Oversized'],
    badge: 'Sold Out',
    colors: [
      { name: 'Washed Oat', hex: '#E7E5E4' },
      { name: 'Vintage Washed Clay', hex: '#FB7185' },
      { name: 'Midnight Charcoal', hex: '#27272A' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 0, // SOLD OUT DEMO
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      'Ultra-Heavy 480 GSM Ring-Spun Cotton',
      'Double-Lined Hood with Zero Drawstrings for Modern Minimalist Look',
      'Kangaroo Pocket with Concealed Phone Sleeve',
      'Pre-Shrunk & Garment Dyed in Los Angeles',
    ],
    specs: {
      'Fit': 'Contemporary Boxy Dropped-Shoulder Fit',
      'Material': '100% GOTS Certified Organic Cotton',
      'Care': 'Machine Wash Cold, Hang Dry',
    },
    isFeatured: false,
  },
  {
    id: 'solace-serum',
    name: 'Aura Silk Radiance Facial Serum',
    tagline: 'Triple Hyaluronic & Niacinamide 10%',
    description: 'Clinically proven skin barrier restoration. Infused with micro-molecular hyaluronic peptides, botanical squalane, and organic green tea polyphenols to deeply quench parched skin and deliver an unmistakable glass-skin glow.',
    price: 64,
    originalPrice: 80,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 780,
    category: 'Beauty',
    department: 'Wellness & Fit',
    tags: ['Skincare', 'Beauty', 'Serum', 'Glow', 'Clean'],
    badge: 'Trending',
    colors: [
      { name: 'Pure Amber Dropper', hex: '#D97706' },
    ],
    sizes: ['30ml / 1.0 fl oz', '50ml Jumbo'],
    stock: 18,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597359-009cf013f412?q=80&w=1000&auto=format&fit=crop',
    ],
    features: [
      'Micro-encapsulated Hyaluronic Acid for 72hr Hydration',
      '10% Niacinamide for Pore Refinement & Tone Correction',
      'Cruelty-Free, Vegan, Fragrance-Free Formula',
      'Dermatologist Tested for Sensitive Skin Types',
    ],
    specs: {
      'Volume': '30ml / 1.0 fl oz',
      'Key Ingredients': 'Niacinamide, Multi-Weight Hyaluronic Acid, Squalane',
      'Origin': 'Formulated in France',
    },
    isFeatured: false,
  },
];

export const DEPARTMENTS = [
  { id: 'Audio & Gadgets', name: 'Audio & Gadgets', count: '840+ Products', icon: 'Headphones', color: 'text-blue-600 bg-blue-50' },
  { id: 'Smart Wear', name: 'Smart Wear', count: '520+ Products', icon: 'Watch', color: 'text-amber-600 bg-amber-50' },
  { id: 'Modern Footwear', name: 'Modern Footwear', count: '1,290+ Products', icon: 'Footprints', color: 'text-rose-600 bg-rose-50' },
  { id: 'Home Aesthetics', name: 'Home Aesthetics', count: '410+ Products', icon: 'Sparkles', color: 'text-cyan-600 bg-cyan-50' },
  { id: 'Everyday Carry', name: 'Everyday Carry', count: '340+ Products', icon: 'Briefcase', color: 'text-amber-700 bg-amber-50' },
  { id: 'Wellness & Fit', name: 'Wellness & Fit', count: '680+ Products', icon: 'HeartPulse', color: 'text-emerald-600 bg-emerald-50' },
];

export const CATEGORIES = [
  'All',
  'Fashion',
  'Bags',
  'Shoes',
  'Electronics',
  'Beauty',
  'Home & Lifestyle',
  'Accessories',
  'New Arrivals',
  'Sale / Discounts',
];

export const VIDEO_PROMOTIONS: VideoPromotion[] = [
  {
    id: 'promo-1',
    title: 'The Sound of Tomorrow',
    subtitle: 'Step into spatial audio perfection with BeoSound Horizon Max',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
    duration: '0:24',
    product: {
      id: 'beosound-horizon',
      name: 'BeoSound Horizon Max',
      price: 289,
      originalPrice: 349,
      discount: '17% OFF',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'promo-2',
    title: 'Move Without Boundaries',
    subtitle: 'Pastel aesthetics meet bio-rebound sole engineering',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    duration: '0:32',
    product: {
      id: 'cloudstrider-runner',
      name: 'CloudStrider V3 Pastel',
      price: 145,
      originalPrice: 170,
      discount: '15% OFF',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    },
  },
  {
    id: 'promo-3',
    title: 'Engineered for Extremes',
    subtitle: 'Apex Chrono Titanium Ultra — Summit to deep ocean',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    duration: '0:18',
    product: {
      id: 'apex-chrono',
      name: 'Apex Chrono Titanium Ultra',
      price: 420,
      originalPrice: 480,
      discount: '13% OFF',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    },
  },
];

export const INITIAL_REVIEWS: Record<string, Review[]> = {
  'beosound-horizon': [
    {
      id: 'rev-1',
      productId: 'beosound-horizon',
      author: 'Marcus Vance',
      rating: 5,
      date: 'September 18, 2026',
      title: 'Soundstage is unbelievable',
      comment: 'The spatial separation on acoustic tracks is astonishing. The lambskin memory foam is like wearing nothing at all even after a 6-hour editing session. Worth every dollar.',
      verifiedPurchase: true,
      helpfulCount: 38,
    },
    {
      id: 'rev-2',
      productId: 'beosound-horizon',
      author: 'Elena Rostova',
      rating: 5,
      date: 'August 30, 2026',
      title: 'The Coral Blush color is stunning in person',
      comment: 'Matched my aesthetic completely. ANC cancels subway noise effortlessly without that annoying ear pressure feeling.',
      verifiedPurchase: true,
      helpfulCount: 22,
    },
  ],
  'cloudstrider-runner': [
    {
      id: 'rev-3',
      productId: 'cloudstrider-runner',
      author: 'Jordan Rivera',
      rating: 5,
      date: 'September 21, 2026',
      title: 'Best daily walkers I have ever owned',
      comment: 'Zero break-in period. Ran 10k right out of the box and had zero hotspots. Plus people constantly ask where I got them.',
      verifiedPurchase: true,
      helpfulCount: 45,
    },
  ],
};

export const MYSQL_SCHEMA_DEFINITION = `-- ========================================================
-- ZuAQ E-COMMERCE DATABASE SCHEMA (MySQL 8.0+)
-- Optimized for Shared Hosting & Dedicated Server Performance
-- ========================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NULL,
    shipping_address TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    icon VARCHAR(50) NULL,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255) NULL,
    description LONGTEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    discount_percent INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    review_count INT DEFAULT 0,
    category_id INT NULL,
    department VARCHAR(100) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    badge VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_stock (stock),
    INDEX idx_price (price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_variations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL,
    color_name VARCHAR(50) NOT NULL,
    color_hex VARCHAR(10) NOT NULL,
    size_option VARCHAR(50) NULL,
    stock INT NOT NULL DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(191) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    tax DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    status ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order_number (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    selected_color VARCHAR(50) NULL,
    selected_size VARCHAR(50) NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user_activity (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    user_id INT NULL,
    event_type ENUM('view_product', 'search', 'add_to_cart', 'wishlist') NOT NULL,
    product_id VARCHAR(64) NULL,
    search_query VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id),
    INDEX idx_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS stock_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    is_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_prod_email (product_id, email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export const PHP_SAMPLE_CODE = `<?php
/**
 * ZuAQ E-Commerce Platform - Product Repository Sample
 * Architecture: PHP 8.1+ with PDO Prepared Statements
 * Suitable for cPanel / Shared Hosting / Apache / Nginx
 */

namespace ZuAQ\\Models;

use PDO;
use Exception;

class ProductRepository {
    private PDO $db;

    public function __construct(PDO $dbConnection) {
        $this->db = $dbConnection;
    }

    /**
     * Fetch all active products with primary image and variation counts
     */
    public function getActiveProducts(string $category = 'All', int $limit = 20): array {
        $sql = "SELECT p.*, 
                       (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) as primary_image,
                       (SELECT COUNT(*) FROM product_variations WHERE product_id = p.id) as variation_count
                FROM products p ";
        
        $params = [];
        if ($category !== 'All') {
            $sql .= " WHERE p.department = :category OR p.category_id IN (SELECT id FROM categories WHERE slug = :catSlug)";
            $params[':category'] = $category;
            $params[':catSlug'] = strtolower(str_replace(' ', '-', $category));
        }

        $sql .= " ORDER BY p.is_featured DESC, p.created_at DESC LIMIT :limit";
        
        $stmt = $this->db->prepare($sql);
        foreach ($params as $k => $v) {
            $stmt->bindValue($k, $v);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Check Stock & Sold Out Status
     */
    public function isSoldOut(string $productId): bool {
        $stmt = $this->db->prepare("SELECT stock FROM products WHERE id = :id");
        $stmt->execute([':id' => $productId]);
        $stock = $stmt->fetchColumn();
        return $stock !== false && (int)$stock <= 0;
    }

    /**
     * Register Sold Out Notification Request
     */
    public function registerStockAlert(string $email, string $productId): bool {
        $stmt = $this->db->prepare("INSERT INTO stock_notifications (email, product_id) VALUES (:email, :pid)");
        return $stmt->execute([':email' => $email, ':pid' => $productId]);
    }
}
?>`;
