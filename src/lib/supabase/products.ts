import { createBrowserClient } from '@/lib/supabase/client'
import { Product, ProductWithCategory } from '@/types/database.types'

/**
 * Obtiene todos los productos publicados con su categoría
 * @returns Lista de productos publicados ordenados por fecha de creación (más recientes primero)
 */
export async function getPublishedProducts(): Promise<ProductWithCategory[]> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }

  return data as ProductWithCategory[]
}

/**
 * Obtiene un producto específico por su slug
 * @param slug - El slug del producto
 * @returns El producto con su categoría o null si no se encuentra
 */
export async function getProductBySlug(
  slug: string,
): Promise<ProductWithCategory | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as ProductWithCategory
}

/**
 * Obtiene productos destacados (los más recientes)
 * @param limit - Número máximo de productos a obtener (por defecto 3)
 * @returns Lista de productos destacados
 */
export async function getFeaturedProducts(
  limit: number = 3,
): Promise<ProductWithCategory[]> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data as ProductWithCategory[]
}
