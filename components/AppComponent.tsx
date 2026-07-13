'use client'

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import {
  ArrowRight,
  Cake,
  ChevronDown,
  CircleDollarSign,
  Coffee,
  EggOff,
  ExternalLink,
  Facebook,
  FileText,
  Flame,
  Instagram,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Navigation,
  Phone,
  Search,
  ShieldCheck,
  Store,
  Sun,
  Truck,
  X,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const THEMES = {
  dark: {
    bg: '#12100E',
    surface: '#1A1714',
    elevated: '#221E1A',
    border: '#3A342E',
    accent: '#C4A574',
    accentDeep: '#A8844F',
    text: '#F3EDE5',
    muted: '#9C9388',
    charcoal: '#0A0908',
    navBg: '#0A0908',
    navText: '#F3EDE5',
    navMuted: '#A89F94',
    navBorder: '#3A342E',
    heroFrom: '#2A241C',
    heroMid: '#1A1714',
    heroTo: '#12100E',
  },
  light: {
    bg: '#F6F1EA',
    surface: '#FFFFFF',
    elevated: '#FFFbf7',
    border: '#D9CFC3',
    accent: '#8B6914',
    accentDeep: '#6F5410',
    text: '#1A1512',
    muted: '#6B5B55',
    charcoal: '#1A1512',
    navBg: '#FFFFFF',
    navText: '#1A1512',
    navMuted: '#6B5B55',
    navBorder: '#D9CFC3',
    heroFrom: '#F0E6D8',
    heroMid: '#F6F1EA',
    heroTo: '#F6F1EA',
  },
} as const

const COLORS = {
  bg: THEMES.dark.bg,
  surface: THEMES.dark.surface,
  surfaceElevated: THEMES.dark.elevated,
  border: THEMES.dark.border,
  accent: THEMES.dark.accent,
  accentDeep: THEMES.dark.accentDeep,
  text: THEMES.dark.text,
  textMuted: THEMES.dark.muted,
  charcoal: THEMES.dark.charcoal,
  ink: THEMES.dark.text,
  swiggy: '#FC8019',
  zomato: '#E23744',
  check: '#3D8B5F',
  cream: THEMES.dark.bg,
  creamDeep: THEMES.dark.surface,
  maroon: THEMES.dark.accent,
  maroonDeep: THEMES.dark.accentDeep,
  muted: THEMES.dark.muted,
} as const

const LINKS = {
  swiggy:
    'https://www.swiggy.com/restaurants/mootoz-bakery-gumanpura-talwandi-kota-738328',
  zomato: 'https://www.zomato.com/kota/mootoz-bakery-chawani',
  whatsapp: 'https://wa.me/916367580490',
  phone: 'tel:+916367580490',
  instagram: 'https://www.instagram.com/mootoz_bakery/',
  youtube: 'https://www.youtube.com/@MootozBakery',
  facebook: 'https://www.facebook.com/people/Mootoz-Bakery/61587652551998/',
  x: 'https://x.com/Mootozbakery',
  maps: 'https://www.google.com/maps/search/?api=1&query=Mootoz+Bakery+Platina+Rajat+City+Mall+Kunhari+Kota',
} as const

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Stores', href: '#stores' },
  { label: 'Order', href: '#order' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact Us', href: '#contact' },
] as const

const IG_REELS = [
  {
    id: 'DW1Uc9vEhge',
    embed: 'https://www.instagram.com/reel/DW1Uc9vEhge/embed',
    url: 'https://www.instagram.com/reel/DW1Uc9vEhge/',
    rotate: -8,
    x: '0%',
    y: '8%',
    z: 1,
    scale: 0.88,
  },
  {
    id: 'DZjom--TtO2',
    embed: 'https://www.instagram.com/reel/DZjom--TtO2/embed',
    url: 'https://www.instagram.com/reel/DZjom--TtO2/',
    rotate: 0,
    x: '22%',
    y: '0%',
    z: 3,
    scale: 1,
  },
  {
    id: 'DZaZ4WZznPO',
    embed: 'https://www.instagram.com/reel/DZaZ4WZznPO/embed',
    url: 'https://www.instagram.com/reel/DZaZ4WZznPO/',
    rotate: 8,
    x: '44%',
    y: '8%',
    z: 2,
    scale: 0.88,
  },
] as const

/** Approximate Kota shops (Kunhari flagship + delivery hubs from Swiggy/Zomato) */
const SHOPS = [
  {
    id: 'kunhari',
    name: 'Kunhari Flagship',
    area: 'Platina Rajat City Mall',
    address:
      'Shop No. G-65, Near Aadhaar Seva Kendra, Platina Rajat City Mall, Maharana Pratap Circle, Kunhari, Kota – 324008',
    lat: 25.1688,
    lng: 75.8452,
    icon: Store,
    accent: '#C4A574',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Mootoz+Bakery+Platina+Rajat+City+Mall+Kunhari+Kota',
  },
  {
    id: 'talwandi',
    name: 'Gumanpura · Talwandi',
    area: 'Talwandi',
    address:
      'Gumanpura / Talwandi, Kota — order & pickup via Swiggy hub for this area.',
    lat: 25.1525,
    lng: 75.8565,
    icon: Cake,
    accent: '#D4B896',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Talwandi+Gumanpura+Kota+Rajasthan',
  },
  {
    id: 'chawani',
    name: 'Chawani',
    area: 'Chawani',
    address:
      'Chawani, Kota — available for delivery & discovery on Zomato in this locality.',
    lat: 25.1825,
    lng: 75.8648,
    icon: Coffee,
    accent: '#8B6914',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Chawani+Kota+Rajasthan',
  },
] as const

/** Map bounding box around Kota (west, south, east, north) */
const KOTA_BOUNDS = {
  west: 75.78,
  south: 25.12,
  east: 75.92,
  north: 25.22,
} as const

function shopToMapPercent(lat: number, lng: number) {
  const left =
    ((lng - KOTA_BOUNDS.west) / (KOTA_BOUNDS.east - KOTA_BOUNDS.west)) * 100
  const top =
    ((KOTA_BOUNDS.north - lat) / (KOTA_BOUNDS.north - KOTA_BOUNDS.south)) * 100
  return {
    left: `${Math.min(92, Math.max(8, left))}%`,
    top: `${Math.min(88, Math.max(12, top))}%`,
  }
}

const FEATURES = [
  { title: '100% Eggless Products', icon: EggOff },
  { title: 'Premium Quality Ingredients', icon: Leaf },
  { title: 'Freshly Baked Daily', icon: Flame },
  { title: 'Hygienic Kitchen & Packaging', icon: ShieldCheck },
  { title: 'Affordable Prices', icon: CircleDollarSign },
  { title: 'Fast Delivery via Swiggy & Zomato', icon: Truck },
] as const

const MENU_TABS = [
  {
    id: 'cakes',
    label: 'Cakes',
    items: [
      {
        name: 'Berry Celebration Cake',
        price: '₹699',
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Chocolate Layer Cake',
        price: '₹599',
        image:
          'https://images.unsplash.com/photo-1606890737304-57a1ca8a49ba?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Vanilla Cream Cake',
        price: '₹549',
        image:
          'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Red Velvet Slice',
        price: '₹149',
        image:
          'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'pastries',
    label: 'Pastries',
    items: [
      {
        name: 'Butter Croissant',
        price: '₹79',
        image:
          'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Chocolate Danish',
        price: '₹89',
        image:
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Fruit Tart',
        price: '₹99',
        image:
          'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Cream Puff',
        price: '₹69',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'breads',
    label: 'Breads',
    items: [
      {
        name: 'Artisan Sourdough',
        price: '₹120',
        image:
          'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Garlic Loaf',
        price: '₹90',
        image:
          'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Soft Dinner Rolls',
        price: '₹60',
        image:
          'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Multigrain Bread',
        price: '₹110',
        image:
          'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'cookies',
    label: 'Cookies',
    items: [
      {
        name: 'Choco Chip Cookies',
        price: '₹129',
        image:
          'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Butter Cookies Box',
        price: '₹149',
        image:
          'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Macaron Assortment',
        price: '₹199',
        image:
          'https://images.unsplash.com/photo-1558326567-981665321799?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Biscotti Pack',
        price: '₹159',
        image:
          'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80',
      },
    ],
  },
  {
    id: 'custom',
    label: 'Custom Orders',
    items: [
      {
        name: 'Theme Cake (Custom)',
        price: '₹999+',
        image:
          'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Photo Cake',
        price: '₹849+',
        image:
          'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Designer Cream Cake',
        price: '₹899+',
        image:
          'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Kids Character Cake',
        price: '₹949+',
        image: '/doreomon-cake-image.avif',
      },
    ],
  },
] as const

/** Full printed menu — name + price only (from store menu sheets) */
const FULL_MENU = [
  {
    category: 'Patties',
    items: [
      { name: 'Plain Patties', price: '₹25' },
      { name: 'Paneer Patties', price: '₹35' },
      { name: 'Cheese Patties', price: '₹45' },
      { name: 'Cheese Paneer Patties', price: '₹60' },
      { name: 'Tandoori Patties', price: '₹50' },
      { name: 'Tandoori Paneer Patties', price: '₹60' },
      { name: 'Tandoori Cheese Patties', price: '₹60' },
      { name: 'Chilli Garlic Patties', price: '₹45' },
      { name: 'Chilli Garlic Paneer Patties', price: '₹60' },
      { name: 'Chilli Garlic Cheese Paneer Patties', price: '₹70' },
      { name: 'Mayonnaise Patties', price: '₹50' },
      { name: 'Mayonnaise Cheese Patties', price: '₹60' },
      { name: 'Shezwan Masala Patties', price: '₹50' },
      { name: 'Spice Masala Patties', price: '₹40' },
      { name: 'Tandoori Cheese Paneer Patties', price: '₹70' },
      { name: 'Tandoori Masala Cheese Patties', price: '₹50' },
      { name: 'Paneer Masala Cheese Patties', price: '₹60' },
      { name: 'Thousand Island Patties', price: '₹50' },
      { name: 'Thousand Island Paneer Patties', price: '₹60' },
      { name: 'Thousand Cheese Paneer Patties', price: '₹70' },
      { name: 'Extra Cheese / Topping', price: '₹30' },
    ],
  },
  {
    category: 'Burger',
    items: [
      { name: 'Aloo Tikki Burger', price: '₹50' },
      { name: 'Tandoori Burger', price: '₹60' },
      { name: 'Tandoori Cheese Burger', price: '₹70' },
      { name: 'Paneer Burger', price: '₹80' },
      { name: 'Cheese Burger', price: '₹80' },
      { name: 'Paneer Cheese Burger', price: '₹100' },
      { name: 'Double Cheese Paneer Burger', price: '₹100' },
    ],
  },
  {
    category: 'French Fries',
    items: [
      { name: 'Plain French Fries', price: '₹60' },
      { name: 'Chilli Garlic French Fries', price: '₹80' },
      { name: 'Peri Peri French Fries', price: '₹120' },
    ],
  },
  {
    category: 'Hot Dog',
    items: [
      { name: 'Vegetable Hot Dog', price: '₹50' },
      { name: 'Cheese Hot Dog', price: '₹70' },
      { name: 'Paneer Hot Dog', price: '₹80' },
      { name: 'Paneer Masala Hot Dog', price: '₹80' },
    ],
  },
  {
    category: 'Garlic Bread',
    items: [
      { name: 'Cheese Garlic Bread', price: '₹80' },
      { name: 'Veg. Cheese Garlic Bread', price: '₹100' },
    ],
  },
  {
    category: 'Cold Sandwich',
    items: [
      { name: 'Mayonnaise Sandwich', price: '₹60' },
      { name: 'Punjabi Sandwich', price: '₹60' },
    ],
  },
  {
    category: 'Grill Sandwich',
    items: [
      { name: 'Vegetable Sandwich', price: '₹70' },
      { name: 'Cheese Slice Sandwich', price: '₹80' },
      { name: 'Tandoori Cheese Sandwich', price: '₹80' },
      { name: 'Mayonnaise Cheese Sandwich', price: '₹80' },
      { name: 'Makhani Paneer Sandwich', price: '₹90' },
      { name: 'Peri Peri Sandwich', price: '₹90' },
      { name: 'Tandoori Masala Sandwich', price: '₹90' },
      { name: 'Mayonnaise Cheese Paneer', price: '₹90' },
      { name: 'Green Vegetable Sandwich', price: '₹90' },
      { name: 'Paneer Masala Cheese', price: '₹100' },
      { name: 'Tandoori Cheese Paneer', price: '₹100' },
      { name: 'Chilli Garlic Paneer', price: '₹100' },
      { name: 'Double Cheese Masala', price: '₹120' },
      { name: 'Chilli Garlic Cheese Paneer', price: '₹120' },
      { name: 'Korma Paneer Sandwich', price: '₹120' },
      { name: 'Italian Paneer Sandwich', price: '₹120' },
      { name: "Mooto'z Special Sandwich", price: '₹150' },
      { name: 'Extra Cheese / Topping', price: '₹30' },
    ],
  },
  {
    category: 'Pizza',
    items: [
      { name: 'Mix Veg. Pizza', price: '₹140' },
      { name: 'Onion Cheese Pizza', price: '₹140' },
      { name: 'Capsicum Cheese Pizza', price: '₹140' },
      { name: 'Tomato Capsicum Cheese Pizza', price: '₹140' },
      { name: 'Tomato Cheese Pizza', price: '₹150' },
      { name: 'Onion Capsicum Cheese Pizza', price: '₹150' },
      { name: 'Onion Tomato Cheese Pizza', price: '₹150' },
      { name: 'Tandoori Veg. Pizza', price: '₹150' },
      { name: 'Chilli Garlic Pizza', price: '₹150' },
      { name: 'Mayonnaise Cheese Pizza', price: '₹150' },
      { name: 'Shezwan Pizza', price: '₹150' },
      { name: 'Cheese Pizza', price: '₹160' },
      { name: 'Paneer Pizza', price: '₹160' },
      { name: 'Tandoori Sweet Corn Pizza', price: '₹170' },
      { name: 'Veg. Double Cheese Pizza', price: '₹180' },
      { name: 'Double Decker Pizza', price: '₹180' },
      { name: 'Tikka Pizza', price: '₹180' },
      { name: 'Tandoori Paneer Pizza', price: '₹180' },
      { name: 'Mushroom Pizza', price: '₹180' },
      { name: 'Italian Pizza', price: '₹200' },
      { name: 'Tandoori Paneer Tikka Pizza', price: '₹200' },
      { name: "Mooto'z Special Pizza", price: '₹250' },
      { name: 'Extra Cheese / Topping', price: '₹30' },
    ],
  },
  {
    category: 'Pizza Slice',
    items: [
      { name: 'Tandoori Sweet Corn Pizza (Slice)', price: '₹80' },
      { name: 'Bread Slice Pizza', price: '₹80' },
      { name: 'Paneer Slice Pizza', price: '₹90' },
    ],
  },
  {
    category: 'Maggi',
    items: [
      { name: 'Plain Maggi', price: '₹40' },
      { name: 'Masala Veg. Maggi', price: '₹60' },
      { name: 'Cheese Maggi', price: '₹60' },
      { name: 'Paneer Maggi', price: '₹70' },
      { name: 'Paneer Cheese Maggi', price: '₹90' },
    ],
  },
  {
    category: 'Pasta',
    items: [
      { name: 'White Pasta', price: '₹120' },
      { name: 'Red Pasta', price: '₹100' },
    ],
  },
  {
    category: 'Chinese',
    items: [
      { name: 'Chinese Bhel', price: '₹60' },
      { name: 'Chilli Cheese Potato', price: '₹100' },
      { name: 'Honey Cheese Potato', price: '₹120' },
      { name: 'Veg. Manchurian Dry', price: '₹180' },
      { name: 'Veg. Manchurian Gravy', price: '₹200' },
      { name: 'Paneer Manchurian', price: '₹200' },
      { name: 'Paneer Chilli Dry', price: '₹180' },
      { name: 'Paneer Chilli Gravy', price: '₹200' },
    ],
  },
  {
    category: 'Chowmein',
    items: [
      { name: 'Veg. Chowmein', price: '₹100' },
      { name: 'Cheese Chowmein', price: '₹120' },
      { name: 'Mushroom Chowmein', price: '₹130' },
      { name: 'Paneer Chowmein', price: '₹150' },
      { name: 'Garlic Chowmein', price: '₹150' },
    ],
  },
  {
    category: "Momo's",
    items: [
      { name: "Steam Momo's (4 pcs)", price: '₹60' },
      { name: "Steam Momo's (8 pcs)", price: '₹100' },
      { name: "Fried Momo's", price: '₹120' },
      { name: "Tandoori Momo's", price: '₹120' },
    ],
  },
  {
    category: 'Rice',
    items: [
      { name: 'Fried Rice (Half)', price: '₹60' },
      { name: 'Fried Rice (Full)', price: '₹100' },
      { name: 'Shezwan Rice', price: '₹120' },
      { name: 'Paneer Fried Rice', price: '₹140' },
      { name: 'Manchurian Rice (Dry)', price: '₹140' },
      { name: 'Manchurian Rice (Gravy)', price: '₹170' },
    ],
  },
  {
    category: 'Rolls',
    items: [
      { name: 'Paneer Kathi Roll', price: '₹80' },
      { name: 'Shezwan Roll', price: '₹80' },
      { name: 'Paneer Chilli Roll', price: '₹80' },
      { name: 'Spring Roll', price: '₹100' },
    ],
  },
  {
    category: 'South Indian',
    items: [
      { name: 'Vada Sambhar', price: '₹90' },
      { name: 'Dahi Vada', price: '₹90' },
      { name: 'Idli Sambhar', price: '₹80' },
      { name: 'Idli Dry', price: '₹100' },
      { name: 'Idli Manchurian', price: '₹120' },
      { name: 'Plain Dosa', price: '₹100' },
      { name: 'Paper Plain Dosa', price: '₹110' },
      { name: 'Masala Dosa', price: '₹120' },
      { name: 'Onion Masala Dosa', price: '₹130' },
      { name: 'Butter Masala Dosa', price: '₹140' },
      { name: 'Mysore Plain Butter Dosa', price: '₹120' },
      { name: 'Mysore Masala Dosa', price: '₹140' },
      { name: 'Mysore Onion Masala Dosa', price: '₹140' },
      { name: 'Mysore Butter Dosa', price: '₹160' },
      { name: 'Mysore Paneer Butter Dosa', price: '₹180' },
      { name: 'Spring Roll Dosa', price: '₹180' },
      { name: 'Rawa Plain Dosa', price: '₹100' },
      { name: 'Rawa Garlic Plain Dosa', price: '₹100' },
      { name: 'Rawa Plain Butter Dosa', price: '₹120' },
      { name: 'Rawa Masala Dosa', price: '₹130' },
      { name: 'Rawa Onion Masala Dosa', price: '₹140' },
      { name: 'Rawa Butter Dosa', price: '₹150' },
      { name: 'Rawa Paneer Masala Dosa', price: '₹160' },
      { name: 'South Indian Platter', price: '₹200' },
      { name: "Mooto'z Special Dosa", price: '₹250' },
      { name: 'Plain Uttapam', price: '₹80' },
      { name: 'Mix Uttapam', price: '₹100' },
      { name: 'Tomato Uttapam', price: '₹100' },
      { name: 'Paneer Uttapam', price: '₹130' },
      { name: 'Chilli Tomato Uttapam', price: '₹130' },
      { name: 'Masala Uttapam', price: '₹160' },
      { name: "Mooto'z Special Uttapam", price: '₹180' },
      { name: 'Pav Bhaji', price: '₹100' },
      { name: 'Paneer Pav Bhaji', price: '₹120' },
      { name: 'Butter Pav Bhaji', price: '₹120' },
      { name: 'Extra Pav', price: '₹20' },
    ],
  },
  {
    category: 'Pastry',
    items: [
      { name: 'Pineapple', price: '₹50' },
      { name: 'Black Forest', price: '₹50' },
      { name: 'White Forest', price: '₹50' },
      { name: 'Cassata', price: '₹70' },
      { name: 'Mix Fruit', price: '₹80' },
      { name: 'Red Velvet', price: '₹100' },
      { name: 'Chocolate', price: '₹60' },
      { name: 'Truffle Chocolate', price: '₹80' },
      { name: 'Chocolate Choco Chip', price: '₹80' },
      { name: 'Chocolate Burger', price: '₹80' },
      { name: 'Mini Cake', price: '₹100' },
      { name: 'Doughnut', price: '₹60' },
      { name: 'Jamroll', price: '₹100–150' },
      { name: 'Chocolate Jamroll', price: '₹120–180' },
    ],
  },
  {
    category: "Mooto'z Pudding",
    items: [
      { name: 'Chocolate', price: '₹40' },
      { name: 'Pineapple', price: '₹40' },
      { name: 'Rum Ball', price: '₹40' },
    ],
  },
  {
    category: 'Milk Shake',
    items: [
      { name: 'Banana Shake', price: '₹50 / ₹70 with ice cream' },
      { name: 'Pineapple Shake', price: '₹60 / ₹80 with ice cream' },
      { name: 'Strawberry Shake', price: '₹80 / ₹80 with ice cream' },
      { name: 'Black Currant Shake', price: '₹80 / ₹80 with ice cream' },
      { name: 'Banana Shake (Large)', price: '₹80 / ₹80 with ice cream' },
      { name: 'Mango Shake', price: '₹80 / ₹80 with ice cream' },
    ],
  },
  {
    category: 'Chocolate Magic',
    items: [
      { name: 'Chocolate Shake', price: '₹100' },
      { name: 'Oreo Shake', price: '₹100' },
    ],
  },
] as const

const SPLIT_CARDS = [
  {
    title: 'Celebration Cakes',
    description:
      'Luxury 100% eggless cakes for birthdays, anniversaries, and Kota celebrations.',
    bgColor: 'var(--mootoz-surface)',
    textColor: 'var(--mootoz-text)',
    image: '/brown-cream-cake-image.jpg',
  },
  {
    title: 'Custom Themes',
    description:
      'From Doraemon to designer cream cakes — order custom themes on WhatsApp.',
    bgColor: 'var(--mootoz-elevated)',
    textColor: 'var(--mootoz-accent)',
    image: '/doreomon-cake-image.avif',
  },
  {
    title: 'Fresh Daily Bakes',
    description:
      'Blueberry delights, pastries & treats baked fresh — delivered via Swiggy & Zomato.',
    bgColor: 'var(--mootoz-bg)',
    textColor: 'var(--mootoz-accent)',
    image: '/blueberry-cake-image.avif',
  },
] as const

function bakeryThemeStyle(t: (typeof THEMES)[keyof typeof THEMES]): CSSProperties {
  return {
    '--mootoz-bg': t.bg,
    '--mootoz-surface': t.surface,
    '--mootoz-elevated': t.elevated,
    '--mootoz-border': t.border,
    '--mootoz-cream': t.bg,
    '--mootoz-maroon': t.accent,
    '--mootoz-charcoal': t.charcoal,
    '--mootoz-text': t.text,
    '--mootoz-muted': t.muted,
    '--mootoz-accent': t.accent,
    '--mootoz-nav-bg': t.navBg,
    '--mootoz-nav-text': t.navText,
    '--mootoz-nav-muted': t.navMuted,
    '--mootoz-nav-border': t.navBorder,
    '--mootoz-hero-from': t.heroFrom,
    '--mootoz-hero-mid': t.heroMid,
    '--mootoz-hero-to': t.heroTo,
    /* Override app/shadcn tokens so Card, Button, Badge, Dialog follow bakery theme */
    '--background': t.bg,
    '--foreground': t.text,
    '--card': t.surface,
    '--card-foreground': t.text,
    '--popover': t.surface,
    '--popover-foreground': t.text,
    '--primary': t.accent,
    '--primary-foreground': t.bg,
    '--secondary': t.elevated,
    '--secondary-foreground': t.text,
    '--muted': t.elevated,
    '--muted-foreground': t.muted,
    '--accent': t.elevated,
    '--accent-foreground': t.text,
    '--border': t.border,
    '--input': t.border,
    '--ring': t.accent,
  } as CSSProperties
}

const FAQS = [
  {
    q: "What products are available at Mooto'z Bakery?",
    a: 'We offer luxury 100% eggless cakes, pastries, chocolates, premium fast food, and refreshing shakes — all crafted with superior ingredients in Kota.',
  },
  {
    q: 'How much advance notice is required for custom cakes?',
    a: 'For custom cakes, we recommend placing your order at least 24–48 hours in advance. For large or intricate designs, 2–3 days notice helps us deliver our best.',
  },
  {
    q: 'Do you offer eggless cakes and bakery items?',
    a: "Yes — every product at Mooto'z Bakery is 100% eggless. We specialize in eggless cakes and confections without compromising on taste or texture.",
  },
  {
    q: 'Can I place an order online?',
    a: 'Absolutely. Order for delivery within Kota on Swiggy or Zomato, or chat with us on WhatsApp for online booking and custom cake requests.',
  },
  {
    q: "How can I contact Mooto'z Bakery?",
    a: 'Call or WhatsApp us at +91 6367580490. Visit Shop No. G-65, Near Aadhaar Seva Kendra, Platina Rajat City Mall, Maharana Pratap Circle, Kunhari, Kota, Rajasthan – 324008.',
  },
] as const

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

/** Still-Water mirror text — pure CSS (Chromium/Safari box-reflect) */
const FX_MIRROR_CSS = `
.mootoz-page {
  --ink: currentColor;
  --ink-2: #FF4FD8;
  --ink-3: #4FF8FF;
}
.mootoz-page .fx-mirror {
  font: 600 clamp(2.75rem, 7vw, 4.75rem)/1.1 "JetBrains Mono", monospace;
  letter-spacing: .1em;
  color: var(--ink);
  -webkit-box-reflect: below 2px linear-gradient(transparent 45%, rgba(255, 255, 255, .28));
  animation: fx-mirror 3s ease-in-out infinite;
  display: inline-block;
}
.mootoz-page .fx-mirror > span {
  --i: 0;
}
@keyframes fx-mirror {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .mootoz-page .fx-mirror {
    animation: none;
  }
}
`

function MootozBakeryPage() {
  const [showNav, setShowNav] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const t = THEMES[theme]
  const themeVars = useMemo(() => bakeryThemeStyle(t), [t])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const prevBodyBg = body.style.backgroundColor
    const prevColorScheme = root.style.colorScheme
    const applied = Object.entries(themeVars).filter(
      ([, value]) => typeof value === 'string',
    ) as Array<[string, string]>

    for (const [key, value] of applied) {
      root.style.setProperty(key, value)
    }
    body.style.backgroundColor = t.bg
    root.style.colorScheme = theme
    root.setAttribute('data-mootoz-theme', theme)

    return () => {
      for (const [key] of applied) {
        root.style.removeProperty(key)
      }
      body.style.backgroundColor = prevBodyBg
      root.style.colorScheme = prevColorScheme
      root.removeAttribute('data-mootoz-theme')
    }
  }, [t.bg, theme, themeVars])

  return (
    <div
      className="mootoz-page relative min-h-svh antialiased"
      data-theme={theme}
      style={{
        ...themeVars,
        scrollBehavior: 'smooth',
        backgroundColor: t.bg,
        color: t.text,
        fontFamily: '"Outfit", system-ui, sans-serif',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: FX_MIRROR_CSS }} />
      <BakeryNav
        visible={showNav}
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
      />
      <main>
        <ScrollIntroSection onRevealChange={setShowNav} />
        <HeroSection />
        <WhyChooseSection />
        <MenuSection />
        <StoresSection />
        <OrderSection />
        <FaqSection />
        <ContactSection />
      </main>
      <BakeryFooter />
      <WhatsAppFab />
    </div>
  )
}

function BakeryNav({
  visible,
  theme,
  onToggleTheme,
}: {
  visible: boolean
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}) {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 20)
  })

  useEffect(() => {
    if (!visible) setOpen(false)
  }, [visible])

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1))
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActive(`#${id}`)
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-[var(--mootoz-nav-border)] transition-colors duration-300',
          !visible && 'pointer-events-none',
          scrolled && 'shadow-lg shadow-black/10 backdrop-blur-xl',
        )}
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in srgb, var(--mootoz-nav-bg) 95%, transparent)'
            : 'var(--mootoz-nav-bg)',
        }}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group flex min-w-0 items-center gap-3">
            <motion.div whileHover={{ rotate: -6, scale: 1.05 }}>
              <LogoMark className="size-11 shrink-0 ring-2 ring-[var(--mootoz-accent)]/40 ring-offset-2 ring-offset-[var(--mootoz-nav-bg)]" />
            </motion.div>
            <span className="truncate text-sm font-semibold tracking-wide text-[var(--mootoz-nav-text)] sm:text-base">
              Mooto&apos;z Bakery
              <span className="mt-0.5 hidden text-xs font-normal text-[var(--mootoz-nav-muted)] sm:block">
                100% Eggless · Kota
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-[var(--mootoz-nav-text)]'
                      : 'text-[var(--mootoz-nav-muted)] hover:text-[var(--mootoz-nav-text)]',
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--mootoz-accent)_15%,transparent)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="ml-1 rounded-full p-2.5 text-[var(--mootoz-nav-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_12%,transparent)] hover:text-[var(--mootoz-nav-text)]"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              aria-label={
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
              }
              onClick={onToggleTheme}
              className="rounded-full p-2.5 text-[var(--mootoz-nav-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_12%,transparent)] hover:text-[var(--mootoz-nav-text)]"
            >
              {theme === 'dark' ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
            <Button
              asChild
              size="sm"
              className="ml-2 h-9 rounded-full bg-[var(--mootoz-accent)] px-4 text-xs font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
            >
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                Order Now
              </a>
            </Button>
          </nav>

          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2.5 text-[var(--mootoz-nav-text)]"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              aria-label={
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
              }
              onClick={onToggleTheme}
              className="rounded-full p-2.5 text-[var(--mootoz-nav-text)]"
            >
              {theme === 'dark' ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
            <button
              type="button"
              className="rounded-full p-2.5 text-[var(--mootoz-nav-text)]"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="overflow-hidden border-t border-[var(--mootoz-nav-border)] bg-[var(--mootoz-nav-bg)] lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--mootoz-nav-text)] hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_12%,transparent)]"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <Button
                  asChild
                  className="mt-2 h-11 rounded-xl bg-[var(--mootoz-accent)] font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
                >
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <MessageCircle className="size-4" />
                    Chat for Booking
                  </a>
                </Button>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

const SEARCH_ENTRIES = [
  {
    id: 'menu-cakes',
    group: 'Menu',
    title: 'Cakes',
    description: 'Celebration & custom eggless cakes',
    href: '#menu',
  },
  {
    id: 'menu-chocolates',
    group: 'Menu',
    title: 'Chocolates',
    description: 'Gourmet eggless chocolate treats',
    href: '#menu',
  },
  {
    id: 'menu-fast-food',
    group: 'Menu',
    title: 'Fast Food',
    description: 'Burgers, fries & snacks',
    href: '#menu',
  },
  {
    id: 'menu-shakes',
    group: 'Menu',
    title: 'Shakes',
    description: 'Thick & refreshing shakes',
    href: '#menu',
  },
  {
    id: 'contact-phone',
    group: 'Contact',
    title: 'Phone / WhatsApp',
    description: '+91 6367580490',
    href: LINKS.whatsapp,
    external: true,
  },
  {
    id: 'contact-store',
    group: 'Contact',
    title: 'Visit Our Store',
    description:
      'Shop No. G-65, Platina Rajat City Mall, Kunhari, Kota – 324008',
    href: '#contact',
  },
  {
    id: 'contact-order',
    group: 'Contact',
    title: 'Order Online',
    description: 'Available on Swiggy & Zomato in Kota',
    href: '#order',
  },
  {
    id: 'stores-kota',
    group: 'Contact',
    title: 'Our Stores in Kota',
    description: 'Kunhari · Talwandi · Chawani — map & directions',
    href: '#stores',
  },
  {
    id: 'licence-fssai',
    group: 'Licence',
    title: 'FSSAI Licence',
    description:
      'Food Safety and Standards Authority of India — licensed bakery',
    href: '#footer',
  },
  {
    id: 'legal-privacy',
    group: 'Legal',
    title: 'Privacy Policy',
    description: 'How we handle your information',
    href: '/privacy-policy',
  },
  {
    id: 'legal-terms',
    group: 'Legal',
    title: 'Terms & Conditions',
    description: "Terms of use for Mooto'z Bakery",
    href: '/terms-and-conditions',
  },
] as const

function SearchModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SEARCH_ENTRIES
    return SEARCH_ENTRIES.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q),
    )
  }, [query])

  const groups = useMemo(() => {
    const map = new Map<string, (typeof SEARCH_ENTRIES)[number][]>()
    for (const item of results) {
      const list = map.get(item.group) ?? []
      list.push(item)
      map.set(item.group, list)
    }
    return map
  }, [results])

  const groupIcon = (group: string) => {
    if (group === 'Contact') return <Phone className="size-3.5" />
    if (group === 'Licence') return <ShieldCheck className="size-3.5" />
    if (group === 'Legal') return <FileText className="size-3.5" />
    return <Menu className="size-3.5" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="z-[60] h-full w-full gap-0 overflow-hidden rounded-2xl border-[var(--mootoz-border)] bg-[var(--mootoz-bg)] p-0 shadow-2xl sm:max-w-lg"
        style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
      >
        <DialogHeader className="border-b border-[var(--mootoz-border)] bg-gradient-to-b from-[var(--mootoz-elevated)] to-[var(--mootoz-bg)] px-5 pt-5 pb-4 text-left">
          <DialogTitle className="text-[var(--mootoz-accent)]">
            Search Mooto&apos;z Bakery
          </DialogTitle>
          <DialogDescription className="text-[var(--mootoz-muted)]">
            Find menu items, contacts, licence info, and legal pages.
          </DialogDescription>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[var(--mootoz-accent)]/60" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cakes, contact, FSSAI, terms…"
              className="h-11 rounded-xl border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] pl-10 text-[var(--mootoz-text)] shadow-sm placeholder:text-[var(--mootoz-muted)]/70 focus-visible:ring-[var(--mootoz-accent)]/40"
            />
          </div>
        </DialogHeader>

        <div className="max-h-[50vh] overflow-y-auto px-2 py-3 sm:max-h-[55vh]">
          {results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-[var(--mootoz-muted)]">
              No matches for &ldquo;{query}&rdquo;
            </p>
          ) : (
            Array.from(groups.entries()).map(([group, items]) => (
              <div key={group} className="mb-3">
                <p className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--mootoz-accent)]/80 uppercase">
                  {groupIcon(group)}
                  {group}
                </p>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        {...('external' in item && item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        onClick={() => onOpenChange(false)}
                        className="group block rounded-xl px-3 py-2.5 transition-all hover:bg-[var(--mootoz-elevated)] hover:shadow-sm"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[var(--mootoz-text)]">
                            {item.title}
                          </span>
                          <ArrowRight className="size-3.5 text-[var(--mootoz-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                        </span>
                        <span className="mt-0.5 block text-xs leading-snug text-[var(--mootoz-muted)]">
                          {item.description}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/motooz-logo.png"
      alt="Mooto'z Bakery logo"
      className={cn('rounded-full object-cover shadow-md', className)}
    />
  )
}

function ScrollIntroSection({
  onRevealChange,
}: {
  onRevealChange: (revealed: boolean) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    onRevealChange(v >= 0.7)
  })

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative h-[400vh] w-full bg-[var(--mootoz-bg)]"
      aria-label="Scroll introduction"
    >
      <ScrollSplitCard scrollYProgress={scrollYProgress} cards={[...SPLIT_CARDS]} />
    </section>
  )
}

