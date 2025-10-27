import { createBrowserClient } from '@/lib/supabase/client'

export type OrderWithDetails = {
  id: string
  invoice_no: string
  customer_id: string
  total_amount: number
  shipping_cost: number
  payment_method: 'bank_transfer' | 'yape' | 'plin'
  status:
    | 'pending'
    | 'pending_verification'
    | 'processing'
    | 'delivered'
    | 'cancelled'
  operation_number: string | null
  payment_proof_url: string | null
  payment_notes: string | null
  order_time: string
  created_at: string
  customers: {
    name: string
    email: string
    phone: string
    address: string
  }
  order_items: Array<{
    id: string
    quantity: number
    unit_price: number
    products: {
      id: string
      name: string
      image_url: string
      slug: string
    }
  }>
}

export async function getOrderById(
  orderId: string,
): Promise<OrderWithDetails | null> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('orders')
    .select(
      `
      *,
      customers (*),
      order_items (
        *,
        products (id, name, image_url, slug)
      )
    `,
    )
    .eq('id', orderId)
    .single()

  if (error) {
    console.error('Error fetching order:', error)
    return null
  }

  return data as OrderWithDetails
}
