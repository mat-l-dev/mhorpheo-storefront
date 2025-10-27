'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getPublishedProducts } from '@/lib/supabase/products'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductSkeletonGrid } from '@/components/products/ProductSkeleton'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { AlertCircle } from 'lucide-react'

export default function ProductosPage() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getPublishedProducts,
  })

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Productos' }]} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-black dark:text-white md:text-5xl">
            Nuestros Productos
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Kits solares completos para tu Starlink. Energía confiable donde la
            necesites.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && <ProductSkeletonGrid count={6} />}

        {/* Error State */}
        {isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20"
          >
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-600 dark:text-red-500" />
            <h3 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-300">
              Error al cargar productos
            </h3>
            <p className="text-sm text-red-700 dark:text-red-400">
              {error instanceof Error
                ? error.message
                : 'Ocurrió un error inesperado'}
            </p>
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && products?.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No hay productos disponibles en este momento.
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && products && products.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
