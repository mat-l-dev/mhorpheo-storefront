'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  {
    icon: Zap,
    title: 'Envío Gratis',
    description: 'En todos tus pedidos a nivel nacional',
  },
  {
    icon: Shield,
    title: 'Garantía Extendida',
    description: '12 meses de garantía en todos nuestros productos',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Asistencia técnica cuando la necesites',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-gradient-to-b from-white to-gray-50 pt-20 dark:from-black dark:to-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-4xl space-y-8 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold leading-tight text-black dark:text-white md:text-6xl lg:text-7xl"
            >
              Energía para tu{' '}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Starlink
              </span>
              , donde sea
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400 md:text-2xl"
            >
              Kits solares completos diseñados para zonas remotas sin
              electricidad. Mantén tu conexión activa 24/7.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-black px-8 py-6 text-lg text-white transition-all duration-300 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Ver Productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/nosotros">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 px-8 py-6 text-lg transition-all duration-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-900"
                >
                  Conocer Más
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Gradient Blur Circles */}
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-500/10" />
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-20 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl">
              Productos Destacados
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
              Explora nuestros kits solares más populares
            </p>
          </motion.div>

          {/* Placeholder para productos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900"
              >
                <p className="text-gray-400 dark:text-gray-600">Producto {i}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/productos">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 dark:border-gray-700"
              >
                Ver Todos los Productos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-gray-300 dark:border-gray-800 dark:bg-black dark:hover:border-gray-700"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-black dark:bg-white">
                    <Icon className="h-7 w-7 text-white dark:text-black" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-20 dark:bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <h2 className="text-3xl font-bold text-white dark:text-black md:text-4xl">
              ¿Listo para llevar energía a cualquier lugar?
            </h2>
            <p className="text-xl text-gray-300 dark:text-gray-700">
              Contáctanos y te ayudaremos a elegir el kit perfecto para tus
              necesidades
            </p>
            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-white px-8 py-6 text-lg text-black transition-all duration-300 hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900"
              >
                Contactar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
