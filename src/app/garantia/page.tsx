'use client'

import { motion } from 'framer-motion'
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const garantias = [
  {
    componente: 'Paneles Solares',
    periodo: '5 años',
    cobertura: 'Defectos de fabricación, rendimiento >80%',
  },
  {
    componente: 'Baterías',
    periodo: '2 años',
    cobertura: 'Defectos de fabricación, ciclos de carga',
  },
  {
    componente: 'Controlador MPPT',
    periodo: '2 años',
    cobertura: 'Defectos eléctricos y electrónicos',
  },
  {
    componente: 'Cables y conectores',
    periodo: '1 año',
    cobertura: 'Defectos de fabricación',
  },
  {
    componente: 'Mano de obra',
    periodo: '1 año',
    cobertura: 'Instalación realizada por nuestro equipo',
  },
]

const cubre = [
  'Defectos de fabricación',
  'Fallas en componentes eléctricos/electrónicos',
  'Degradación prematura de rendimiento',
  'Mano de obra en reparaciones (durante periodo de garantía)',
  'Reemplazo de componentes defectuosos',
]

const noCubre = [
  'Daños por instalación inadecuada (no realizada por nosotros)',
  'Uso indebido o negligencia',
  'Daños por fenómenos naturales (rayos, inundaciones)',
  'Modificaciones no autorizadas',
  'Desgaste normal por uso',
]

const pasos = [
  {
    numero: '1',
    titulo: 'Contacta a soporte',
    descripcion: 'Envíanos un mensaje por WhatsApp o email',
  },
  {
    numero: '2',
    titulo: 'Describe el problema',
    descripcion: 'Proporciona fotos o videos del inconveniente',
  },
  {
    numero: '3',
    titulo: 'Evaluación remota',
    descripcion: 'Nuestro equipo técnico evaluará el caso',
  },
  {
    numero: '4',
    titulo: 'Solución',
    descripcion: 'Enviamos técnico o componente de reemplazo',
  },
  {
    numero: '5',
    titulo: 'Resolución',
    descripcion: 'Completamos la reparación en 5-10 días hábiles',
  },
]

export default function GarantiaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Shield className="mx-auto mb-6 h-20 w-20 text-primary" />
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Compra con Confianza
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Todos nuestros productos cuentan con garantía extendida y soporte
              técnico
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabla de Cobertura */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Cobertura de Garantía
          </motion.h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="px-6 py-4 text-left font-bold">Componente</th>
                  <th className="px-6 py-4 text-left font-bold">Garantía</th>
                  <th className="px-6 py-4 text-left font-bold">Cobertura</th>
                </tr>
              </thead>
              <tbody>
                {garantias.map((item, idx) => (
                  <motion.tr
                    key={idx}
                    className="border-b border-border transition-colors hover:bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <td className="px-6 py-4 font-medium">{item.componente}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                        {item.periodo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {item.cobertura}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Qué cubre / No cubre */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            {/* Cubre */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <h3 className="text-2xl font-bold">¿Qué cubre la garantía?</h3>
              </div>
              <ul className="space-y-3">
                {cubre.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-green-500">✅</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* No cubre */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <XCircle className="h-8 w-8 text-red-500" />
                <h3 className="text-2xl font-bold">¿Qué NO cubre?</h3>
              </div>
              <ul className="space-y-3">
                {noCubre.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 text-red-500">❌</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proceso de Garantía */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Proceso de Garantía
          </motion.h2>

          <div className="relative">
            {/* Línea conectora */}
            <div className="absolute bottom-0 left-8 top-0 hidden w-0.5 bg-border md:block" />

            <div className="space-y-8">
              {pasos.map((paso, idx) => (
                <motion.div
                  key={idx}
                  className="relative flex items-start gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {paso.numero}
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="mb-2 text-xl font-bold">{paso.titulo}</h3>
                    <p className="text-muted-foreground">{paso.descripcion}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Garantía Extendida */}
      <section className="bg-black px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <AlertCircle className="mx-auto mb-6 h-16 w-16 text-amber-400" />
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
              Garantía Extendida (opcional)
            </h2>
            <p className="mb-8 text-xl text-zinc-300">
              ¿Quieres mayor tranquilidad?
            </p>

            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-6">
                <div className="mb-2 text-3xl font-bold">+2 años</div>
                <div className="mb-4 text-lg">+15% del valor del kit</div>
                <p className="text-sm text-zinc-400">
                  Protección extendida hasta 4 años
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-6">
                <div className="mb-2 text-3xl font-bold">+5 años</div>
                <div className="mb-4 text-lg">+25% del valor del kit</div>
                <p className="text-sm text-zinc-400">
                  Protección extendida hasta 7 años
                </p>
              </div>
            </div>

            <p className="mb-8 text-lg text-zinc-300">
              <strong>Incluye:</strong> Mantenimiento preventivo anual sin costo
            </p>

            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-12 text-lg"
            >
              <a href="/contacto">Consultar Garantía Extendida</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
