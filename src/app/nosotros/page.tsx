'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Headphones } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-black to-zinc-900">
        <div className="absolute inset-0 bg-[url('/assets/hero-nosotros.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            className="mb-6 text-5xl font-bold text-white sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Conectando lo imposible
          </motion.h1>
          <motion.p
            className="mx-auto max-w-3xl text-xl text-zinc-300 sm:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Llevamos internet Starlink a donde nadie más llega
          </motion.p>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-950 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                <p>
                  Mhorpheo nació de una necesidad real: llevar conectividad de
                  alta velocidad a comunidades rurales y remotas del Perú.
                  Mientras Starlink revolucionaba el internet satelital, nos
                  dimos cuenta de que faltaba una pieza: la energía.
                </p>
                <p>
                  En zonas sin red eléctrica, tener Starlink era imposible. Así
                  creamos nuestros kits solares: soluciones completas que
                  combinan energía limpia y conectividad global.
                </p>
                <p>
                  Hoy, ayudamos a familias, escuelas, postas médicas y negocios
                  en zonas remotas a conectarse con el mundo.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="relative h-[400px] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                {/* Placeholder para imagen */}
                <span className="text-sm">Kit solar en zona rural</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión */}
      <section className="bg-black py-16 text-white sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Nuestra Misión
            </h2>
            <p className="text-xl leading-relaxed text-zinc-300 sm:text-2xl">
              Hacer que la distancia y la falta de infraestructura no sean
              obstáculos para acceder a internet de alta velocidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-16 text-center text-4xl font-bold sm:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Nuestros Valores
          </motion.h2>
          <motion.div
            className="grid gap-8 md:grid-cols-3 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Innovación</h3>
              <p className="leading-relaxed text-muted-foreground">
                Soluciones únicas para problemas reales
              </p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp}>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Calidad</h3>
              <p className="leading-relaxed text-muted-foreground">
                Componentes certificados con garantía extendida
              </p>
            </motion.div>

            <motion.div className="text-center" variants={fadeInUp}>
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Headphones className="h-10 w-10 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold">Soporte</h3>
              <p className="leading-relaxed text-muted-foreground">
                Acompañamiento técnico completo
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ¿Por qué kits solares? */}
      <section className="bg-zinc-50 px-4 py-16 dark:bg-zinc-900 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              className="relative h-[400px] overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                {/* Placeholder para imagen */}
                <span className="text-sm">Panel solar + Starlink</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                ¿Por qué kits solares?
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                Starlink requiere energía constante (50-75W en promedio). En
                zonas sin red eléctrica, los generadores son ruidosos,
                contaminantes y costosos.
              </p>
              <div className="space-y-3 text-lg">
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-green-500">✅</span>
                  <span>Energía limpia y silenciosa 24/7</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-green-500">✅</span>
                  <span>Autonomía de hasta 48 horas sin sol</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-green-500">✅</span>
                  <span>Cero costo operativo después de instalación</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 text-green-500">✅</span>
                  <span>Amigables con el medio ambiente</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
