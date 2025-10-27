'use client'

import { useState } from 'react'
import { Building2, Smartphone, Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { paymentMethods, type PaymentMethod } from '@/config/payment'

type PaymentMethodSelectorProps = {
  selectedMethod: 'bank_transfer' | 'yape' | 'plin' | null
  onSelectMethod: (method: 'bank_transfer' | 'yape' | 'plin') => void
}

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const getIcon = (iconName: string) => {
    if (iconName === 'Building2') return Building2
    if (iconName === 'Smartphone') return Smartphone
    return Building2
  }

  const enabledMethods = paymentMethods.filter((method) => method.enabled)

  if (enabledMethods.length === 0) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-sm text-red-600 dark:text-red-400">
          No hay métodos de pago disponibles. Por favor, contacta al
          administrador.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Selecciona tu método de pago
      </h3>

      <div className="space-y-3">
        {enabledMethods.map((method) => {
          const Icon = getIcon(method.icon)
          const isSelected = selectedMethod === method.id

          return (
            <div
              key={method.id}
              className={`cursor-pointer rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-neutral-900 bg-neutral-50 dark:border-white dark:bg-neutral-800'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600'
              }`}
              onClick={() => onSelectMethod(method.id)}
            >
              {/* Method Header */}
              <div className="flex items-start gap-4 p-4">
                <div className="relative mt-1">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? 'border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white'
                        : 'border-neutral-300 dark:border-neutral-600'
                    }`}
                  >
                    {isSelected && (
                      <Check className="h-3 w-3 text-white dark:text-neutral-900" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white">
                        {method.name}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {method.id === 'bank_transfer' &&
                          'Transferencia o depósito en cuenta BCP'}
                        {method.id === 'yape' && 'Pago rápido con Yape'}
                        {method.id === 'plin' && 'Pago rápido con Plin'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details (shown when selected) */}
              {isSelected && (
                <div className="border-t border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800/50">
                  <p className="mb-3 text-sm font-medium text-neutral-900 dark:text-white">
                    Datos para realizar el pago:
                  </p>

                  <div className="space-y-2">
                    {method.id === 'bank_transfer' && (
                      <>
                        {method.details.accountHolder && (
                          <AccountDataRow
                            label="Titular"
                            value={method.details.accountHolder}
                            onCopy={copyToClipboard}
                          />
                        )}
                        {method.details.ruc && (
                          <AccountDataRow
                            label="RUC"
                            value={method.details.ruc}
                            onCopy={copyToClipboard}
                          />
                        )}
                        {method.details.accountType && (
                          <AccountDataRow
                            label="Tipo de Cuenta"
                            value={method.details.accountType}
                            onCopy={copyToClipboard}
                          />
                        )}
                        {method.details.accountNumber && (
                          <AccountDataRow
                            label="Número de Cuenta"
                            value={method.details.accountNumber}
                            onCopy={copyToClipboard}
                          />
                        )}
                      </>
                    )}

                    {(method.id === 'yape' || method.id === 'plin') && (
                      <>
                        {method.details.name && (
                          <AccountDataRow
                            label="Nombre"
                            value={method.details.name}
                            onCopy={copyToClipboard}
                          />
                        )}
                        {method.details.phoneNumber && (
                          <AccountDataRow
                            label="Número de Celular"
                            value={method.details.phoneNumber}
                            onCopy={copyToClipboard}
                          />
                        )}
                      </>
                    )}
                  </div>

                  <div className="mt-3 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      💡 Realiza el pago y luego sube tu comprobante en el
                      siguiente paso.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper component for account data rows
function AccountDataRow({
  label,
  value,
  onCopy,
}: {
  label: string
  value: string
  onCopy: (value: string, label: string) => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopy(value, label)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-2 dark:bg-neutral-900">
      <div className="flex-1">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
        <p className="font-mono text-sm font-medium text-neutral-900 dark:text-white">
          {value}
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="h-8 px-2"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
