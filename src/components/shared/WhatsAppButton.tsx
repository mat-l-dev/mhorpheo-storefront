'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Mostrar después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setShowTooltip(true)

      // Ocultar tooltip después de 5 segundos
      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    // Número de WhatsApp para ventas
    const phoneNumber = '51999888777'
    const message = encodeURIComponent(
      'Hola, vengo de la web de Mhorpheo y tengo una consulta.',
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-4 w-64 rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  aria-label="Cerrar tooltip"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  ¿Necesitas ayuda?
                </p>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Chatea con nosotros por WhatsApp. Respondemos en minutos.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal */}
          <Button
            onClick={handleClick}
            size="lg"
            className="h-16 w-16 rounded-full bg-green-500 shadow-lg hover:bg-green-600 hover:shadow-xl dark:bg-green-600 dark:hover:bg-green-700"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          {/* Pulse animation */}
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-400 opacity-75" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
