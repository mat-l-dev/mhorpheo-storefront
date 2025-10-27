import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Package, Truck, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/utils/format'

type PageProps = {
  params: {
    id: string
  }
}

export default async function OrderConfirmationPage({ params }: PageProps) {
  const supabase = await createClient()

  // Fetch order details
  const { data: order, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      customer:customers(*),
      items:order_items(
        *,
        product:products(*)
      )
    `,
    )
    .eq('id', params.id)
    .single()

  if (error || !order) {
    notFound()
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return {
          label: 'Pendiente de Verificación',
          color: 'text-yellow-600 dark:text-yellow-400',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        }
      case 'processing':
        return {
          label: 'Procesando',
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        }
      case 'shipped':
        return {
          label: 'Enviado',
          color: 'text-purple-600 dark:text-purple-400',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        }
      case 'delivered':
        return {
          label: 'Entregado',
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
        }
      case 'cancelled':
        return {
          label: 'Cancelado',
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
        }
      default:
        return {
          label: status,
          color: 'text-neutral-600 dark:text-neutral-400',
          bgColor: 'bg-neutral-50 dark:bg-neutral-900/20',
        }
    }
  }

  const statusInfo = getStatusInfo(order.status)

  return (
    <div className="min-h-screen bg-neutral-50 py-12 dark:bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Success Header */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-green-100 p-6 dark:bg-green-900/20">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="mb-3 text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
              ¡Pedido realizado con éxito!
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Hemos recibido tu pedido y lo procesaremos pronto.
            </p>
          </div>

          {/* Order Info Card */}
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Número de Pedido
                </p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {order.invoice_no}
                </p>
              </div>
              <div className={`rounded-lg px-4 py-2 ${statusInfo.bgColor}`}>
                <p className={`font-semibold ${statusInfo.color}`}>
                  {statusInfo.label}
                </p>
              </div>
            </div>

            {/* Verification Notice */}
            {order.status === 'pending_verification' && (
              <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Verificando tu pago
                    </p>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                      Estamos revisando tu comprobante de pago. Te notificaremos
                      por email a{' '}
                      <span className="font-medium">
                        {order.customer.email}
                      </span>{' '}
                      cuando sea aprobado y comencemos a procesar tu pedido.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Process Timeline */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
                Estado del pedido
              </h3>
              <div className="space-y-4">
                <TimelineStep
                  icon={CheckCircle}
                  label="Pedido recibido"
                  completed={true}
                />
                <TimelineStep
                  icon={Clock}
                  label="Verificación de pago"
                  completed={order.status !== 'pending_verification'}
                  active={order.status === 'pending_verification'}
                />
                <TimelineStep
                  icon={Package}
                  label="Procesando pedido"
                  completed={
                    order.status === 'shipped' || order.status === 'delivered'
                  }
                  active={order.status === 'processing'}
                />
                <TimelineStep
                  icon={Truck}
                  label="En camino"
                  completed={order.status === 'delivered'}
                  active={order.status === 'shipped'}
                />
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="mb-6 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
              Detalles del pedido
            </h3>

            {/* Items */}
            <div className="mb-6 space-y-4">
              {order.items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 dark:text-white">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Cantidad: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-neutral-900 dark:text-white">
                    {formatCurrency(item.unit_price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Subtotal
                </span>
                <span className="text-neutral-900 dark:text-white">
                  {formatCurrency(order.total_amount - order.shipping_cost)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Envío
                </span>
                <span className="text-neutral-900 dark:text-white">
                  {formatCurrency(order.shipping_cost)}
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 dark:border-neutral-800">
                <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Total
                </span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  {formatCurrency(order.total_amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
              Información de contacto
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Nombre
                </p>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {order.customer.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Email
                </p>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {order.customer.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Teléfono
                </p>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {order.customer.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Dirección de envío
                </p>
                <p className="font-medium text-neutral-900 dark:text-white">
                  {order.customer.address}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/">Volver al Inicio</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/productos">Seguir Comprando</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Timeline Step Component
function TimelineStep({
  icon: Icon,
  label,
  completed = false,
  active = false,
}: {
  icon: any
  label: string
  completed?: boolean
  active?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          completed
            ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
            : active
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
              : 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600'
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={`font-medium ${
          completed || active
            ? 'text-neutral-900 dark:text-white'
            : 'text-neutral-500 dark:text-neutral-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
