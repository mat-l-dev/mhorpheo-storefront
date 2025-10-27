import { Badge } from '@/components/ui/badge'

type OrderStatus =
  | 'pending'
  | 'pending_verification'
  | 'processing'
  | 'delivered'
  | 'cancelled'

type OrderStatusBadgeProps = {
  status: OrderStatus
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    className: string
  }
> = {
  pending: {
    label: 'Pendiente',
    variant: 'secondary',
    className: 'bg-gray-100 text-gray-700 hover:bg-gray-100',
  },
  pending_verification: {
    label: 'Verificando pago',
    variant: 'outline',
    className:
      'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50',
  },
  processing: {
    label: 'En proceso',
    variant: 'default',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  },
  delivered: {
    label: 'Entregado',
    variant: 'default',
    className: 'bg-green-100 text-green-700 hover:bg-green-100',
  },
  cancelled: {
    label: 'Cancelado',
    variant: 'destructive',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
  },
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge
      variant={config.variant}
      className={`rounded-full px-3 py-1 text-sm font-medium ${config.className}`}
    >
      {config.label}
    </Badge>
  )
}
