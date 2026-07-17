'use client'

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react'
import {
  ArrowRight,
  ChevronDown,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { BakeryCraftSection } from '@/components/bakery/BakeryCraftSection'
import { BakeryShell } from '@/components/bakery/BakeryShell'
import { BrandIntro } from '@/components/bakery/BrandIntro'
import { ContactHoverReveal } from '@/components/bakery/ContactHoverReveal'
import { VideoGallerySection } from '@/components/bakery/VideoGallerySection'
import { EASE } from '@/components/bakery/theme'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  BRAND,
  FAQS,
  FEATURES,
  GALLERY_IMAGES,
  LINKS,
  MENU_CATEGORIES,
  NYC_BOUNDS,
  SHOPS,
} from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

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

function shopToMapPercent(lat: number, lng: number) {
  const left =
    ((lng - NYC_BOUNDS.west) / (NYC_BOUNDS.east - NYC_BOUNDS.west)) * 100
  const top =
    ((NYC_BOUNDS.north - lat) / (NYC_BOUNDS.north - NYC_BOUNDS.south)) * 100
  return {
    left: `${Math.min(92, Math.max(8, left))}%`,
    top: `${Math.min(88, Math.max(12, top))}%`,
  }
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
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
            className="mb-3 rounded-full border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] px-3 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-[var(--mootoz-maroon)] uppercase"
          >
            {eyebrow}
          </Badge>
        </motion.div>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-bold tracking-tight text-[var(--mootoz-maroon)] sm:text-4xl"
        style={{ fontFamily: '"Fraunces", Georgia, serif' }}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-3 text-base leading-relaxed text-[var(--mootoz-muted)]"
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
              New York City
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-extrabold tracking-tight text-[var(--mootoz-maroon)] sm:text-6xl md:text-7xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            {BRAND.name}
          </motion.h1>

          <motion.h2
            variants={fadeUp}
            className="mt-3 text-xl font-bold text-[var(--mootoz-text)] sm:text-2xl"
          >
            100% Eggless Bakery in New York
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--mootoz-muted)] sm:text-lg"
          >
            Luxury 100% eggless cakes and confections, thoughtfully crafted with
            superior ingredients — for moments that deserve excellence in the
            city that never sleeps.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[var(--mootoz-accent)] px-7 text-base font-semibold text-[var(--mootoz-bg)] shadow-lg shadow-[var(--mootoz-accent)]/20 hover:brightness-110"
            >
              <Link href="/reservation">
                Order Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-[var(--mootoz-accent)] bg-transparent px-7 text-base font-semibold text-[var(--mootoz-accent)] hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
            >
              <Link href="/menu">Check Menu</Link>
            </Button>
          </motion.div>
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
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
                alt={`Celebration cake from ${BRAND.name}`}
                className="relative z-10 mx-auto w-full rounded-2xl drop-shadow-2xl"
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
              Fresh daily · Three NYC locations
            </Badge>
            <h3
              className="text-2xl font-bold text-[var(--mootoz-maroon)] sm:text-3xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Fresh Cakes, Pastries &amp; Breads
            </h3>
            <p className="mt-2 text-base font-medium text-[var(--mootoz-text)]">
              — Reserve a table or browse the full menu
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--mootoz-muted)]">
              Custom cakes available with advance notice. Visit West Village,
              SoHo, or Upper East Side.
            </p>
            <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
                alt="Croissant"
                className="aspect-square rounded-xl object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80"
                alt="Fresh bread"
                className="aspect-square rounded-xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const MARQUEE_DISHES = MENU_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    category: cat.label,
  })),
)

