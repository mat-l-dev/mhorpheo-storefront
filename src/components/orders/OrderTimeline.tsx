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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
            </div>
            <div className="mt-2 h-12 w-0.5 bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="flex-1 pb-8">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Pedido realizado
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Tu pedido ha sido recibido
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
              Orden cancelada
            </h4>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : isCurrent
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                ) : isCurrent ? (
                  <Clock className="h-5 w-5 animate-pulse text-yellow-600 dark:text-yellow-500" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 dark:text-gray-600" />
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`mt-2 h-12 w-0.5 transition-colors duration-300 ${
                    isCompleted
                      ? 'bg-green-200 dark:bg-green-900/50'
                      : 'bg-gray-200 dark:bg-gray-800'
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4
                className={`text-sm font-semibold transition-colors duration-300 ${
                  isCompleted || isCurrent
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {step.label}
              </h4>
              <p
                className={`mt-1 text-sm transition-colors duration-300 ${
                  isCompleted || isCurrent
                    ? 'text-gray-500 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-600'
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
