'use client'

import { motion } from 'motion/react'
import { useRef, type RefObject } from 'react'

import { KitchenBackdrop } from '@/components/bakery/KitchenBackdrop'
import { EASE } from '@/components/bakery/theme'

type FloatItem = {
  id: string
  src: string
  alt: string
  x: string
  y: string
  w: string
  rotate: number
  delay: number
  z: number
}

const FLOATING: FloatItem[] = [
  {
    id: 'bread',
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
    alt: 'Fresh baked bread',
    x: '4%',
    y: '10%',
    w: 'w-28 sm:w-36',
    rotate: -8,
    delay: 0,
    z: 4,
  },
  {
    id: 'croissant',
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80',
    alt: 'Butter croissant',
    x: '72%',
    y: '6%',
    w: 'w-32 sm:w-40',
    rotate: 10,
    delay: 0.08,
    z: 5,
  },
  {
    id: 'cake',
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80',
    alt: 'Celebration cake',
    x: '8%',
    y: '58%',
    w: 'w-36 sm:w-44',
    rotate: 4,
    delay: 0.16,
    z: 6,
  },
  {
    id: 'cookies',
    src: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=500&q=80',
    alt: 'Cookies',
    x: '70%',
    y: '55%',
    w: 'w-28 sm:w-36',
    rotate: -6,
    delay: 0.22,
    z: 5,
  },
  {
    id: 'tart',
    src: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=500&q=80',
    alt: 'Fruit tart',
    x: '38%',
    y: '4%',
    w: 'w-24 sm:w-32',
    rotate: -12,
    delay: 0.1,
    z: 3,
  },
  {
    id: 'donuts',
    src: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80',
    alt: 'Assorted donuts',
    x: '58%',
    y: '32%',
    w: 'w-24 sm:w-28',
    rotate: 14,
    delay: 0.18,
    z: 7,
  },
  {
    id: 'macarons',
    src: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=500&q=80',
    alt: 'Colorful macarons',
    x: '22%',
    y: '34%',
    w: 'w-24 sm:w-28',
    rotate: -14,
    delay: 0.14,
    z: 4,
  },
  {
    id: 'cinnamon',
    src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=500&q=80',
    alt: 'Cinnamon rolls',
    x: '78%',
    y: '72%',
    w: 'w-28 sm:w-32',
    rotate: 7,
    delay: 0.28,
    z: 4,
  },
]

function DraggableBake({
  item,
  constraintsRef,
}: {
  item: FloatItem
  constraintsRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragMomentum
      dragElastic={0.18}
      dragTransition={{ bounceStiffness: 280, bounceDamping: 22 }}
      whileDrag={{ scale: 1.08, zIndex: 40, cursor: 'grabbing' }}
      whileHover={{ scale: 1.04 }}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: item.delay, duration: 0.55, ease: EASE }}
      className={`absolute cursor-grab touch-none ${item.w}`}
      style={{ left: item.x, top: item.y, zIndex: item.z }}
      aria-label={`${item.alt} — drag to move`}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [item.rotate, item.rotate + 2.5, item.rotate],
        }}
        transition={{
          duration: 4.5 + item.delay * 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative overflow-hidden rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)]"
        style={{
          boxShadow:
            '0 18px 40px -12px color-mix(in srgb, var(--mootoz-charcoal) 45%, transparent), 0 8px 16px -8px color-mix(in srgb, var(--mootoz-accent) 35%, transparent), inset 0 1px 0 color-mix(in srgb, white 18%, transparent)',
        }}
      >
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="pointer-events-none aspect-square w-full select-none object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10"
        />
      </motion.div>
    </motion.div>
  )
}

export function BakeryCraftSection() {
  const constraintsRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="craft"
      className="relative overflow-hidden scroll-mt-20 py-20 sm:py-28"
      style={{ backgroundColor: 'var(--mootoz-surface)' }}
    >
      <KitchenBackdrop />

      <div className="relative mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase">
            From our kitchen
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-[var(--mootoz-accent)] sm:text-4xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Baked with patience, plated with care
          </h2>
          <p className="mt-3 text-base text-[var(--mootoz-muted)]">
            Drag the bakes around — flour, fire, and finish in motion across our
            New York kitchens.
          </p>
        </div>

        <div
          ref={constraintsRef}
          className="relative mx-auto h-[480px] w-full overflow-hidden rounded-3xl border border-[var(--mootoz-border)] bg-[color-mix(in_srgb,var(--mootoz-bg)_55%,var(--mootoz-surface))] sm:h-[560px]"
          style={{
            boxShadow:
              'inset 0 1px 0 color-mix(in srgb, white 8%, transparent), 0 24px 60px -24px color-mix(in srgb, var(--mootoz-charcoal) 40%, transparent)',
          }}
        >
          {/* Inner soft vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,transparent_35%,color-mix(in_srgb,var(--mootoz-bg)_55%,transparent)_100%)]"
          />

          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute z-[2] size-1.5 rounded-full bg-[var(--mootoz-accent)]/50"
              style={{
                left: `${8 + ((i * 7) % 84)}%`,
                top: `${12 + ((i * 11) % 70)}%`,
              }}
              animate={{
                y: [0, -18 - (i % 5) * 4, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.25, 0.8],
              }}
              transition={{
                duration: 3.2 + (i % 4) * 0.4,
                repeat: Infinity,
                delay: i * 0.18,
                ease: 'easeInOut',
              }}
            />
          ))}

          <motion.div
            aria-hidden
            className="absolute top-1/2 left-1/2 z-[2] size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--mootoz-accent)_40%,transparent),transparent_70%)] sm:size-64"
            animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.12}
            whileDrag={{ scale: 1.04, zIndex: 40, cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="absolute top-1/2 left-1/2 z-10 w-[min(58%,240px)] -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none text-center sm:w-64"
          >
            <div
              className="overflow-hidden rounded-3xl border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)]"
              style={{
                boxShadow:
                  '0 28px 50px -16px color-mix(in srgb, var(--mootoz-charcoal) 50%, transparent), 0 12px 24px -10px color-mix(in srgb, var(--mootoz-accent) 40%, transparent), inset 0 1px 0 color-mix(in srgb, white 20%, transparent)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=700&q=80"
                alt="Baker preparing dough in the kitchen"
                draggable={false}
                className="pointer-events-none aspect-[4/5] w-full select-none object-cover"
              />
            </div>
            <p
              className="mt-3 text-sm font-medium tracking-wide text-[var(--mootoz-accent)]"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Daily bake · Dawn to dusk
            </p>
          </motion.div>

          {FLOATING.map((item) => (
            <DraggableBake
              key={item.id}
              item={item}
              constraintsRef={constraintsRef}
            />
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[var(--mootoz-muted)]">
          Tip: grab any photo and drag it around the kitchen board
        </p>
      </div>
    </section>
  )
}
