'use client'

import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/CartContext'

type AddToCartButtonProps = {
  product: {
    id: string
    name: string
    slug: string
    image_url: string
    selling_price: number
    stock: number
  }
  quantity?: number
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
  showToast?: boolean
  className?: string
}

export function AddToCartButton({
  product,
  quantity = 1,
  variant = 'default',
  size = 'default',
  className,
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)

    try {
      addToCart(
        {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          image_url: product.image_url,
          price: product.selling_price,
          stock: product.stock,
        },
        quantity,
      )
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      // Small delay for better UX
      setTimeout(() => setIsLoading(false), 300)
    }
  }

  const isOutOfStock = product.stock === 0

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isOutOfStock || isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {isOutOfStock ? (
        'Agotado'
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isLoading ? 'Agregando...' : 'Agregar al Carrito'}
        </>
      )}
    </Button>
  )
}
