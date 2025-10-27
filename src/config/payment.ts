export type PaymentMethod = {
  id: 'bank_transfer' | 'yape' | 'plin'
  name: string
  icon: string // nombre del componente de icono
  enabled: boolean
  details: {
    accountNumber?: string
    accountHolder?: string
    phoneNumber?: string
    name?: string
    ruc?: string
    accountType?: string
  }
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank_transfer',
    name: 'Transferencia Bancaria (BCP)',
    icon: 'Building2',
    enabled: process.env.NEXT_PUBLIC_PAYMENT_BCP_ENABLED === 'true',
    details: {
      accountNumber: process.env.NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_NUMBER,
      accountHolder: process.env.NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_HOLDER,
      ruc: process.env.NEXT_PUBLIC_PAYMENT_BCP_RUC,
      accountType: process.env.NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_TYPE,
    },
  },
  {
    id: 'yape',
    name: 'Yape',
    icon: 'Smartphone',
    enabled: process.env.NEXT_PUBLIC_PAYMENT_YAPE_ENABLED === 'true',
    details: {
      phoneNumber: process.env.NEXT_PUBLIC_PAYMENT_YAPE_NUMBER,
      name: process.env.NEXT_PUBLIC_PAYMENT_YAPE_NAME,
    },
  },
  {
    id: 'plin',
    name: 'Plin',
    icon: 'Smartphone',
    enabled: process.env.NEXT_PUBLIC_PAYMENT_PLIN_ENABLED === 'true',
    details: {
      phoneNumber: process.env.NEXT_PUBLIC_PAYMENT_PLIN_NUMBER,
      name: process.env.NEXT_PUBLIC_PAYMENT_PLIN_NAME,
    },
  },
]
