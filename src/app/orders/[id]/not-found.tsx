import Link from 'next/link'
import { PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OrderNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 p-6">
            <PackageX className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-gray-900">
          Orden no encontrada
        </h1>

        <p className="mb-8 text-gray-600">
          No pudimos encontrar esta orden. Por favor, verifica el número de
          orden o intenta nuevamente.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/">Volver al Inicio</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/products">Ver Productos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
