import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reservation',
  description:
    'Reserve a table at Hearth Bakery in New York — West Village, SoHo, or Upper East Side.',
}

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
