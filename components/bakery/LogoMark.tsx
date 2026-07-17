import { cn } from '@/lib/utils'

/** Text-mark logo for Hearth Bakery — no Mootoz asset */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)] shadow-md ring-2 ring-[var(--mootoz-accent)]/40 ring-offset-2 ring-offset-[var(--mootoz-nav-bg)]',
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" className="size-[70%]" fill="none">
        <path
          d="M24 8c-2 6-8 10-8 16a8 8 0 0 0 16 0c0-6-6-10-8-16Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M16 36h16M20 40h8"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="24" cy="22" r="2.2" fill="var(--mootoz-bg)" />
      </svg>
    </span>
  )
}