function DishMarquee() {
  const loop = [...MARQUEE_DISHES, ...MARQUEE_DISHES]

  return (
    <div className="relative left-1/2 mt-12 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden">
      <motion.div
        className="flex w-max gap-4 px-4 will-change-transform"
        initial={{ x: '100%' }}
        animate={{ x: ['100%', '0%', '-50%'] }}
        transition={{
          duration: 70,
          ease: 'linear',
          repeat: Infinity,
          times: [0, 0.12, 1],
        }}
      >
        {loop.map((dish, i) => (
          <div
            key={`${dish.name}-${i}`}
            className="w-[240px] shrink-0 overflow-hidden rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-lg sm:w-[180px]"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="aspect-[9/16] w-full object-cover"
            />
            <div className="px-2.5 py-2">
              <p className="truncate text-xs font-semibold text-[var(--mootoz-text)]">
                {dish.name}
              </p>
              <p className="text-[0.65rem] text-[var(--mootoz-accent)]">
                {dish.price}
              </p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function GallerySection() {
  return (
    <section
      className="scroll-mt-20 overflow-x-clip py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-bg)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Baked for the city"
          description="A glimpse of what comes out of our New York ovens each day."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45, ease: EASE }}
              className="overflow-hidden rounded-2xl border border-[var(--mootoz-border)]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="aspect-[4/3] size-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-[var(--mootoz-accent)] px-8 text-base font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
          >
            <Link href="/menu">
              Menu
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <DishMarquee />
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section id="why-us" className="relative scroll-mt-20">
      <div className="relative overflow-hidden bg-[var(--mootoz-surface)] py-6 text-center">
        <h2
          className="relative text-2xl font-bold tracking-wide text-[var(--mootoz-accent)] sm:text-3xl"
          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        >
          Why Choose Hearth?
        </h2>
      </div>

      <div
        className="relative overflow-hidden py-16 sm:py-20"
        style={{ backgroundColor: 'var(--mootoz-bg)' }}
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8"
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card className="group h-full border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--mootoz-accent)]/40 hover:shadow-lg">
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

function StoresSection() {
  const [activeId, setActiveId] = useState<string>(SHOPS[0].id)
  const activeShop = SHOPS.find((s) => s.id === activeId) ?? SHOPS[0]
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${NYC_BOUNDS.west}%2C${NYC_BOUNDS.south}%2C${NYC_BOUNDS.east}%2C${NYC_BOUNDS.north}&layer=mapnik&marker=${activeShop.lat}%2C${activeShop.lng}`

  return (
    <section
      id="stores"
      className="scroll-mt-20 py-16 sm:py-20"
      style={{ backgroundColor: 'var(--mootoz-bg)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Visit us"
          title="Our Stores in New York"
          description="Find Hearth Bakery across NYC — hover a pin or pick a shop card."
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
                title="Hearth Bakery locations map — New York"
                src={osmEmbed}
                className="absolute inset-0 size-full border-0 grayscale-[30%] contrast-[1.05] invert-[0.85]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
                        <span
                          className={cn(
                            'relative flex size-11 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-white transition-transform',
                            isActive && 'scale-110 ring-[var(--mootoz-accent)]',
                          )}
                          style={{ backgroundColor: shop.accent }}
                        >
                          <Icon className="size-5" />
                        </span>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[var(--mootoz-border)] bg-[var(--mootoz-bg)] px-4 py-3">
              <p className="flex items-center gap-1.5 text-xs text-[var(--mootoz-muted)]">
                <MapPin className="size-3.5 text-[var(--mootoz-maroon)]" />
                New York · {SHOPS.length} locations
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
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, ease: EASE }}
                  onMouseEnter={() => setActiveId(shop.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all',
                    isActive
                      ? 'border-[var(--mootoz-maroon)]/35 bg-[var(--mootoz-surface)] shadow-lg shadow-[var(--mootoz-accent)]/10'
                      : 'border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)]',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(shop.id)}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
                      style={{ backgroundColor: shop.accent }}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[var(--mootoz-maroon)]">
                        {shop.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-[var(--mootoz-muted)]">
                        {shop.area}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--mootoz-muted)]">
                        {shop.address}
                      </p>
                    </div>
                  </button>
                  <a
                    href={shop.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 ml-14 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--mootoz-maroon)] hover:underline"
                  >
                    <Navigation className="size-3.5" />
                    Directions
                    <ExternalLink className="size-3" />
                  </a>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
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
          description="Quick answers about our menu, custom cakes, and reservations."
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
                      ? 'border-[var(--mootoz-maroon)]/30 bg-[var(--mootoz-surface)] shadow-lg'
                      : 'border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] shadow-sm',
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
                        'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
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
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-full',
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
          description="Hover Contact to open our card — or use the details below."
        />

        <div
          className="mb-12 rounded-[2rem] border border-[var(--mootoz-border)] px-4 py-14 sm:px-8 sm:py-16"
          style={{
            background:
              'radial-gradient(ellipse 85% 75% at 25% 100%, color-mix(in srgb, var(--mootoz-accent) 26%, transparent), transparent 55%), var(--mootoz-bg)',
          }}
        >
          <ContactHoverReveal before="Not just a simple" after="button." />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="h-full overflow-hidden border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-[var(--mootoz-maroon)] to-[var(--mootoz-accent)]" />
            <CardContent className="flex h-full flex-col gap-5 p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-[var(--mootoz-maroon)] text-[var(--mootoz-bg)]">
                  <Phone className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[var(--mootoz-muted)] uppercase">
                    Phone
                  </p>
                  <a
                    href={LINKS.phone}
                    className="text-lg font-bold text-[var(--mootoz-maroon)] hover:underline"
                  >
                    +1 (212) 555-0188
                  </a>
                </div>
              </div>
              <Button
                asChild
                className="mt-auto h-12 rounded-2xl bg-[var(--mootoz-accent)] font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
              >
                <Link href="/reservation">Reserve a Table</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="h-full overflow-hidden border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] shadow-md">
            <div className="h-1.5 bg-gradient-to-r from-[var(--mootoz-accent)] to-[var(--mootoz-maroon)]" />
            <CardContent className="flex h-full flex-col gap-5 p-6">
              <div className="flex gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--mootoz-maroon)] text-[var(--mootoz-bg)]">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-[var(--mootoz-muted)] uppercase">
                    Visit Our Bakery
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--mootoz-text)]">
                    148 Bedford Street, West Village, New York, NY 10014
                  </p>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-auto h-12 rounded-2xl border-2 border-[var(--mootoz-maroon)] bg-transparent font-semibold text-[var(--mootoz-maroon)] hover:bg-[var(--mootoz-maroon)] hover:text-[var(--mootoz-bg)]"
              >
                <a href={LINKS.maps} target="_blank" rel="noopener noreferrer">
                  <MapPin className="size-4" />
                  Open in Maps
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <BakeryShell>
      <BrandIntro />
      <main>
        <HeroSection />
        <WhyChooseSection />
        <BakeryCraftSection />
        <GallerySection />
        <VideoGallerySection />
        <StoresSection />
        <FaqSection />
        <ContactSection />
      </main>
    </BakeryShell>
  )
}
