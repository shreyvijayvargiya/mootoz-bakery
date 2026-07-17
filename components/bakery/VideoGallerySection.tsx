'use client'

import { AnimatePresence, motion } from 'motion/react'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  Volume2,
  VolumeX,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { EASE } from '@/components/bakery/theme'
import { LINKS } from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

export type ReelItem = {
  id: string
  title: string
  platform: 'youtube' | 'instagram'
  /** Poster / cover image */
  poster: string
  /** Embed URL when active (YouTube shorts / IG reel embed) */
  embed?: string
  /** External watch URL */
  href: string
}

export const BAKERY_REELS: ReelItem[] = [
  {
    id: 'yt-1',
    title: 'Morning croissant bake',
    platform: 'youtube',
    poster:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    embed: 'https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=1&playsinline=1&loop=1',
    href: 'https://www.youtube.com/shorts/',
  },
  {
    id: 'ig-1',
    title: 'Berry cake reveal',
    platform: 'instagram',
    poster:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    href: LINKS.instagram,
  },
  {
    id: 'yt-2',
    title: 'Sourdough crumb shot',
    platform: 'youtube',
    poster:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    embed: 'https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&mute=1&playsinline=1',
    href: 'https://www.youtube.com/shorts/',
  },
  {
    id: 'ig-2',
    title: 'Macaron rainbow',
    platform: 'instagram',
    poster:
      'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=600&q=80',
    href: LINKS.instagram,
  },
  {
    id: 'yt-3',
    title: 'Laminated dough folds',
    platform: 'youtube',
    poster:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    embed: 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&playsinline=1',
    href: 'https://www.youtube.com/shorts/',
  },
]

function ReelCard({
  reel,
  offset,
  active,
  muted,
  onToggleMute,
}: {
  reel: ReelItem
  offset: number
  active: boolean
  muted: boolean
  onToggleMute: () => void
}) {
  const abs = Math.abs(offset)
  const side = offset === 0 ? 0 : offset < 0 ? -1 : 1

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 origin-center"
      style={{
        zIndex: 20 - abs,
        pointerEvents: abs > 2 ? 'none' : 'auto',
      }}
      animate={{
        x: `calc(-50% + ${side * abs * 118}px)`,
        y: '-50%',
        rotateY: side * abs * -28,
        scale: active ? 1 : Math.max(0.72, 1 - abs * 0.12),
        opacity: abs > 2 ? 0 : 1 - abs * 0.18,
        filter: active ? 'blur(0px)' : `blur(${Math.min(6, abs * 2.5)}px)`,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
    >
      <div
        className={cn(
          'relative w-[200px] overflow-hidden rounded-[1.35rem] border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] sm:w-[240px]',
          active && 'ring-2 ring-[var(--mootoz-accent)]/50',
        )}
        style={{
          aspectRatio: '9 / 16',
          boxShadow: active
            ? '0 28px 50px -18px color-mix(in srgb, var(--mootoz-charcoal) 55%, transparent)'
            : '0 16px 32px -16px color-mix(in srgb, var(--mootoz-charcoal) 40%, transparent)',
        }}
      >
        {active && reel.embed ? (
          <iframe
            title={reel.title}
            src={`${reel.embed}${muted ? '&mute=1' : '&mute=0'}`}
            className="absolute inset-0 size-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={reel.poster}
            alt={reel.title}
            className="absolute inset-0 size-full object-cover"
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-1 text-[0.65rem] font-semibold text-white backdrop-blur-sm">
          {reel.platform === 'youtube' ? (
            <Youtube className="size-3.5" />
          ) : (
            <Instagram className="size-3.5" />
          )}
          {reel.platform === 'youtube' ? 'Short' : 'Reel'}
        </div>

        {active ? (
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/70"
          >
            {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
          </button>
        ) : null}

        <div className="absolute right-3 bottom-3 left-3">
          <p className="text-sm font-semibold text-white drop-shadow">{reel.title}</p>
          <a
            href={reel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1 text-[0.65rem] font-medium text-white/85 hover:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            Open
            <ExternalLink className="size-2.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export function VideoGallerySection() {
  const [active, setActive] = useState(0)
  const [muted, setMuted] = useState(true)
  const count = BAKERY_REELS.length

  const prev = () => setActive((i) => (i - 1 + count) % count)
  const next = () => setActive((i) => (i + 1) % count)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActive((i) => (i - 1 + count) % count)
      }
      if (e.key === 'ArrowRight') {
        setActive((i) => (i + 1) % count)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [count])

  return (
    <section
      id="reels"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: 'var(--mootoz-surface)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
       
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase">
            Watch the bake
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-[var(--mootoz-accent)] sm:text-4xl"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            Shorts &amp; Reels
          </h2>
          <p className="mt-3 text-base text-[var(--mootoz-muted)]">
            YouTube Shorts and Instagram Reels from our New York kitchens —
            swipe through the latest bakes.
          </p>
        </div>

        <div
          className="relative mx-auto h-[460px] w-full max-w-4xl [perspective:1200px] sm:h-[540px]"
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous reel"
            className="absolute top-1/2 left-0 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--mootoz-accent)] bg-[var(--mootoz-bg)]/80 text-[var(--mootoz-accent)] backdrop-blur-sm transition hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)] sm:left-2 sm:size-11"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next reel"
            className="absolute top-1/2 right-0 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--mootoz-accent)] bg-[var(--mootoz-bg)]/80 text-[var(--mootoz-accent)] backdrop-blur-sm transition hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)] sm:right-2 sm:size-11"
          >
            <ChevronRight className="size-5" />
          </button>

          <AnimatePresence initial={false}>
            {BAKERY_REELS.map((reel, index) => {
              let offset = index - active
              if (offset > count / 2) offset -= count
              if (offset < -count / 2) offset += count
              if (Math.abs(offset) > 2) return null
              return (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  offset={offset}
                  active={offset === 0}
                  muted={muted}
                  onToggleMute={() => setMuted((m) => !m)}
                />
              )
            })}
          </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] px-3 py-2">
            {BAKERY_REELS.map((reel, i) => (
              <button
                key={reel.id}
                type="button"
                aria-label={`Go to ${reel.title}`}
                onClick={() => setActive(i)}
                className={cn(
                  'size-2 rounded-full transition-all',
                  i === active
                    ? 'w-5 bg-[var(--mootoz-accent)]'
                    : 'bg-[color-mix(in_srgb,var(--mootoz-accent)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_55%,transparent)]',
                )}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-[var(--mootoz-accent)] px-7 font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
          >
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <Instagram className="size-4" />
              Follow on Instagram
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-2 border-[var(--mootoz-accent)] bg-transparent px-7 font-semibold text-[var(--mootoz-accent)] hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
          >
            <a href={LINKS.youtube} target="_blank" rel="noopener noreferrer">
              <Youtube className="size-4" />
              Watch Shorts
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)] px-7 font-semibold text-[var(--mootoz-text)] hover:border-[var(--mootoz-accent)]"
          >
            <Link href="/reservation">Reserve a Table</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
