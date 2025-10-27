import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Formatea un número como precio en soles peruanos (PEN)
 * @param price - El precio a formatear
 * @returns El precio formateado como string (ej: "S/ 1,234.50")
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(price)
}
