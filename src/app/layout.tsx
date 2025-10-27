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
import { Toaster } from 'sonner'
import { Toaster as ToasterUI } from '@/components/ui/toaster'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Mhorpheo - Energía Solar para Starlink',
  description:
    'Kits de energía solar para Starlink. Conectividad confiable en zonas remotas sin electricidad.',
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
