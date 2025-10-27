'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type QuantitySelectorProps = {
  productId: string
  maxStock: number
  onChange?: (quantity: number) => void
  initialQuantity?: number
}

export function QuantitySelector({
  maxStock,
  onChange,
  initialQuantity = 1,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleIncrease = () => {
    if (quantity < maxStock) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        Cantidad:
      </span>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleDecrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center text-lg font-semibold">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={handleIncrease}
          disabled={quantity >= maxStock || maxStock === 0}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
