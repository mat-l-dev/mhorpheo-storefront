'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, MapPin, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Selecciona un asunto'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

type ContactForm = z.infer<typeof contactSchema>

export default function ContactoPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validar con Zod
      contactSchema.parse(formData)

      // Simular envío (TODO: Implementar envío real de email)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: '¡Mensaje enviado!',
        description: 'Nos pondremos en contacto contigo pronto.',
      })

      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Error de validación',
          description: error.issues[0].message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Error',
          description:
            'Hubo un error al enviar el mensaje. Intenta nuevamente.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Contáctanos
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nombre completo *
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Teléfono (opcional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+51 999 888 777"
                  value={formData.phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="h-12"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Asunto *
                </label>
                <Select
                  value={formData.subject}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, subject: value })
                  }
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Consulta general</SelectItem>
                    <SelectItem value="soporte">Soporte técnico</SelectItem>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Email</h3>
                  <p className="text-muted-foreground">
                    ventas.mhorpheo@example.com
                  </p>
                  <p className="text-muted-foreground">
                    soporte.mhorpheo@example.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">WhatsApp Ventas</h3>
                  <p className="text-muted-foreground">+51 999 888 777</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">WhatsApp Soporte</h3>
                  <p className="text-muted-foreground">+51 999 888 666</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Horario de atención</h3>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-muted-foreground">
                    Sábados: 9:00 AM - 1:00 PM
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    (Hora de Perú - GMT-5)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">Ubicación</h3>
                  <p className="text-muted-foreground">Lima, Perú</p>
                  <p className="text-sm text-muted-foreground">
                    (Envíos a todo el país)
                  </p>
                </div>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <div className="mt-8 rounded-2xl bg-primary/5 p-8">
              <h3 className="mb-4 text-2xl font-bold">
                ¿Necesitas respuesta inmediata?
              </h3>
              <p className="mb-6 text-muted-foreground">
                Escríbenos por WhatsApp y te responderemos en minutos.
              </p>
              <div className="space-y-3">
                <Button asChild size="lg" className="w-full" variant="default">
                  <a
                    href="https://wa.me/51999888777?text=Hola,%20vengo%20de%20la%20web"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chatear por WhatsApp - Ventas
                  </a>
                </Button>
                <Button asChild size="lg" className="w-full" variant="outline">
                  <a
                    href="https://wa.me/51999888666?text=Hola,%20necesito%20soporte"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chatear por WhatsApp - Soporte
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
