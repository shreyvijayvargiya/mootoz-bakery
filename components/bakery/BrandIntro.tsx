'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { BakeryIconStack } from '@/components/bakery/BakeryIconStack'
import { EASE } from '@/components/bakery/theme'
import { BRAND } from '@/lib/bakery-data'

type BrandIntroProps = {
  onDone?: () => void
}

export function BrandIntro({ onDone }: BrandIntroProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduce ? 400 : 3400
    const t = window.setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, total)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--mootoz-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-label={`${BRAND.name} intro`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_40%,color-mix(in_srgb,var(--mootoz-accent)_18%,transparent),transparent_70%)]"
          />

          <div className="relative flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-8 sm:mb-10"
            >
              <BakeryIconStack />
            </motion.div>

            <motion.h1
              className="text-6xl font-extrabold tracking-tight text-[var(--mootoz-accent)] sm:text-8xl md:text-9xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.35, duration: 0.85, ease: EASE }}
            >
              {BRAND.shortName}
            </motion.h1>
            <motion.p
              className="mt-3 text-2xl font-medium tracking-[0.35em] text-[var(--mootoz-text)] uppercase sm:text-3xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
            >
              Bakery
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-[var(--mootoz-accent)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.95, duration: 0.5, ease: EASE }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
