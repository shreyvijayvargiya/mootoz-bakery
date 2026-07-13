import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: "Mooto'z Bakery — 100% Eggless Bakery in Kota, Rajasthan",
    template: '%s | Mootoz Bakery',
  },
  description:
    "Mooto'z Bakery crafts luxury 100% eggless cakes and confections in Kota. Order online on Swiggy & Zomato, or visit our Kunhari store.",
  icons: {
    icon: [{ url: '/motooz-logo.png', type: 'image/png' }],
    apple: [{ url: '/motooz-logo.png', type: 'image/png' }],
    shortcut: '/motooz-logo.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,800&family=JetBrains+Mono:wght@600&family=Outfit:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/motooz-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/motooz-logo.png" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
