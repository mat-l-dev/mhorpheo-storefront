export type Product = {
  id: string
  name: string
  description: string | null
  image_url: string
  selling_price: number
  cost_price: number
  stock: number
  sku: string
  slug: string
  category_id: string
  published: boolean
  created_at: string
  updated_at: string
}

export type Category = {
  id: string
  name: string
  description: string | null
  slug: string
  image_url: string
  published: boolean
  created_at: string
  updated_at: string
}

export type ProductWithCategory = Product & {
  categories: Category
}

export type Customer = {
  id: string
  name: string
  email: string
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  invoice_no: string
  customer_id: string
  total_amount: number
  shipping_cost: number
  payment_method: 'cash' | 'card' | 'credit' | 'bank_transfer' | 'yape' | 'plin'
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
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
}
