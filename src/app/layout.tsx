import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import ThemeProvider from '@/providers/ThemeProvider'
import NextTopLoader from 'nextjs-toploader'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import { CartProvider } from '@/providers/CartProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import { Toaster } from 'sonner'
import { Toaster as ToasterUI } from '@/components/ui/toaster'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: 'Mhorpheo - Kits Solares para Starlink',
    template: '%s | Mhorpheo',
  },
  description:
    'Kits de energía solar para Starlink. Lleva internet de alta velocidad a zonas remotas sin electricidad. Envíos a todo Perú.',
  keywords: [
    'starlink peru',
    'kit solar starlink',
    'energia solar',
    'internet rural',
    'starlink zonas remotas',
    'panel solar',
    'bateria litio',
    'internet satelital',
  ],
  authors: [{ name: 'Mhorpheo' }],
  creator: 'Mhorpheo',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: defaultUrl,
    siteName: 'Mhorpheo',
    title: 'Mhorpheo - Kits Solares para Starlink',
    description:
      'Kits de energía solar para Starlink. Internet en zonas remotas sin electricidad.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mhorpheo - Kits Solares para Starlink',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mhorpheo - Kits Solares para Starlink',
    description: 'Internet en zonas remotas. Kits solares para Starlink.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      style={{ colorScheme: 'dark' }}
      suppressHydrationWarning
    >
      <body className="bg-white text-gray-900 transition-colors duration-300 dark:bg-black dark:text-white">
        <NextTopLoader showSpinner={false} height={2} color="#2acf80" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <CartProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <WhatsAppButton />
                <Analytics />
              </div>
              <Toaster position="top-center" richColors />
              <ToasterUI />
              <ReactQueryDevtools initialIsOpen={false} />
            </CartProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
