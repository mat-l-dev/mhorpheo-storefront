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

/**
 * Formatea una fecha como string legible en español
 * @param dateString - La fecha en formato ISO string
 * @returns La fecha formateada (ej: "27 de octubre de 2025, 14:30")
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString))
}
