'use client'

import dynamic from 'next/dynamic'

const LandingPage = dynamic(() => import('@/components/bakery/LandingPage'), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-svh w-full"
      style={{ backgroundColor: '#050505' }}
      aria-label="Loading Hearth Bakery"
    />
  ),
})

export default function HomePage() {
  return <LandingPage />
}
