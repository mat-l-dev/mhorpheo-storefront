'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Package,
  Truck,
  Wrench,
  Zap,
  MessageSquare,
  Mail,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: 'compra-pago',
    title: 'Compra y Pago',
    icon: ShoppingCart,
    questions: [
      {
        q: '¿Cómo realizo una compra?',
        a: 'Simple: agrega productos al carrito, completa tus datos en el checkout, selecciona tu método de pago preferido, realiza la transferencia/pago, sube el comprobante y listo. Verificamos tu pago en 2-24 horas.',
      },
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos transferencias bancarias (BCP), Yape y Plin.',
      },
      {
        q: '¿Cuánto demora la verificación de pago?',
        a: 'Entre 2 y 24 horas hábiles. Te notificamos por email cuando sea aprobado.',
      },
      {
        q: '¿Puedo pagar en cuotas?',
        a: 'Por ahora solo aceptamos pago completo. Próximamente habilitaremos cuotas.',
      },
    ],
  },
  {
    id: 'productos',
    title: 'Productos',
    icon: Package,
    questions: [
      {
        q: '¿Qué incluyen los kits solares?',
        a: 'Nuestros kits incluyen: panel solar (potencia según modelo), batería de ciclo profundo, controlador de carga MPPT, cables y conectores, manual de instalación, y garantía extendida.',
      },
      {
        q: '¿Son compatibles con Starlink?',
        a: 'Sí, todos nuestros kits están diseñados específicamente para alimentar Starlink 24/7 con autonomía de hasta 48 horas sin sol.',
      },
      {
        q: '¿Cuánto duran las baterías?',
        a: 'Las baterías tienen una vida útil de 5-7 años con uso normal.',
      },
      {
        q: '¿Incluyen instalación?',
        a: 'La instalación básica está incluida en Lima. Para provincias, ofrecemos soporte remoto o instalación con costo adicional.',
      },
    ],
  },
  {
    id: 'envios',
    title: 'Envíos',
    icon: Truck,
    questions: [
      {
        q: '¿Hacen envíos a todo el Perú?',
        a: 'Sí, enviamos a todas las regiones del país.',
      },
      {
        q: '¿Cuánto cuesta el envío?',
        a: 'El costo varía según destino y peso. Se calcula automáticamente en el checkout.',
      },
      {
        q: '¿Cuánto demora el envío?',
        a: 'Lima: 2-3 días. Provincias: 5-10 días hábiles según ubicación.',
      },
      {
        q: '¿Puedo recoger en tienda?',
        a: 'Sí, ofrecemos recojo sin costo en nuestro almacén en Lima (previa coordinación).',
      },
    ],
  },
  {
    id: 'soporte-garantia',
    title: 'Soporte y Garantía',
    icon: Wrench,
    questions: [
      {
        q: '¿Qué garantía tienen los productos?',
        a: '2 años de garantía en componentes electrónicos, 5 años en paneles solares.',
      },
      {
        q: '¿Ofrecen soporte técnico?',
        a: 'Sí, soporte por WhatsApp, email y videollamada sin costo adicional.',
      },
      {
        q: '¿Qué pasa si un componente falla?',
        a: 'Lo evaluamos y si está en garantía, lo reemplazamos sin costo.',
      },
    ],
  },
  {
    id: 'tecnicas',
    title: 'Técnicas',
    icon: Zap,
    questions: [
      {
        q: '¿Cuántas horas de autonomía tienen?',
        a: 'Hasta 48 horas sin sol (depende del modelo y uso).',
      },
      {
        q: '¿Funcionan en días nublados?',
        a: 'Sí, aunque con menor eficiencia. Las baterías compensan la diferencia.',
      },
      {
        q: '¿Necesito conocimientos técnicos para instalar?',
        a: 'No, incluimos manual ilustrado y soporte remoto. La instalación es sencilla.',
      },
      {
        q: '¿Puedo expandir el sistema después?',
        a: 'Sí, todos nuestros kits son modulares y escalables.',
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar preguntas según búsqueda
  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Preguntas Frecuentes
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
            Encuentra respuestas rápidas a las preguntas más comunes
          </p>

          {/* Buscador */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="h-12 pl-10"
            />
          </div>
        </motion.div>

        {/* Categories & Questions */}
        <div className="space-y-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((question, qIdx) => (
                    <AccordionItem key={qIdx} value={`${category.id}-${qIdx}`}>
                      <AccordionTrigger className="text-left text-lg">
                        {question.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                        {question.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 rounded-2xl bg-primary/5 p-8 text-center sm:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
            ¿No encuentras tu respuesta?
          </h3>
          <p className="mb-8 text-lg text-muted-foreground">
            Contáctanos por WhatsApp o email. Respondemos en minutos.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 text-lg">
              <a
                href="https://wa.me/51999888777?text=Hola,%20vengo%20de%20la%20web"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 text-lg"
            >
              <a href="/contacto">
                <Mail className="mr-2 h-5 w-5" />
                Email
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
