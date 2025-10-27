import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones - Mhorpheo',
  description:
    'Términos y condiciones de uso del sitio web y servicios de Mhorpheo. Información sobre compras, garantías y políticas comerciales.',
  openGraph: {
    title: 'Términos y Condiciones - Mhorpheo',
    description:
      'Términos y condiciones de uso del sitio web y servicios de Mhorpheo.',
    images: ['/og-image.jpg'],
  },
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-muted-foreground">
            <strong>Última actualización:</strong> 27 de octubre de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Bienvenido a Mhorpheo. Al acceder y usar este sitio web, aceptas
            cumplir con los siguientes términos y condiciones.
          </p>

          <h2 id="uso-del-sitio">1. Uso del Sitio</h2>
          <p>
            Este sitio web es operado por Mhorpheo. Los términos
            &ldquo;nosotros&rdquo;, &ldquo;nos&rdquo; y &ldquo;nuestro&rdquo; se
            refieren a Mhorpheo. Al visitar nuestro sitio y/o comprar algo de
            nosotros, participas en nuestro &ldquo;Servicio&rdquo; y aceptas
            estar vinculado por los siguientes términos y condiciones.
          </p>

          <h2 id="productos-servicios">2. Productos y Servicios</h2>
          <ul>
            <li>Todos los productos están sujetos a disponibilidad.</li>
            <li>
              Nos reservamos el derecho de limitar las cantidades de productos
              vendidos.
            </li>
            <li>Los precios están sujetos a cambios sin previo aviso.</li>
            <li>Todos los productos incluyen garantía del fabricante.</li>
          </ul>

          <h2 id="proceso-compra">3. Proceso de Compra</h2>
          <ul>
            <li>Las órdenes están sujetas a verificación de pago.</li>
            <li>Nos reservamos el derecho de rechazar cualquier orden.</li>
            <li>La confirmación de compra se enviará por email.</li>
            <li>
              Los tiempos de verificación de pago son de 2-24 horas hábiles.
            </li>
          </ul>

          <h2 id="metodos-pago">4. Métodos de Pago</h2>
          <p>Aceptamos:</p>
          <ul>
            <li>Transferencias bancarias (BCP)</li>
            <li>Yape</li>
            <li>Plin</li>
          </ul>
          <p>El pago debe realizarse previo a la entrega del producto.</p>

          <h2 id="politica-envios">5. Política de Envíos</h2>
          <ul>
            <li>Realizamos envíos a todo el Perú.</li>
            <li>Los tiempos de entrega varían según la ubicación.</li>
            <li>El costo de envío se calcula al momento del checkout.</li>
            <li>
              El cliente es responsable de proporcionar una dirección válida.
            </li>
          </ul>

          <h2 id="garantias">6. Garantías</h2>
          <p>Todos nuestros productos cuentan con:</p>
          <ul>
            <li>Garantía del fabricante</li>
            <li>Soporte técnico post-venta</li>
            <li>
              Devolución en caso de producto defectuoso (sujeto a evaluación)
            </li>
          </ul>

          <h2 id="limitacion-responsabilidad">
            7. Limitación de Responsabilidad
          </h2>
          <p>Mhorpheo no se hace responsable por:</p>
          <ul>
            <li>Daños indirectos o consecuenciales</li>
            <li>Pérdida de datos o beneficios</li>
            <li>Uso inadecuado de los productos</li>
          </ul>

          <h2 id="modificaciones">8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier
            momento. Los cambios entrarán en vigor inmediatamente después de su
            publicación.
          </p>

          <h2 id="contacto">9. Contacto</h2>
          <p>Para preguntas sobre estos términos, contacta a:</p>
          <p>
            <a
              href="mailto:legal.mhorpheo@example.com"
              className="text-primary hover:underline"
            >
              legal.mhorpheo@example.com
            </a>
          </p>

          <div className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <p className="mb-0 text-sm text-amber-800 dark:text-amber-200">
              <strong>Nota:</strong> Este documento es un placeholder. Debe ser
              revisado por un abogado antes del lanzamiento oficial.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t pt-8 sm:flex-row">
          <Link href="/privacidad" className="text-primary hover:underline">
            ← Política de Privacidad
          </Link>
          <Link href="/contacto" className="text-primary hover:underline">
            ¿Preguntas? Contáctanos →
          </Link>
        </div>
      </article>
    </div>
  )
}
