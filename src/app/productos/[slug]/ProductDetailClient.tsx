'use client'

import { useState } from 'react'
import { QuantitySelector } from '@/components/products/QuantitySelector'
import { AddToCartButton } from '@/components/products/AddToCartButton'

type ProductDetailClientProps = {
  product: {
    id: string
    name: string
    slug: string
    image_url: string
    selling_price: number
    stock: number
  }
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="space-y-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
      <QuantitySelector
        productId={product.id}
        maxStock={product.stock}
        onChange={setQuantity}
      />

      <AddToCartButton
        product={product}
        quantity={quantity}
        variant="default"
        size="lg"
        className="w-full sm:max-w-sm"
      />
    </div>
  )
}
