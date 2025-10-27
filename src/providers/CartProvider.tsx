'use client'

import { useState, useEffect, useCallback } from 'react'
import { CartContext, CartItem } from '@/contexts/CartContext'
import { toast } from 'sonner'

const CART_STORAGE_KEY = 'mhorpheo-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isLoaded])

  // Calculate item count
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Add to cart
  const addToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (i) => i.productId === item.productId,
        )

        if (existingItem) {
          // Check if adding quantity exceeds stock
          const newQuantity = existingItem.quantity + quantity
          if (newQuantity > item.stock) {
            toast.error('No hay suficiente stock disponible')
            return currentItems
          }

          // Update quantity
          toast.success('Cantidad actualizada en el carrito')
          return currentItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: newQuantity }
              : i,
          )
        } else {
          // Check stock before adding
          if (quantity > item.stock) {
            toast.error('No hay suficiente stock disponible')
            return currentItems
          }

          // Add new item
          toast.success('Producto agregado al carrito')
          return [...currentItems, { ...item, quantity }]
        }
      })
    },
    [],
  )

  // Remove from cart
  const removeFromCart = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    )
    toast.success('Producto eliminado del carrito')
  }, [])

  // Update quantity
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return

    setItems((currentItems) => {
      const item = currentItems.find((i) => i.productId === productId)
      if (!item) return currentItems

      if (quantity > item.stock) {
        toast.error('No hay suficiente stock disponible')
        return currentItems
      }

      return currentItems.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      )
    })
  }, [])

  // Clear cart
  const clearCart = useCallback(() => {
    setItems([])
    toast.success('Carrito vaciado')
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
