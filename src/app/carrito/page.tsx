'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItemCard } from '@/components/cart/CartItemCard'
import { OrderSummary } from '@/components/cart/OrderSummary'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { items } = useCart()

  const isEmpty = items.length === 0

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Tu Carrito
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {isEmpty
              ? 'No tienes productos en tu carrito'
              : `${items.length} ${
                  items.length === 1 ? 'producto' : 'productos'
                } en tu carrito`}
          </p>
        </motion.div>

        {/* Empty State */}
        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-md space-y-8 py-16 text-center"
          >
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
              <ShoppingBag className="h-16 w-16 text-neutral-400" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                Tu carrito está vacío
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Parece que aún no has agregado ningún producto. ¡Descubre
                nuestra colección!
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/productos">Ver Productos</Link>
            </Button>
          </motion.div>
        ) : (
          /* Cart Content */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 lg:col-span-2"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <CartItemCard item={item} />
                </motion.div>
              ))}

              {/* Continue Shopping Link */}
              <div className="pt-4">
                <Link
                  href="/productos"
                  className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  ← Continuar Comprando
                </Link>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <OrderSummary />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
