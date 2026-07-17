'use client'

import dynamic from 'next/dynamic'

const ContactPageView = dynamic(
  () => import('@/components/bakery/ContactPageView'),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-svh w-full" style={{ backgroundColor: '#050505' }} />
    ),
  },
)

export default function ContactPage() {
  return <ContactPageView />
}
