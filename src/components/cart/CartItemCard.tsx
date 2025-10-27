'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, CartItem } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/format'

type CartItemCardProps = {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.productId, item.quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      updateQuantity(item.productId, item.quantity + 1)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <div className="group flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:gap-6 sm:p-6">
      {/* Image */}
      <Link
        href={`/productos/${item.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-32"
      >
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 96px, 128px"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <Link
            href={`/productos/${item.slug}`}
            className="font-medium text-neutral-900 hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
          >
            {item.name}
          </Link>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {formatCurrency(item.price)} c/u
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleDecrease}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleIncrease}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Subtotal */}
          <p className="text-lg font-semibold text-neutral-900 dark:text-white">
            {formatCurrency(subtotal)}
          </p>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 flex-shrink-0 text-neutral-400 hover:text-red-600"
        onClick={() => removeFromCart(item.productId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
