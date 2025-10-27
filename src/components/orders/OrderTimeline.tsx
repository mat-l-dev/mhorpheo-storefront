'use client'

import { CheckCircle2, Clock, Circle, XCircle } from 'lucide-react'

type OrderStatus =
  | 'pending'
  | 'pending_verification'
  | 'processing'
  | 'delivered'
  | 'cancelled'

type OrderTimelineProps = {
  currentStatus: OrderStatus
}

type TimelineStep = {
  id: string
  label: string
  description: string
}

const steps: TimelineStep[] = [
  {
    id: 'created',
    label: 'Pedido realizado',
    description: 'Tu pedido ha sido recibido',
  },
  {
    id: 'verified',
    label: 'Pago verificado',
    description: 'Confirmamos tu pago',
  },
  {
    id: 'processing',
    label: 'En preparación',
    description: 'Preparando tu pedido',
  },
  {
    id: 'shipped',
    label: 'Enviado',
    description: 'Tu pedido está en camino',
  },
  {
    id: 'delivered',
    label: 'Entregado',
    description: 'Pedido entregado',
  },
]

const statusToStepIndex: Record<OrderStatus, number> = {
  pending: 0,
  pending_verification: 0,
  processing: 2,
  delivered: 4,
  cancelled: -1,
}

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  // Si la orden está cancelada, mostrar vista especial
  if (currentStatus === 'cancelled') {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div className="mt-2 h-12 w-0.5 bg-gray-200" />
          </div>
          <div className="flex-1 pb-8">
            <h4 className="text-sm font-semibold text-gray-900">
              Pedido realizado
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Tu pedido ha sido recibido
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900">
              Orden cancelada
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              Esta orden ha sido cancelada
            </p>
          </div>
        </div>
      </div>
    )
  }

  const currentStepIndex = statusToStepIndex[currentStatus]

  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex
        const isCurrent = index === currentStepIndex
        const isPending = index > currentStepIndex

        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              {/* Icon */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isCompleted
                    ? 'bg-green-100'
                    : isCurrent
                      ? 'bg-yellow-100'
                      : 'bg-gray-100'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : isCurrent ? (
                  <Clock className="h-5 w-5 animate-pulse text-yellow-600" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`mt-2 h-12 w-0.5 ${
                    isCompleted ? 'bg-green-200' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4
                className={`text-sm font-semibold ${
                  isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step.label}
              </h4>
              <p
                className={`mt-1 text-sm ${
                  isCompleted || isCurrent ? 'text-gray-500' : 'text-gray-400'
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
