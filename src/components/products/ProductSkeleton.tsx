import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
  return (
    <div className="flex flex-col space-y-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black">
      {/* Imagen */}
      <Skeleton className="aspect-square w-full rounded-xl" />

      {/* Badge de categoría */}
      <Skeleton className="h-5 w-20 rounded-full" />

      {/* Nombre del producto */}
      <Skeleton className="h-6 w-full" />

      {/* Precio */}
      <Skeleton className="h-8 w-32" />

      {/* Stock badge */}
      <Skeleton className="h-5 w-24" />

      {/* Botón */}
      <Skeleton className="h-11 w-full rounded-lg" />
    </div>
  )
}

export function ProductSkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
