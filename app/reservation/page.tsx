'use client'

import dynamic from 'next/dynamic'

const ReservationPageView = dynamic(
  () => import('@/components/bakery/ReservationPageView'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-svh w-full" style={{ backgroundColor: '#050505' }} />
    ),
  },
)

export default function ReservationPage() {
  return <ReservationPageView />
}
