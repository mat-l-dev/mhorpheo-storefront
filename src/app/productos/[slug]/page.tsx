import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/products/ProductCard'
import { formatCurrency } from '@/utils/format'
import { ProductDetailClient } from './ProductDetailClient'
import { ProductWithCategory } from '@/types/database.types'

type Props = {
  params: { slug: string }
}

async function getProductBySlug(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function getRelatedProducts(
  categoryId: string,
  currentProductId: string,
) {
  const supabase = createClient()

  const { data } = await supabase
    .from('products')
    .select(
      `
      *,
      categories (
        id,
        name,
        slug
      )
    `,
    )
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .neq('id', currentProductId)
    .limit(3)

  return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Producto no encontrado - Mhorpheo',
    }
  }

  return {
    title: `${product.name} - Mhorpheo`,
    description: product.description || `Compra ${product.name} en Mhorpheo`,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(
    product.category_id,
    product.id,
  )

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive" className="gap-1">
          <Package className="h-3 w-3" />
          Agotado
        </Badge>
      )
    }
    if (stock <= 10) {
      return (
        <Badge
          variant="secondary"
          className="gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        >
          <Package className="h-3 w-3" />
          {stock} {stock === 1 ? 'unidad disponible' : 'unidades disponibles'}
        </Badge>
      )
    }
    return (
      <Badge
        variant="secondary"
        className="gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      >
        <Package className="h-3 w-3" />
        {stock} unidades disponibles
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/productos"
            className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            Productos
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="group relative aspect-square overflow-hidden rounded-3xl bg-white dark:bg-neutral-900">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Category */}
            {product.categories && (
              <Link
                href={`/productos?categoria=${product.categories.slug}`}
                className="w-fit"
              >
                <Badge
                  variant="outline"
                  className="hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {product.categories.name}
                </Badge>
              </Link>
            )}

            {/* Name */}
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-bold text-neutral-900 dark:text-white">
                {formatCurrency(product.selling_price)}
              </p>
              {product.cost_price &&
                product.cost_price > product.selling_price && (
                  <p className="text-xl text-neutral-500 line-through dark:text-neutral-400">
                    {formatCurrency(product.cost_price)}
                  </p>
                )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="text-neutral-600 dark:text-neutral-400">
                  {product.description}
                </p>
              </div>
            )}

            {/* Stock Badge */}
            <div>{getStockBadge(product.stock)}</div>

            {/* Quantity Selector & Add to Cart */}
            <ProductDetailClient
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                image_url: product.image_url,
                selling_price: product.selling_price,
                stock: product.stock,
              }}
            />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 text-2xl font-bold text-neutral-900 dark:text-white">
              Productos Relacionados
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct: ProductWithCategory) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
