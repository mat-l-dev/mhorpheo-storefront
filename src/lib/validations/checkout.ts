import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre es demasiado largo'),
  email: z.string().email('Email inválido'),
  phone: z
    .string()
    .regex(
      /^(\+51)?[\s]?9\d{8}$/,
      'Teléfono inválido (formato: +51 9XXXXXXXX o 9XXXXXXXX)',
    ),
  address: z
    .string()
    .min(10, 'La dirección debe tener al menos 10 caracteres')
    .max(500, 'La dirección es demasiado larga'),
  paymentMethod: z.enum(['bank_transfer', 'yape', 'plin']),
  operationNumber: z
    .string()
    .min(5, 'El número de operación debe tener al menos 5 caracteres')
    .max(50, 'El número de operación es demasiado largo'),
  paymentNotes: z
    .string()
    .max(500, 'Las notas son demasiado largas')
    .optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