function ScrollSplitCard({
  scrollYProgress,
  cards,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  cards: Array<{
    title: string
    description: string
    bgColor: string
    textColor: string
    image: string
    icon?: ReactNode
  }>
}) {
  const leftX = useTransform(scrollYProgress, [0.28, 0.55], [0, -48])
  const rightX = useTransform(scrollYProgress, [0.28, 0.55], [0, 48])
  const scale = useTransform(scrollYProgress, [0.25, 0.5], [0.94, 1])
  const gap = useTransform(scrollYProgress, [0.28, 0.55], [0, 14])
  // Fully hidden until user scrolls into the intro
  const cardsOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.28, 0.4],
    [0, 0, 0.35, 1],
  )
  const cardsVisibility = useTransform(scrollYProgress, (v) =>
    v < 0.22 ? 'hidden' : 'visible',
  )
  const cardsY = useTransform(scrollYProgress, [0.65, 1], [0, -80])
  const rotateZLeft = useTransform(scrollYProgress, [0.3, 0.55], [0, -4])
  const rotateZRight = useTransform(scrollYProgress, [0.3, 0.55], [0, 4])
  const borderRadius = useTransform(scrollYProgress, [0.25, 0.4], ['12px', '20px'])
  const borderOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 0.25])
  const shadowOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 0.45])
  const boxShadow = useMotionTemplate`inset 0 1px 1px rgba(255, 255, 255, ${borderOpacity}), inset 0 -24px 48px rgba(0, 0, 0, ${shadowOpacity}), 0 25px 50px -12px rgba(0, 0, 0, ${shadowOpacity})`
  const tagOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const tagY = useTransform(scrollYProgress, [0.55, 0.75], [24, 0])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.28], [1, 1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.28], [0, -36])
  const heroScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.94])
  const heroPointerEvents = useTransform(scrollYProgress, (v) =>
    v > 0.24 ? 'none' : 'auto',
  )

  return (
    <div className="sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden [perspective:1400px]">
      {/* Centered intro: scroll cue, brand, CTAs — cards stay hidden behind */}
      <motion.div
        className="absolute inset-x-0 z-20 flex flex-col items-center px-4 text-center"
        style={{
          opacity: heroOpacity,
          y: heroY,
          scale: heroScale,
          pointerEvents: heroPointerEvents,
        }}
      >
        <a
          href="#menu"
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase transition"
          onClick={(e) => {
            e.preventDefault()
            window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
          }}
        >
          Scroll down
        </a>
        <div
          className="fx-mirror"
          style={
            {
              '--ink': 'var(--mootoz-accent)',
              '--ink-2': '#FF4FD8',
              '--ink-3': '#4FF8FF',
            } as CSSProperties
          }
        >
          {"Mooto'z Bakery".split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as CSSProperties}>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#order"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--mootoz-accent)] px-6 text-sm font-semibold text-[var(--mootoz-bg)] shadow-md shadow-[var(--mootoz-accent)]/25 transition hover:brightness-110"
          >
            Order Online
          </a>
          <a
            href="#menu"
            className="inline-flex h-11 items-center justify-center rounded-full border-2 border-[var(--mootoz-accent)] bg-transparent px-6 text-sm font-semibold text-[var(--mootoz-accent)] transition hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
          >
            Check Menu
          </a>
        </div>
      </motion.div>

      {/* Split cards — only after scroll; text only, no images */}
      

      <motion.div
        className="absolute right-0 bottom-[10%] left-0 z-10 text-center"
        style={{ opacity: tagOpacity, y: tagY }}
      >
        <p
          className="text-2xl font-medium tracking-tight text-[var(--mootoz-accent)] italic sm:text-3xl"
          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        >
          100% eggless · Fresh in Kota
        </p>
      </motion.div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light,
}: {
  eyebrow?: string
  title: string
  description?: string
  light?: boolean
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
    >
      {eyebrow ? (
        <motion.div variants={fadeUp}>
          <Badge
            variant="outline"
            className={cn(
              'mb-3 rounded-full border-[var(--mootoz-border)] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] uppercase',
              light
                ? 'bg-[var(--mootoz-surface)] text-[var(--mootoz-text)]'
                : 'bg-[var(--mootoz-elevated)] text-[var(--mootoz-maroon)]',
            )}
          >
            {eyebrow}
          </Badge>
        </motion.div>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className={cn(
          'text-3xl font-bold tracking-tight sm:text-4xl',
          light ? 'text-[var(--mootoz-text)]' : 'text-[var(--mootoz-maroon)]',
        )}
        style={{ fontFamily: '"Fraunces", Georgia, serif' }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            'mt-3 text-base leading-relaxed',
            light ? 'text-[var(--mootoz-muted)]' : 'text-[var(--mootoz-muted)]',
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}

function HeroSection() {
  const { scrollY } = useScroll()
  const cakeY = useTransform(scrollY, [0, 420], [0, 48])
  const cakeScale = useTransform(scrollY, [0, 420], [1, 0.96])

  return (
    <section
      id="home"
      className="relative overflow-hidden scroll-mt-20 pt-28 pb-20 sm:pt-32 sm:pb-24"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% -5%, var(--mootoz-hero-from) 0%, var(--mootoz-hero-mid) 35%, var(--mootoz-hero-to) 70%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%238B1E1E\' fill-opacity=\'0.035\'%3E%3Ccircle cx=\'6\' cy=\'6\' r=\'1.5\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--mootoz-accent)_18%,transparent),transparent_70%)]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-5 rounded-full border-0 bg-[color-mix(in_srgb,var(--mootoz-maroon)_12%,transparent)] px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.16em] text-[var(--mootoz-maroon)] uppercase shadow-none">
              Kota, Rajasthan
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold tracking-tight text-[var(--mootoz-maroon)] sm:text-6xl md:text-7xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Mooto&apos;z Bakery
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-xl font-bold text-[var(--mootoz-text)] sm:text-2xl"
          >
            100% Eggless Bakery in Kota
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--mootoz-muted)] sm:text-lg"
          >
            Mooto&apos;z Bakery offers luxury 100% eggless cakes and
            confections, thoughtfully crafted with superior ingredients, along
            with premium fast food and refreshing shakes for moments that
            deserve excellence.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-14 lg:text-left">
          <motion.div
            style={{ y: cakeY, scale: cakeScale }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[var(--mootoz-accent)]/20 via-[var(--mootoz-accent)]/15 to-transparent blur-3xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="/bakery-image.webp"
                alt="Chocolate berry celebration cake from Mooto'z Bakery"
                className="relative z-10 mx-auto w-full drop-shadow-2xl rounded-2xl"
                style={{
                  maskImage:
                    'radial-gradient(ellipse 72% 78% at 50% 50%, black 52%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 72% 78% at 50% 50%, black 52%, transparent 100%)',
                }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
            className="flex flex-col items-center lg:items-start"
          >
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-[var(--mootoz-maroon)]/20 bg-[var(--mootoz-elevated)] px-3 py-1 text-xs font-medium text-[var(--mootoz-maroon)]"
            >
              Fresh daily · Delivery in Kota
            </Badge>
            <h3
              className="text-2xl font-bold text-[var(--mootoz-maroon)] sm:text-3xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Fresh Cakes, Pastries &amp; Snacks
            </h3>
            <p className="mt-2 text-base font-medium text-[var(--mootoz-text)]">
              — Order Online via Swiggy &amp; Zomato
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mootoz-muted)]">
              Delivery across Kota. Custom cakes available — message us to
              book.
            </p>

            <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:max-w-none">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1"
              >
                <Button
                  asChild
                  size="lg"
                  className="h-12 w-full rounded-2xl bg-[var(--mootoz-maroon)] text-base font-semibold text-[var(--mootoz-bg)] shadow-lg shadow-[var(--mootoz-accent)]/25 hover:brightness-110"
                >
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Chat for Online Booking
                  </a>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-2xl border-2 border-[var(--mootoz-maroon)] bg-transparent px-6 text-base font-semibold text-[var(--mootoz-maroon)] shadow-none hover:bg-[var(--mootoz-maroon)] hover:text-[var(--mootoz-bg)] sm:w-auto"
                >
                  <a href="#order">
                    Order Online
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section id="why-us" className="relative scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, scaleX: 0.92 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative overflow-hidden bg-[var(--mootoz-surface)] py-6 text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(110deg, transparent 40%, color-mix(in srgb, var(--mootoz-accent) 25%, transparent) 50%, transparent 60%)',
          }}
        />
        <h2
          className="relative text-2xl font-bold tracking-wide text-[var(--mootoz-accent)] sm:text-3xl"
          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        >
          Why Choose Mootoz Bakery?
        </h2>
      </motion.div>

      <div
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ backgroundColor: 'var(--mootoz-bg)' }}
      >
        <div className="relative mx-auto flex max-w-6xl justify-center px-4 sm:px-6 lg:px-8">
          <InstagramReelsStack />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto mt-16 grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card className="group h-full border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--mootoz-accent)]/40 hover:shadow-lg">
                  <CardContent className="flex items-start gap-3.5 p-5">
                    <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] text-[var(--mootoz-accent)] transition-transform group-hover:scale-110">
                      <Icon className="size-5 stroke-[2]" />
                    </span>
                    <span className="pt-2 text-sm font-semibold text-[var(--mootoz-text)] sm:text-[0.95rem]">
                      {feature.title}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function InstagramReelsStack() {
  const [active, setActive] = useState(1)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative mx-auto w-full max-w-4xl text-center"
    >
      <div className="mb-5">
      
        <p className="text-sm text-[var(--mootoz-muted)]">
          Watch our latest bakes — tap a reel to bring it forward.
        </p>
      </div>

      <div className="relative mx-auto h-[640px] w-full max-w-[720px] sm:h-[720px] sm:max-w-[820px]">
        <div
          aria-hidden
          className="absolute inset-8 rounded-full bg-gradient-to-br from-[var(--mootoz-accent)]/20 via-transparent to-transparent blur-2xl"
        />
        {IG_REELS.map((reel, index) => (
          <motion.div
            key={reel.id}
            role="button"
            tabIndex={0}
            onClick={() => setActive(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActive(index)
              }
            }}
            onMouseEnter={() => setActive(index)}
            className="absolute origin-bottom cursor-pointer outline-none"
            style={{
              left: reel.x,
              top: reel.y,
              zIndex: active === index ? 20 : reel.z,
            }}
            initial={{ opacity: 0, y: 30, rotate: reel.rotate }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
              rotate: active === index ? 0 : reel.rotate,
              scale: active === index ? 1.04 : reel.scale,
              y: active === index ? -8 : 0,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            aria-label={`Show Instagram reel ${index + 1}`}
          >
            <ReelEmbed
              embedSrc={reel.embed}
              href={reel.url}
              featured={active === index}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {IG_REELS.map((reel, index) => (
          <button
            key={reel.id}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              'size-2.5 rounded-full transition-all',
              active === index
                ? 'w-6 bg-[var(--mootoz-accent)]'
                : 'bg-[color-mix(in_srgb,var(--mootoz-accent)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_45%,transparent)]',
            )}
            aria-label={`Show reel ${index + 1}`}
          />
        ))}
      </div>

      <motion.a
        href={LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="group relative mt-8 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#E1306C]/30"
        style={{
          background:
            'linear-gradient(135deg, #833AB4 0%, #C13584 28%, #E1306C 55%, #F77737 78%, #FCAF45 100%)',
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, #FCAF45 0%, #F77737 25%, #E1306C 50%, #C13584 75%, #833AB4 100%)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[220%] group-hover:opacity-100"
        />
        <Instagram className="relative size-5" />
        <span className="relative tracking-wide">Follow on Instagram</span>
        <ExternalLink className="relative size-3.5 opacity-80" />
      </motion.a>
    </motion.div>
  )
}

function ReelEmbed({
  embedSrc,
  href,
  featured,
}: {
  embedSrc: string
  href: string
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'relative w-[320px] overflow-hidden rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-xl transition-shadow sm:w-[360px]',
        featured
          ? 'shadow-[var(--mootoz-accent)]/35 ring-2 ring-[var(--mootoz-accent)]/50'
          : 'shadow-black/20',
      )}
    >
      <div className="h-[560px] w-full overflow-hidden sm:h-[620px]">
        <iframe
          title="Mooto'z Bakery Instagram Reel"
          src={embedSrc}
          className="h-full w-full border-0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute right-2 bottom-2 z-10 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[0.6rem] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[var(--mootoz-maroon)]"
      >
        <Instagram className="size-3" />
        Open
        <ExternalLink className="size-2.5" />
      </a>
    </div>
  )
}

function StoresSection() {
  const [activeId, setActiveId] = useState<string>(SHOPS[0].id)
  const activeShop = SHOPS.find((s) => s.id === activeId) ?? SHOPS[0]

  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${KOTA_BOUNDS.west}%2C${KOTA_BOUNDS.south}%2C${KOTA_BOUNDS.east}%2C${KOTA_BOUNDS.north}&layer=mapnik&marker=${activeShop.lat}%2C${activeShop.lng}`

  return (
    <section
      id="stores"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-bg)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit us"
          title="Our Stores in Kota"
          description="Find Mooto'z Bakery across Kota — hover a pin or pick a shop card."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-xl"
          >
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
              <iframe
                title="Mooto'z Bakery locations map — Kota, Rajasthan"
                src={osmEmbed}
                className="absolute inset-0 size-full border-0 grayscale-[20%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Custom hover markers over the map */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--mootoz-bg)]/40 via-transparent to-transparent" />
              <div className="absolute inset-0">
                {SHOPS.map((shop) => {
                  const pos = shopToMapPercent(shop.lat, shop.lng)
                  const Icon = shop.icon
                  const isActive = activeId === shop.id
                  return (
                    <div
                      key={shop.id}
                      className="absolute -translate-x-1/2 -translate-y-full"
                      style={{ left: pos.left, top: pos.top }}
                    >
                      <motion.button
                        type="button"
                        onMouseEnter={() => setActiveId(shop.id)}
                        onFocus={() => setActiveId(shop.id)}
                        onClick={() => setActiveId(shop.id)}
                        className="group relative pointer-events-auto"
                        whileHover={{ scale: 1.12 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={shop.name}
                      >
                        <motion.span
                          className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
                          style={{ backgroundColor: shop.accent }}
                          animate={
                            isActive
                              ? { scale: [1, 1.8, 1], opacity: [0.35, 0, 0.35] }
                              : { scale: 1, opacity: 0 }
                          }
                          transition={{
                            duration: 1.8,
                            repeat: isActive ? Infinity : 0,
                          }}
                        />
                        <span
                          className={cn(
                            'relative flex size-11 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white transition-transform',
                            isActive && 'scale-110 ring-[var(--mootoz-accent)]',
                          )}
                          style={{ backgroundColor: shop.accent }}
                        >
                          <Icon className="size-5" />
                        </span>
                        <AnimatePresence>
                          {isActive ? (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.95 }}
                              className="absolute bottom-[calc(100%+10px)] left-1/2 z-10 w-48 -translate-x-1/2 rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] p-3 text-left shadow-xl"
                            >
                              <p className="text-xs font-bold text-[var(--mootoz-maroon)]">
                                {shop.name}
                              </p>
                              <p className="mt-0.5 text-[0.65rem] text-[var(--mootoz-muted)]">
                                {shop.area}
                              </p>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--mootoz-border)] bg-[var(--mootoz-bg)] px-4 py-3">
              <p className="flex items-center gap-1.5 text-xs text-[var(--mootoz-muted)]">
                <MapPin className="size-3.5 text-[var(--mootoz-maroon)]" />
                Kota, Rajasthan · {SHOPS.length} locations
              </p>
              <a
                href={`https://www.openstreetmap.org/#map=13/${activeShop.lat}/${activeShop.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[var(--mootoz-maroon)] hover:underline"
              >
                Open full map
              </a>
            </div>
          </motion.div>

          <div className="flex flex-col gap-3">
            {SHOPS.map((shop, i) => {
              const Icon = shop.icon
              const isActive = activeId === shop.id
              return (
                <motion.button
                  key={shop.id}
                  type="button"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: EASE }}
                  onMouseEnter={() => setActiveId(shop.id)}
                  onClick={() => setActiveId(shop.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all',
                    isActive
                      ? 'border-[var(--mootoz-maroon)]/35 bg-[var(--mootoz-surface)] shadow-lg shadow-[var(--mootoz-accent)]/10'
                      : 'border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] hover:bg-[var(--mootoz-elevated)]',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
                      style={{ backgroundColor: shop.accent }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[var(--mootoz-maroon)]">
                          {shop.name}
                        </h3>
                        {isActive ? (
                          <Badge className="rounded-full border-0 bg-[color-mix(in_srgb,var(--mootoz-maroon)_12%,transparent)] px-2 py-0 text-[0.6rem] text-[var(--mootoz-maroon)] shadow-none">
                            Active
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-xs font-medium text-[var(--mootoz-muted)]">
                        {shop.area}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--mootoz-muted)]">
                        {shop.address}
                      </p>
                      <a
                        href={shop.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--mootoz-maroon)] hover:underline"
                      >
                        <Navigation className="size-3.5" />
                        Directions
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState<(typeof MENU_TABS)[number]['id']>(
    MENU_TABS[0].id,
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const active = MENU_TABS.find((t) => t.id === activeTab) ?? MENU_TABS[0]

  return (
    <section
      id="menu"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-bg)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Explore"
          title="Our Menu"
          description="Browse cakes, pastries, breads & custom orders — all 100% eggless."
        />

        <div className="mb-8 flex items-center gap-2">
          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {MENU_TABS.map((tab) => {
              const isActive = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'shrink-0 rounded-md px-4 py-2 text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)] shadow-md shadow-[var(--mootoz-accent)]/20'
                      : 'bg-transparent text-[var(--mootoz-text)]/70 hover:text-[var(--mootoz-maroon)]',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMenuOpen(true)}
            className="ml-auto shrink-0 rounded-full border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] px-4 text-xs font-semibold text-[var(--mootoz-accent)] hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)] sm:text-sm"
          >
            <FileText className="size-3.5" />
            View all
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.items.map((item, i) => (
            <motion.a
              key={`${active.id}-${item.name}`}
              href="#order"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="group w-[200px] shrink-0 sm:w-[220px]"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-base font-semibold text-[var(--mootoz-text)]">
                {item.name}
              </h3>
              <p className="mt-0.5 text-sm text-[var(--mootoz-muted)]">
                {item.price}
              </p>
            </motion.a>
          ))}
        </div>
      </div>

      <FullMenuModal open={menuOpen} onOpenChange={setMenuOpen} />
    </section>
  )
}

function menuCategoryId(category: string) {
  return `menu-cat-${category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`
}

function FullMenuModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const listRef = useRef<HTMLDivElement>(null)

  const scrollToCategory = (category: string) => {
    const el = listRef.current?.querySelector(`#${menuCategoryId(category)}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="z-[60] flex max-h-[90vh] w-[calc(100%-1.5rem)] max-w-2xl flex-col gap-0 overflow-hidden rounded-2xl border-[var(--mootoz-border)] bg-[var(--mootoz-bg)] p-0 shadow-2xl"
        style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
      >
        <DialogHeader className="shrink-0 border-b border-[var(--mootoz-border)] bg-gradient-to-b from-[var(--mootoz-elevated)] to-[var(--mootoz-bg)] bg-opacity/50 px-5 pt-5 pb-4 text-left sm:px-6">
          <DialogTitle
            className="text-xl text-[var(--mootoz-accent)] sm:text-2xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Full Menu &amp; Prices
          </DialogTitle>
          <DialogDescription className="text-[var(--mootoz-muted)]">
            Name and price from our store menu — all 100% eggless.
          </DialogDescription>
          <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FULL_MENU.map((section) => (
              <button
                key={section.category}
                type="button"
                className="shrink-0 rounded-full border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] px-3 py-1 text-[0.7rem] font-semibold text-[var(--mootoz-text)] transition-colors hover:border-[var(--mootoz-accent)] hover:text-[var(--mootoz-accent)]"
                onClick={() => scrollToCategory(section.category)}
              >
                {section.category}
              </button>
            ))}
          </div>
        </DialogHeader>

        <div
          ref={listRef}
          className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6"
        >
          <div className="space-y-8">
            {FULL_MENU.map((section) => (
              <section
                key={section.category}
                id={menuCategoryId(section.category)}
                className="scroll-mt-3"
              >
                <h3
                  className="mb-3 border-b border-[var(--mootoz-border)] pb-2 text-sm font-bold tracking-[0.14em] text-[var(--mootoz-accent)] uppercase"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  {section.category}
                </h3>
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="text-[0.65rem] tracking-wider text-[var(--mootoz-muted)] uppercase">
                      <th className="pb-2 font-semibold">Item</th>
                      <th className="pb-2 text-right font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.items.map((item) => (
                      <tr
                        key={`${section.category}-${item.name}-${item.price}`}
                        className="border-t border-[var(--mootoz-border)]/70"
                      >
                        <td className="py-2.5 pr-3 font-medium text-[var(--mootoz-text)]">
                          {item.name}
                        </td>
                        <td className="py-2.5 text-right whitespace-nowrap font-semibold text-[var(--mootoz-accent)]">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] px-5 py-3 sm:px-6">
          <p className="text-center text-xs text-[var(--mootoz-muted)]">
            Prices may vary · Order via WhatsApp, Swiggy or Zomato
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function OrderSection() {
  return (
    <section
      id="order"
      className="relative scroll-mt-20 overflow-hidden py-16 sm:py-20"
      style={{
        background:
          'linear-gradient(180deg, var(--mootoz-surface) 0%, var(--mootoz-bg) 55%, var(--mootoz-surface) 100%)',
      }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Delivery in Kota"
          title="Order Online Easily"
          description="Get your favorite cakes, fast food & shakes delivered to your doorstep in Kota."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <OrderCard
            href={LINKS.swiggy}
            bg={COLORS.swiggy}
            label="Swiggy"
            image="/cake-image.avif"
            sub="Special Discounts Available"
            delay={0}
          />
          <OrderCard
            href={LINKS.zomato}
            bg={COLORS.zomato}
            label="Zomato"
            image="/blueberry-cake-image.avif"
            sub="Limited-Time Offers"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  )
}

function OrderCard({
  href,
  bg,
  label,
  image,
  sub,
  delay,
}: {
  href: string
  bg: string
  label: string
  image: string
  sub: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group flex flex-col"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-3xl border border-[var(--mootoz-border)]/80 bg-[var(--mootoz-surface)] shadow-xl transition-shadow group-hover:shadow-2xl"
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={`${label} order cake`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div
          className="relative flex h-10 items-center justify-center overflow-hidden sm:h-11"
          style={{ backgroundColor: bg }}
          aria-label={label}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.7 }}
          />
        </div>
      </a>
      <p className="mt-4 text-sm font-medium text-[var(--mootoz-text)]">{sub}</p>
      <motion.div whileTap={{ scale: 0.98 }} className="mt-3">
        <Button
          asChild
          className="h-12 w-full rounded-2xl text-base font-semibold text-white shadow-md hover:brightness-95"
          style={{ backgroundColor: bg }}
        >
          <a href={href} target="_blank" rel="noopener noreferrer">
            Order Now
            <ArrowRight className="size-4" />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-bg)' }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Help"
          title="Frequently Asked Questions"
          description="Quick answers about our menu, custom cakes, and ordering."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, ease: EASE }}
              >
                <Card
                  className={cn(
                    'overflow-hidden border transition-all duration-300',
                    isOpen
                      ? 'border-[var(--mootoz-maroon)]/30 bg-[var(--mootoz-surface)] shadow-lg shadow-[var(--mootoz-accent)]/8'
                      : 'border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] shadow-sm hover:bg-[var(--mootoz-elevated)]',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                        isOpen
                          ? 'bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)]'
                          : 'bg-[var(--mootoz-surface)] text-[var(--mootoz-accent)]',
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-bold text-[var(--mootoz-text)] sm:text-base">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full transition-colors',
                        isOpen
                          ? 'bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)]'
                          : 'bg-[var(--mootoz-surface)] text-[var(--mootoz-accent)]',
                      )}
                    >
                      <ChevronDown className="size-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6">
                          <Separator className="mb-4 bg-[var(--mootoz-border)]" />
                          <p className="pl-12 text-sm leading-relaxed text-[var(--mootoz-muted)]">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-surface)' }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact Us"
          description="Call, WhatsApp, or visit our Kunhari store in Kota."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ ease: EASE }}
          >
            <Card className="h-full overflow-hidden border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-md">
              <div className="h-1.5 bg-gradient-to-r from-[var(--mootoz-maroon)] to-[var(--mootoz-accent)]" />
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--mootoz-maroon)] text-[var(--mootoz-bg)] shadow-lg shadow-[var(--mootoz-accent)]/25">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wide text-[var(--mootoz-muted)] uppercase">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={LINKS.whatsapp}
                      className="text-lg font-bold text-[var(--mootoz-maroon)] hover:underline"
                    >
                      +91 6367580490
                    </a>
                  </div>
                </div>
                <Button
                  asChild
                  className="mt-auto h-12 rounded-2xl bg-[#25D366] font-semibold text-white shadow-md shadow-green-700/20 hover:bg-[#1ebe57]"
                >
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.06, ease: EASE }}
          >
            <Card className="h-full overflow-hidden border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-md">
              <div className="h-1.5 bg-gradient-to-r from-[var(--mootoz-accent)] to-[var(--mootoz-maroon)]" />
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div className="flex gap-3">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--mootoz-maroon)] text-[var(--mootoz-bg)] shadow-lg shadow-[var(--mootoz-accent)]/25">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-medium tracking-wide text-[var(--mootoz-muted)] uppercase">
                      Visit Our Bakery Store
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--mootoz-text)]">
                      Shop No. G-65, Mooto&apos;z Bakery, Near Aadhaar Seva
                      Kendra, Platina Rajat City Mall, Maharana Pratap Circle,
                      Kunhari, Kota, Rajasthan – 324008
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="mt-auto h-12 rounded-2xl border-2 border-[var(--mootoz-maroon)] bg-transparent font-semibold text-[var(--mootoz-maroon)] hover:bg-[var(--mootoz-maroon)] hover:text-[var(--mootoz-bg)]"
                >
                  <a
                    href={LINKS.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="size-4" />
                    Open in Maps
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BakeryFooter() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-[var(--mootoz-nav-border)]"
      style={{ backgroundColor: 'var(--mootoz-nav-bg)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--mootoz-accent)]/60 to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <LogoMark className="size-24 ring-2 ring-[var(--mootoz-accent)]/35" />
          <p
            className="text-center text-base font-semibold text-[var(--mootoz-nav-text)] sm:text-left"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Mooto&apos;z Bakery
          </p>
          <p className="text-center text-xs text-[var(--mootoz-nav-muted)] sm:text-left">
            Bakers &amp; Cafe · 100% Eggless
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Legal
          </p>
          <Link
            href="/privacy-policy"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Licence
          </p>
          <FssaiBadge />
          <p className="text-xs text-[var(--mootoz-nav-muted)]">
            FSSAI Licensed · India
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Follow us
          </p>
          <div className="flex items-center gap-2.5">
            <SocialIcon href={LINKS.facebook} label="Facebook">
              <Facebook className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.instagram} label="Instagram">
              <Instagram className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.youtube} label="YouTube">
              <Youtube className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.x} label="X">
              <XIcon />
            </SocialIcon>
          </div>
          <a
            href={LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            +91 6367580490
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--mootoz-nav-border)] py-4 text-center text-xs text-[var(--mootoz-nav-muted)]">
        © {new Date().getFullYear()} Mootoz Bakery. All Rights Reserved. ·
        mootozbakery.com
      </div>
    </footer>
  )
}

function WhatsAppFab() {
  return (
    <motion.a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 sm:right-7 sm:bottom-7"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <MessageCircle className="relative size-6" />
    </motion.a>
  )
}

function FssaiBadge() {
  return (
    <div
      className="flex h-16 w-28 flex-col items-center justify-center rounded-xl border-2 border-[#5DADE2] bg-[var(--mootoz-surface)] px-2 shadow-md"
      aria-label="FSSAI licensed"
    >
      <span className="text-[0.7rem] font-black tracking-wider text-[#1B4F72]">
        fssai
      </span>
      <span className="mt-0.5 text-[0.5rem] leading-tight text-[#1B4F72]/80">
        Licensed
      </span>
    </div>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex size-10 items-center justify-center rounded-full border border-[var(--mootoz-nav-border)] bg-[var(--mootoz-elevated)] text-[var(--mootoz-nav-text)] transition-colors hover:border-[var(--mootoz-accent)]/50 hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
    >
      {children}
    </motion.a>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.66L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

export default function AppComponent() {
  return <MootozBakeryPage />
}

