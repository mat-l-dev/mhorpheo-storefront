import { formatCurrency } from '@/utils/format'

type OrderSummaryProps = {
  subtotal: number
  shipping: number
}

export function OrderSummary({ subtotal, shipping }: OrderSummaryProps) {
  const total = subtotal + shipping

  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Resumen del pedido
      </h3>

      <div className="space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Envío</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {formatCurrency(shipping)}
          </span>
        </div>

        <div className="flex justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </div>
  )
}
