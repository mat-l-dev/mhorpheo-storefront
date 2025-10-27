'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector'
import { PaymentProofUpload } from '@/components/checkout/PaymentProofUpload'
import { useCart } from '@/contexts/CartContext'
import { formatCurrency } from '@/utils/format'
import { createOrder } from '@/actions/orders/createOrder'
import { checkoutSchema } from '@/lib/validations/checkout'

const SHIPPING_COST = Number(process.env.NEXT_PUBLIC_SHIPPING_COST) || 0

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total: subtotal, clearCart } = useCart()

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<
    'bank_transfer' | 'yape' | 'plin' | null
  >(null)
  const [operationNumber, setOperationNumber] = useState('')
  const [paymentNotes, setPaymentNotes] = useState('')
  const [paymentProof, setPaymentProof] = useState<File | null>(null)

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const total = subtotal + SHIPPING_COST

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-900">
              <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            Agrega productos a tu carrito antes de proceder al checkout.
          </p>
          <Button
            asChild
            className="transition-all duration-300 hover:scale-105"
          >
            <Link href="/productos">Ver Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSubmitError(null)

    // Validar con Zod
    const validationResult = checkoutSchema.safeParse({
      name,
      email,
      phone,
      address,
      paymentMethod,
      operationNumber,
      paymentNotes,
    })

    if (!validationResult.success) {
      const newErrors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as string] = issue.message
        }
      })
      setErrors(newErrors)
      return
    }

    if (!paymentProof) {
      setErrors({ paymentProof: 'Debe subir el comprobante de pago' })
      return
    }

    setIsSubmitting(true)

    try {
      // Preparar FormData
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('address', address)
      formData.append('paymentMethod', paymentMethod!)
      formData.append('operationNumber', operationNumber)
      formData.append('paymentNotes', paymentNotes)
      formData.append('paymentProof', paymentProof)
      formData.append('cartItems', JSON.stringify(items))

      // Crear orden
      const result = await createOrder(formData)

      if (result.error) {
        setSubmitError(result.error)
        setIsSubmitting(false)
        return
      }

      // Limpiar carrito y redirigir
      clearCart()
      router.push(`/orders/${result.orderId}`)
    } catch (error) {
      console.error('Error submitting order:', error)
      setSubmitError('Error inesperado al procesar el pedido')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 transition-colors duration-300 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/carrito"
            className="transition-colors duration-200 hover:text-gray-900 dark:hover:text-white"
          >
            Carrito
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">Checkout</span>
        </nav>

        {/* Page Title */}
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Finalizar Pedido
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Step 1: Customer Information */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-gray-900">
                      1
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Información del Cliente
                    </h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Name */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 dark:bg-gray-900 dark:text-white ${
                          errors.name
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900/20 dark:border-gray-700 dark:focus:border-white dark:focus:ring-white/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-white ${
                          errors.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/20 dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                      >
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+51 9XXXXXXXX"
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-white ${
                          errors.phone
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/20 dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white/20'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="address"
                        className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
                      >
                        Dirección de envío *
                      </label>
                      <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className={`w-full resize-none rounded-lg border bg-white px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 dark:bg-neutral-900 dark:text-white ${
                          errors.address
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/20 dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white/20'
                        }`}
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 2: Payment Method */}
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
                      2
                    </div>
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                      Método de Pago
                    </h2>
                  </div>

                  <PaymentMethodSelector
                    selectedMethod={paymentMethod}
                    onSelectMethod={setPaymentMethod}
                  />
                  {errors.paymentMethod && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                {/* Step 3: Payment Proof */}
                {paymentMethod && (
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white dark:bg-white dark:text-neutral-900">
                        3
                      </div>
                      <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        Subir Comprobante
                      </h2>
                    </div>

                    <PaymentProofUpload
                      onFileSelect={setPaymentProof}
                      operationNumber={operationNumber}
                      onOperationNumberChange={setOperationNumber}
                      notes={paymentNotes}
                      onNotesChange={setPaymentNotes}
                      error={errors.paymentProof || errors.operationNumber}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900 dark:text-white">
                  Resumen de Orden
                </h2>

                {/* Items */}
                <div className="mb-6 space-y-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
                  {items.map((item, index) => (
                    <div
                      key={`${item.productId}-${index}`}
                      className="flex gap-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {item.name}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-b border-neutral-200 pb-4 dark:border-neutral-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Envío
                    </span>
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {SHIPPING_COST === 0
                        ? 'Gratis'
                        : formatCurrency(SHIPPING_COST)}
                    </span>
                  </div>
                </div>

                <div className="mb-6 mt-4 flex justify-between">
                  <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {formatCurrency(total)}
                  </span>
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="mb-4 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {submitError}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !paymentMethod || !paymentProof}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    'Finalizar Pedido'
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
                  Al finalizar, tu pedido quedará pendiente de verificación
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
