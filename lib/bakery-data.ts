import {
  Cake,
  Coffee,
  EggOff,
  Flame,
  Leaf,
  ShieldCheck,
  Store,
  CircleDollarSign,
  Wheat,
} from 'lucide-react'

export const BRAND = {
  name: 'Hearth Bakery',
  shortName: 'Hearth',
  tagline: '100% Eggless · New York',
  city: 'New York',
  phoneDisplay: '+1 (212) 555-0188',
  phoneHref: 'tel:+12125550188',
  email: 'hello@hearthbakery.nyc',
  website: 'www.hearthbakery.nyc',
} as const

export const LINKS = {
  phone: BRAND.phoneHref,
  email: `mailto:${BRAND.email}`,
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
  facebook: 'https://www.facebook.com/',
  x: 'https://x.com/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Hearth+Bakery+West+Village+New+York',
} as const

/** Slim primary nav — CTA covers Reserve */
export const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Stores', href: '/#stores' },
  { label: 'Contact', href: '/contact' },
] as const

export const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    alt: 'Fresh artisan bread loaves',
  },
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
    alt: 'Golden butter croissants',
  },
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    alt: 'Berry celebration cake',
  },
  {
    src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    alt: 'Cream pastries display',
  },
  {
    src: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80',
    alt: 'Baker kneading dough',
  },
  {
    src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    alt: 'Chocolate chip cookies',
  },
] as const

export const SHOPS = [
  {
    id: 'west-village',
    name: 'West Village Flagship',
    area: 'West Village',
    address:
      '148 Bedford Street, West Village, New York, NY 10014',
    lat: 40.7359,
    lng: -74.0031,
    icon: Store,
    accent: '#C4A574',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=148+Bedford+Street+West+Village+New+York',
  },
  {
    id: 'soho',
    name: 'SoHo Atelier',
    area: 'SoHo',
    address: '62 Prince Street, SoHo, New York, NY 10012',
    lat: 40.7233,
    lng: -73.9987,
    icon: Cake,
    accent: '#D4B896',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=62+Prince+Street+SoHo+New+York',
  },
  {
    id: 'ues',
    name: 'Upper East Side',
    area: 'Upper East Side',
    address: '1185 Madison Avenue, New York, NY 10128',
    lat: 40.7736,
    lng: -73.9566,
    icon: Coffee,
    accent: '#A8844F',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=1185+Madison+Avenue+New+York',
  },
] as const

/** Map bounding box around Manhattan bakery locations */
export const NYC_BOUNDS = {
  west: -74.05,
  south: 40.70,
  east: -73.90,
  north: 40.82,
} as const

export const FEATURES = [
  { title: '100% Eggless Products', icon: EggOff },
  { title: 'Premium Quality Ingredients', icon: Leaf },
  { title: 'Freshly Baked Daily', icon: Flame },
  { title: 'Hygienic Kitchen & Packaging', icon: ShieldCheck },
  { title: 'Artisan Flour & Techniques', icon: Wheat },
  { title: 'Thoughtful Pricing', icon: CircleDollarSign },
] as const

export const MENU_CATEGORIES = [
  {
    id: 'cakes',
    label: 'Cakes',
    items: [
      {
        name: 'Berry Celebration Cake',
        price: '$68',
        description: 'Layers of vanilla sponge, fresh berries, and chantilly cream.',
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chocolate Layer Cake',
        price: '$62',
        description: 'Dark cocoa sponge with ganache and gold leaf finish.',
        image:
          'https://images.unsplash.com/photo-1606890737304-57a1ca8a49ba?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Vanilla Cream Cake',
        price: '$58',
        description: 'Classic Madagascar vanilla with silky buttercream.',
        image:
          'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Red Velvet Slice',
        price: '$12',
        description: 'Cocoa-kissed crumb with cream cheese frosting.',
        image:
          'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'pastries',
    label: 'Pastries',
    items: [
      {
        name: 'Butter Croissant',
        price: '$6',
        description: '72-layer laminated dough, baked golden each morning.',
        image:
          'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Chocolate Danish',
        price: '$7',
        description: 'Flaky pastry filled with Valrhona chocolate.',
        image:
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Fruit Tart',
        price: '$9',
        description: 'Seasonal fruit over almond cream and shortcrust.',
        image:
          'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Cream Puff',
        price: '$5',
        description: 'Light choux shells with vanilla pastry cream.',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'breads',
    label: 'Breads',
    items: [
      {
        name: 'Artisan Sourdough',
        price: '$11',
        description: 'Naturally leavened loaf with open crumb.',
        image:
          'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Garlic Loaf',
        price: '$9',
        description: 'Herb butter brushed and baked to order.',
        image:
          'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Soft Dinner Rolls',
        price: '$8',
        description: 'Half-dozen milk rolls, warm and pillowy.',
        image:
          'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Multigrain Bread',
        price: '$10',
        description: 'Seeded loaf with oats, flax, and sunflower.',
        image:
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    items: [
      {
        name: 'Choco Chip Cookies',
        price: '$14',
        description: 'Box of six — crisp edges, molten centers.',
        image:
          'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Butter Cookies Box',
        price: '$16',
        description: 'Shortbread assortment tied with ribbon.',
        image:
          'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Macaron Assortment',
        price: '$22',
        description: 'Six French macarons in seasonal flavors.',
        image:
          'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Biscotti Pack',
        price: '$15',
        description: 'Twice-baked almond biscotti for coffee.',
        image:
          'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'custom',
    label: 'Custom Orders',
    items: [
      {
        name: 'Theme Cake (Custom)',
        price: '$95+',
        description: 'Designed with you — celebrations, brands, moments.',
        image:
          'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Photo Cake',
        price: '$85+',
        description: 'Edible print on eggless sponge of your choice.',
        image:
          'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Designer Cream Cake',
        price: '$90+',
        description: 'Hand-piped florals and sculptural cream work.',
        image:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
      },
      {
        name: 'Wedding Tier Cake',
        price: '$180+',
        description: 'Multi-tier eggless wedding cakes, tasting available.',
        image:
          'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
] as const

export const FAQS = [
  {
    q: 'What products are available at Hearth Bakery?',
    a: 'We offer luxury 100% eggless cakes, pastries, breads, cookies, and custom celebration cakes — crafted daily in our New York kitchens.',
  },
  {
    q: 'How much advance notice is required for custom cakes?',
    a: 'For custom cakes, we recommend placing your order at least 48–72 hours in advance. For large or intricate designs, 5–7 days notice helps us deliver our best.',
  },
  {
    q: 'Do you offer eggless cakes and bakery items?',
    a: 'Yes — every product at Hearth Bakery is 100% eggless. We specialize in eggless cakes and confections without compromising on taste or texture.',
  },
  {
    q: 'Can I reserve a table?',
    a: 'Absolutely. Use our Reservation page to book a table at any of our New York locations. We recommend booking ahead for weekends.',
  },
  {
    q: 'How can I contact Hearth Bakery?',
    a: 'Call us at +1 (212) 555-0188 or visit our West Village flagship at 148 Bedford Street, New York, NY 10014.',
  },
] as const

export const RESERVATION_LOCATIONS = [
  'West Village Flagship',
  'SoHo Atelier',
  'Upper East Side',
] as const
