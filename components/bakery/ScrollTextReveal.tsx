'use client'

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useRef } from 'react'

import { BRAND } from '@/lib/bakery-data'

function RevealWord({
  word,
  progress,
  index,
  total,
}: {
  word: string
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const start = index / total
  const end = (index + 0.85) / total
  const opacity = useTransform(progress, [start, end], [0.12, 1])
  const y = useTransform(progress, [start, end], [40, 0])
  const blur = useTransform(progress, [start, end], [8, 0])
  const filter = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block pr-[0.18em]"
    >
      {word}
    </motion.span>
  )
}

export function ScrollTextReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const words = BRAND.name.split(' ')

  return (
    <section
      ref={ref}
      className="relative flex min-h-[140vh] items-center justify-center overflow-hidden bg-[var(--mootoz-bg)]"
      aria-label="Bakery name reveal"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--mootoz-accent) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="sticky top-0 flex h-svh w-full items-center justify-center px-4">
        <h2
          className="max-w-5xl text-center text-5xl font-extrabold tracking-tight text-[var(--mootoz-accent)] sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ fontFamily: '"Fraunces", Georgia, serif' }}
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              <RevealWord
                word={word}
                progress={scrollYProgress}
                index={index}
                total={words.length}
              />
              {index < words.length - 1 ? ' ' : null}
              {index === 0 ? <br className="sm:hidden" /> : null}
            </span>
          ))}
        </h2>
      </div>
    </section>
  )
}
