'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll } from 'framer-motion'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import ThemeToggle from '@/components/ThemeToggle'
import { useCart } from '@/contexts/CartContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/productos', label: 'Productos' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { itemCount } = useCart()
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
    return unsubscribe
  }, [scrollY])

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span
              className="text-2xl font-bold text-black dark:text-white md:text-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Mhorpheo
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Cart Button */}
            <Link href="/carrito" aria-label="Carrito de compras">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="mt-8 flex flex-col space-y-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-black dark:text-gray-300 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
