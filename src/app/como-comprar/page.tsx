'use client'

import { motion } from 'framer-motion'
import {
  ShoppingCart,
  FileText,
  CreditCard,
  Upload,
  Clock,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

const pasos = [
  {
    numero: 1,
    icon: ShoppingCart,
    titulo: 'Elige tu kit',
    descripcion:
      'Navega nuestro catálogo y selecciona el kit que se ajuste a tus necesidades.',
    tip: '¿No sabes cuál elegir? Usa nuestro chatbot de WhatsApp o contáctanos directamente. Te ayudamos a elegir el kit ideal según tu consumo.',
  },
  {
    numero: 2,
    icon: ShoppingCart,
    titulo: 'Agrega al carrito',
    descripcion:
      'Click en "Agregar al carrito". Puedes agregar múltiples productos.',
    tip: 'Los kits ya incluyen todo lo necesario. No necesitas comprar componentes adicionales.',
  },
  {
    numero: 3,
    icon: FileText,
    titulo: 'Completa tus datos',
    descripcion:
      'En el checkout, ingresa: nombre completo, email (recibirás confirmaciones aquí), teléfono, y dirección de envío completa.',
    tip: 'Asegúrate de que la dirección sea correcta. Esto evita retrasos.',
  },
  {
    numero: 4,
    icon: CreditCard,
    titulo: 'Realiza el pago',
    descripcion:
      'Selecciona tu método preferido: Transferencia Bancaria (BCP), Yape o Plin. Realiza el pago desde tu app bancaria.',
    tip: 'Guarda el comprobante o captura de pantalla.',
  },
  {
    numero: 5,
    icon: Upload,
    titulo: 'Sube el comprobante',
    descripcion:
      'En la misma página, sube captura o foto del comprobante y el número de operación. Click en "Finalizar Pedido".',
    tip: 'Recibirás un email de confirmación inmediatamente.',
  },
  {
    numero: 6,
    icon: Clock,
    titulo: 'Espera la verificación',
    descripcion:
      'Nuestro equipo verifica tu pago en 2-24 horas hábiles. Recibirás emails cuando: tu pago sea aprobado, tu pedido esté listo para envío, tu pedido esté en camino, y tu pedido sea entregado.',
    tip: '',
  },
]

const metodosPago = [
  {
    metodo: 'Transferencia Bancaria (BCP)',
    pasos: [
      'Ingresa a tu banca por internet o app',
      'Selecciona "Transferir a otras cuentas"',
      'Usa estos datos:\n- Banco: BCP\n- Cuenta: 193-XXXXXXXX-X-XX\n- Titular: Mhorpheo SAC\n- RUC: 20XXXXXXXXX',
      'Monto: El total de tu orden',
      'Guarda el comprobante',
    ],
  },
  {
    metodo: 'Yape',
    pasos: [
      'Abre tu app Yape',
      'Selecciona "Yapear"',
      'Ingresa: +51 999 888 777',
      'Monto: El total de tu orden',
      'En mensaje pon: Tu nombre + "Mhorpheo"',
      'Captura la pantalla de confirmación',
    ],
  },
  {
    metodo: 'Plin',
    pasos: [
      'Abre tu app de banco',
      'Selecciona Plin',
      'Ingresa: +51 999 888 666',
      'Monto: El total de tu orden',
      'Guarda el comprobante',
    ],
  },
]

export default function ComoComprarPage() {
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
            <CheckCircle className="mx-auto mb-6 h-20 w-20 text-primary" />
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
              Guía Paso a Paso
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              Comprar en Mhorpheo es simple y seguro
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline de pasos */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-12">
            {pasos.map((paso, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex flex-col items-start gap-6 md:flex-row">
                  {/* Icono y número */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <paso.icon className="h-10 w-10" />
                      </div>
                      <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                        {paso.numero}
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-grow">
                    <h3 className="mb-3 text-2xl font-bold">{paso.titulo}</h3>
                    <p className="mb-4 whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                      {paso.descripcion}
                    </p>
                    {paso.tip && (
                      <div className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-4">
                        <p className="text-sm">
                          <strong className="text-primary">💡 Tip:</strong>{' '}
                          {paso.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Línea conectora */}
                {idx < pasos.length - 1 && (
                  <div className="absolute bottom-0 left-10 top-20 -mb-12 hidden w-0.5 bg-border md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Métodos de Pago Detallados */}
      <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold sm:text-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Métodos de Pago Detallados
          </motion.h2>

          <Accordion type="single" collapsible className="w-full">
            {metodosPago.map((metodo, idx) => (
              <AccordionItem key={idx} value={`metodo-${idx}`}>
                <AccordionTrigger className="text-left text-xl">
                  {metodo.metodo}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="ml-6 space-y-3">
                    {metodo.pasos.map((paso, pIdx) => (
                      <li
                        key={pIdx}
                        className="whitespace-pre-line text-base leading-relaxed text-muted-foreground"
                      >
                        <span className="font-semibold text-foreground">
                          {pIdx + 1}.
                        </span>{' '}
                        {paso}
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Nota de seguridad */}
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>🔒 Seguridad:</strong> Nunca compartimos tu información
              bancaria. Los pagos se realizan directamente en tu app de banco.
              Solo necesitamos el comprobante para verificar tu transacción.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Ayuda */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="rounded-2xl bg-primary/5 p-8 text-center sm:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <MessageSquare className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
              ¿Necesitas ayuda?
            </h3>
            <p className="mb-8 text-lg text-muted-foreground">
              Nuestro equipo está listo para ayudarte en cualquier paso.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">WhatsApp:</span>
                <span>+51 999 888 777</span>
                <span className="text-sm">(respuesta en minutos)</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span className="font-semibold">Email:</span>
                <a
                  href="mailto:ventas.mhorpheo@example.com"
                  className="text-primary hover:underline"
                >
                  ventas.mhorpheo@example.com
                </a>
              </div>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 text-lg">
                <a
                  href="https://wa.me/51999888777?text=Hola,%20necesito%20ayuda%20con%20una%20compra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chatear por WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
