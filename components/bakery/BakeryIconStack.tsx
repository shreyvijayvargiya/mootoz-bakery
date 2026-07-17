'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { EASE } from '@/components/bakery/theme'

const DISHES = [
  {
    src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80',
    alt: 'Fresh bread',
    rotate: -8,
    x: -28,
    y: -26,
    z: 1,
    delay: 0.05,
  },
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80',
    alt: 'Croissant',
    rotate: 10,
    x: 26,
    y: -20,
    z: 2,
    delay: 0.12,
  },
  {
    src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80',
    alt: 'Celebration cake',
    rotate: -6,
    x: -22,
    y: 24,
    z: 3,
    delay: 0.18,
  },
  {
    src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80',
    alt: 'Cream pastry',
    rotate: 8,
    x: 28,
    y: 28,
    z: 4,
    delay: 0.24,
  },
] as const

export function BakeryIconStack({ className }: { className?: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn('mx-auto', className)}
      aria-label="Bakery specialties"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className={cn(
          'relative flex items-center justify-center rounded-[1.75rem] border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] shadow-2xl shadow-black/40',
          hovered ? 'gap-2 px-3 py-3' : 'h-40 w-40 sm:h-48 sm:w-48',
        )}
        animate={{
          boxShadow: hovered
            ? '0 24px 48px -16px rgba(0,0,0,0.5)'
            : [
                '0 20px 40px -16px rgba(0,0,0,0.45)',
                '0 28px 50px -12px rgba(196,165,116,0.25)',
                '0 20px 40px -16px rgba(0,0,0,0.45)',
              ],
        }}
        transition={
          hovered
            ? { duration: 0.1, ease: 'easeOut' }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        layout
      >
        {DISHES.map((dish) => (
          <motion.div
            key={dish.alt}
            layout
            className={cn(
              'overflow-hidden rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-bg)] shadow-lg',
              hovered
                ? 'relative size-14 shrink-0 sm:size-16'
                : 'absolute size-14 sm:size-16',
            )}
            style={{ zIndex: hovered ? 1 : dish.z }}
            initial={{ opacity: 0, scale: 0.45, x: 0, y: 0, rotate: 0 }}
            animate={
              hovered
                ? {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    opacity: 1,
                    scale: [1, 1.06, 1],
                    x: [dish.x, dish.x + 5, dish.x - 3, dish.x],
                    y: [dish.y, dish.y - 10, dish.y + 4, dish.y],
                    rotate: [
                      dish.rotate,
                      dish.rotate + 6,
                      dish.rotate - 4,
                      dish.rotate,
                    ],
                  }
            }
            transition={
              hovered
                ? { duration: 0.1, ease: 'easeOut' }
                : {
                    opacity: { delay: dish.delay, duration: 0.4, ease: EASE },
                    scale: {
                      delay: dish.delay + 0.35,
                      duration: 2.8 + dish.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    x: {
                      delay: dish.delay + 0.35,
                      duration: 3.2 + dish.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    y: {
                      delay: dish.delay + 0.35,
                      duration: 2.9 + dish.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    rotate: {
                      delay: dish.delay + 0.35,
                      duration: 3.6 + dish.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    layout: { duration: 0.1, ease: 'easeOut' },
                  }
            }
          >
            <img
              src={dish.src}
              alt={dish.alt}
              className="size-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
