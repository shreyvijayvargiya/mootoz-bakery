'use client'

import dynamic from 'next/dynamic'

const MenuPageView = dynamic(() => import('@/components/bakery/MenuPageView'), {
  ssr: false,
  loading: () => (
    <div className="min-h-svh w-full" style={{ backgroundColor: '#050505' }} />
  ),
})

export default function MenuPage() {
  return <MenuPageView />
}
