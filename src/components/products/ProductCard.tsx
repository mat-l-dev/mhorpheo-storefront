'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Package } from 'lucide-react'
import { ProductWithCategory } from '@/types/database.types'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { AddToCartButton } from '@/components/products/AddToCartButton'

type ProductCardProps = {
  product: ProductWithCategory
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-black dark:hover:border-gray-700"
    >
      {/* Imagen del producto */}
      <Link href={`/productos/${product.slug}`} className="relative block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Image
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={index < 3}
          />

          {/* Badge de stock en la imagen */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="destructive" className="text-sm font-semibold">
                Agotado
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Contenido */}
      <div className="flex flex-1 flex-col space-y-3 p-5">
        {/* Categoría */}
        <Badge variant="secondary" className="w-fit text-xs font-medium">
          {product.categories.name}
        </Badge>

        {/* Nombre del producto */}
        <Link href={`/productos/${product.slug}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-black transition-colors duration-300 hover:text-gray-600 dark:text-white dark:hover:text-gray-300">
            {product.name}
          </h3>
        </Link>

        {/* Descripción corta */}
        {product.description && (
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
        )}

        {/* Precio y Stock */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-black dark:text-white">
              {formatPrice(product.selling_price)}
            </span>
          </div>

          {!isOutOfStock && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Package className="h-4 w-4" />
              <span>{product.stock} disponibles</span>
            </div>
          )}
        </div>

        {/* SKU */}
        <p className="text-xs text-gray-500 dark:text-gray-600">
          SKU: {product.sku}
        </p>

        {/* Botón de agregar al carrito */}
        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            image_url: product.image_url || '/placeholder-product.jpg',
            selling_price: product.selling_price,
            stock: product.stock,
          }}
          className="mt-auto w-full"
        />
      </div>
    </motion.div>
  )
}
