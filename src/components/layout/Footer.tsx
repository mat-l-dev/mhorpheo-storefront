'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Instagram, MessageCircle, Mail, Phone } from 'lucide-react'

const footerLinks = {
  quickLinks: [
    { href: '/', label: 'Home' },
    { href: '/productos', label: 'Productos' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
  ],
  legal: [
    { href: '/terminos', label: 'Términos y Condiciones' },
    { href: '/privacidad', label: 'Política de Privacidad' },
    { href: '/envios', label: 'Política de Envíos' },
    { href: '/devoluciones', label: 'Devoluciones' },
  ],
  social: [
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    {
      href: 'https://wa.me/51999999999',
      icon: MessageCircle,
      label: 'WhatsApp',
    },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-800 bg-black text-white dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Columna 1: Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold">Mhorpheo</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Energía solar confiable para tu Starlink. Llevamos conectividad a
              zonas remotas sin electricidad.
            </p>
          </motion.div>

          {/* Columna 2: Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 3: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Columna 4: Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:hola@mhorpheo.com"
                  className="transition-colors duration-200 hover:text-white"
                >
                  hola@mhorpheo.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+51999999999"
                  className="transition-colors duration-200 hover:text-white"
                >
                  +51 999 999 999
                </a>
              </li>
            </ul>

            {/* Redes Sociales */}
            <div className="mt-6 flex items-center space-x-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 border-t border-gray-800 pt-8 text-center"
        >
          <p className="text-sm text-gray-400">
            © {currentYear} Mhorpheo. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
