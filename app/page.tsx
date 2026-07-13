'use client'

import dynamic from 'next/dynamic'

const AppComponent = dynamic(() => import('@/components/AppComponent'), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-svh w-full"
      style={{ backgroundColor: '#12100E' }}
      aria-label="Loading Mooto'z Bakery"
    />
  ),
})

export default function HomePage() {
  return <AppComponent />
}
