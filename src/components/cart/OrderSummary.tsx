'use client'

import Link from 'next/link'
import { CreditCard, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/format'

const SHIPPING_COST = Number(process.env.NEXT_PUBLIC_SHIPPING_COST) || 0

export function OrderSummary() {
  const { total: subtotal, itemCount } = useCart()

  const total = subtotal + SHIPPING_COST

  return (
    <div className="sticky top-24 space-y-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
        Resumen de Orden
      </h2>

      {/* Summary Details */}
      <div className="space-y-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">
            Subtotal ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
          </span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Envío</span>
          <span className="font-medium text-neutral-900 dark:text-white">
            {SHIPPING_COST === 0 ? 'Gratis' : formatCurrency(SHIPPING_COST)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-neutral-900 dark:text-white">
          Total
        </span>
        <span className="text-2xl font-bold text-neutral-900 dark:text-white">
          {formatCurrency(total)}
        </span>
      </div>

      {/* Checkout Button */}
      <Button asChild size="lg" className="w-full">
        <Link href="/checkout">
          <CreditCard className="mr-2 h-4 w-4" />
          Proceder al Checkout
        </Link>
      </Button>

      {/* Payment Methods Note */}
      <div className="flex items-start gap-2 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800/50">
        <Lock className="h-4 w-4 flex-shrink-0 text-neutral-500 dark:text-neutral-400" />
        <p className="text-xs text-neutral-600 dark:text-neutral-400">
          Pago seguro. Aceptamos tarjetas de crédito, débito y transferencias
          bancarias.
        </p>
      </div>
    </div>
  )
}
