'use client'

import { createContext, useContext } from 'react'

export type CartItem = {
  productId: string
  name: string
  slug: string
  image_url: string
  price: number
  quantity: number
  stock: number
}

export type CartContextType = {
  items: CartItem[]
  itemCount: number
  total: number
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
