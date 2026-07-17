import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Browse Hearth Bakery menu — 100% eggless cakes, pastries, breads, and custom orders in New York.',
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
