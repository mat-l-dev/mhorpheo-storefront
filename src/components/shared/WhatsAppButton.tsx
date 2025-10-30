'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setShowTooltip(true)

      setTimeout(() => setShowTooltip(false), 5000)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
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
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Tooltip minimalista */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute bottom-full right-0 mb-3 w-56 rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/95"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute right-3 top-3 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Cerrar"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                  ¿Necesitas ayuda?
                </p>
                <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  Chatea con nosotros. Te respondemos en minutos.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón principal rediseñado */}
          <motion.button
            onClick={handleClick}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="h-6 w-6 text-white" strokeWidth={2} />

            {/* Glow effect sutil */}
            <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
          </motion.button>

          {/* Pulse ring sutil (solo al inicio) */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-green-500"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: 2,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
