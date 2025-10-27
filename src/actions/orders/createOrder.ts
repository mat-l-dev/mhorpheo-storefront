'use server'

import { createServerActionClient } from '@/lib/supabase/server-action'
import { revalidatePath } from 'next/cache'

type CreateOrderResult = {
  success?: boolean
  orderId?: string
  invoiceNo?: string
  error?: string
}

export async function createOrder(
  formData: FormData,
): Promise<CreateOrderResult> {
  try {
    const supabase = await createServerActionClient()

    // 1. Extraer datos del formData
    const customerData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    }

    const paymentMethod = formData.get('paymentMethod') as string
    const operationNumber = formData.get('operationNumber') as string
    const paymentNotes = formData.get('paymentNotes') as string | null
    const paymentProofFile = formData.get('paymentProof') as File
    const cartItemsString = formData.get('cartItems') as string
    const cartItems = JSON.parse(cartItemsString)

    // Validación básica
    if (
      !customerData.name ||
      !customerData.email ||
      !customerData.phone ||
      !customerData.address
    ) {
      return { error: 'Todos los campos del cliente son obligatorios' }
    }

    if (!paymentMethod) {
      return { error: 'Debe seleccionar un método de pago' }
    }

    if (!operationNumber) {
      return { error: 'El número de operación es obligatorio' }
    }

    if (!paymentProofFile || !paymentProofFile.name) {
      return { error: 'Debe subir el comprobante de pago' }
    }

    if (!cartItems || cartItems.length === 0) {
      return { error: 'El carrito está vacío' }
    }

    // 2. Crear o buscar cliente
    let customerId: string

    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', customerData.email)
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
      // Actualizar datos del cliente
      await supabase.from('customers').update(customerData).eq('id', customerId)
    } else {
      // Crear nuevo cliente
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert(customerData)
        .select('id')
        .single()

      if (customerError || !newCustomer) {
        console.error('Error creating customer:', customerError)

        // Error más descriptivo
        if (customerError?.message?.includes('policy')) {
          return {
            error:
              'Error de permisos al crear cliente. Configura RLS en Supabase. Ver SUPABASE_RLS_CONFIG.md',
          }
        }

        return {
          error: `Error al crear cliente: ${
            customerError?.message || 'Desconocido'
          }`,
        }
      }
      customerId = newCustomer.id
    }

    // 3. Subir comprobante de pago a Storage
    const fileName = `${Date.now()}-${paymentProofFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('payment-proofs')
      .upload(fileName, paymentProofFile)

    if (uploadError) {
      console.error('Error uploading payment proof:', uploadError)

      // Mensajes de error más descriptivos
      if (uploadError.message?.includes('policy')) {
        return {
          error:
            'Error de permisos. Configura las políticas RLS en Supabase. Ver SUPABASE_RLS_CONFIG.md',
        }
      }

      return { error: `Error al subir comprobante: ${uploadError.message}` }
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('payment-proofs').getPublicUrl(uploadData.path)

    // 4. Calcular totales
    const subtotal = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    )
    const shippingCost = parseFloat(
      process.env.NEXT_PUBLIC_SHIPPING_COST || '15',
    )
    const total = subtotal + shippingCost

    // 5. Generar número de invoice
    const invoiceNo = `INV-${Date.now()}`

    // 6. Crear orden
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        invoice_no: invoiceNo,
        customer_id: customerId,
        total_amount: total,
        shipping_cost: shippingCost,
        payment_method: paymentMethod,
        status: 'pending_verification',
        operation_number: operationNumber,
        payment_notes: paymentNotes || null,
        payment_proof_url: publicUrl,
      })
      .select('id')
      .single()

    if (orderError || !order) {
      console.error('Error creating order:', orderError)

      // Error más descriptivo
      if (orderError?.message?.includes('policy')) {
        return {
          error:
            'Error de permisos al crear orden. Configura RLS en Supabase. Ver SUPABASE_RLS_CONFIG.md',
        }
      }

      return {
        error: `Error al crear orden: ${orderError?.message || 'Desconocido'}`,
      }
    }

    // 7. Crear items de la orden
    const orderItems = cartItems.map((item: any) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.price,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)

      // Error más descriptivo
      if (itemsError?.message?.includes('policy')) {
        return {
          error:
            'Error de permisos al crear items. Configura RLS en Supabase. Ver SUPABASE_RLS_CONFIG.md',
        }
      }

      return {
        error: `Error al crear items de la orden: ${
          itemsError?.message || 'Desconocido'
        }`,
      }
    }

    // 8. Reducir stock de productos (si existe la función)
    try {
      for (const item of cartItems) {
        await supabase.rpc('decrement_product_stock', {
          product_id: item.productId,
          quantity: item.quantity,
        })
      }
    } catch (error) {
      // Si la función no existe, continuamos sin error
      console.warn('Stock decrement function not available:', error)
    }

    // Revalidar rutas
    revalidatePath('/productos')
    revalidatePath('/carrito')

    return { success: true, orderId: order.id, invoiceNo }
  } catch (error) {
    console.error('Error in createOrder:', error)
    return { error: 'Error inesperado al procesar el pedido' }
  }
}
