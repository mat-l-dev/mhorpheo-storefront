import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  CheckCircle2,
  Home,
  ShoppingBag,
  Calendar,
  CreditCard,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Package,
} from 'lucide-react'

import { getOrderById } from '@/lib/supabase/orders'
import { formatDate } from '@/lib/utils'
import { formatCurrency } from '@/utils/format'
import { Button } from '@/components/ui/button'
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'
import { OrderTimeline } from '@/components/orders/OrderTimeline'
import { OrderSummary } from '@/components/orders/OrderSummary'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const order = await getOrderById(params.id)

  if (!order) {
    return {
      title: 'Orden no encontrada - Mhorpheo',
    }
  }

  return {
    title: `Orden ${order.invoice_no} - Mhorpheo`,
    description: `Detalles de tu pedido en Mhorpheo`,
  }
}

const paymentMethodLabels: Record<string, string> = {
  bank_transfer: 'Transferencia Bancaria',
  yape: 'Yape',
  plin: 'Plin',
}

export default async function OrderPage({ params }: Props) {
  const order = await getOrderById(params.id)

  if (!order) {
    notFound()
  }

  // Calcular subtotal
  const subtotal = order.order_items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0,
  )

  return (
    <div className="min-h-screen bg-white py-12 transition-colors duration-300 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            Inicio
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">Mi Orden</span>
        </nav>

        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            ¡Pedido realizado con éxito!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Orden <span className="font-semibold">{order.invoice_no}</span>
          </p>
          <div className="mt-4 flex justify-center">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Order Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Verification Message */}
            {order.status === 'pending_verification' && (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 transition-colors duration-300 dark:border-yellow-900/30 dark:bg-yellow-900/10">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">
                      📋 Estamos verificando tu pago
                    </h3>
                    <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-300">
                      Tu comprobante de pago está siendo revisado por nuestro
                      equipo. Te notificaremos por email a{' '}
                      <span className="font-semibold">
                        {order.customers.email}
                      </span>{' '}
                      cuando tu pedido sea aprobado.
                    </p>
                    <p className="mt-2 text-sm font-medium text-yellow-900 dark:text-yellow-200">
                      Tiempo estimado: 2-24 horas
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Estado del pedido
              </h2>
              <OrderTimeline currentStatus={order.status} />
            </div>

            {/* Order Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Información del pedido
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Fecha y hora
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(order.order_time)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Método de pago
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {paymentMethodLabels[order.payment_method] ||
                        order.payment_method}
                    </p>
                  </div>
                </div>

                {order.operation_number && (
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Número de operación
                      </p>
                      <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                        {order.operation_number}
                      </p>
                    </div>
                  </div>
                )}

                {order.payment_notes && (
                  <div className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Notas
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.payment_notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Productos
              </h2>

              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 dark:border-gray-800"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                      {item.products.image_url ? (
                        <Image
                          src={item.products.image_url}
                          alt={item.products.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.products.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {item.quantity} x {formatCurrency(item.unit_price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(item.unit_price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Información del cliente
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Nombre
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customers.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customers.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Teléfono
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customers.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Dirección de envío
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.customers.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <OrderSummary subtotal={subtotal} shipping={order.shipping_cost} />

            {/* Actions */}
            <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Acciones
              </h3>

              <div className="space-y-2">
                <Link href="/" className="block">
                  <Button
                    className="w-full transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Volver al Inicio
                  </Button>
                </Link>

                <Link href="/products" className="block">
                  <Button
                    variant="outline"
                    className="w-full transition-all duration-300 hover:scale-105"
                    size="lg"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Ver Productos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                ¿Necesitas ayuda?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Si tienes alguna pregunta sobre tu pedido, contáctanos por
                WhatsApp o email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
