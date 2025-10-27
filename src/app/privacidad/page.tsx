import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad - Mhorpheo',
  description:
    'Política de privacidad y protección de datos personales de Mhorpheo. Información sobre cómo recopilamos, usamos y protegemos tu información.',
  openGraph: {
    title: 'Política de Privacidad - Mhorpheo',
    description:
      'Política de privacidad y protección de datos personales de Mhorpheo.',
    images: ['/og-image.jpg'],
  },
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <article className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
            Política de Privacidad
          </h1>
          <p className="text-sm text-muted-foreground">
            <strong>Última actualización:</strong> 27 de octubre de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            En Mhorpheo, valoramos y respetamos tu privacidad. Esta política
            describe cómo recopilamos, usamos y protegemos tu información
            personal.
          </p>

          <h2 id="informacion-recopilamos">1. Información que Recopilamos</h2>

          <h3>1.1 Información que nos proporcionas:</h3>
          <ul>
            <li>Nombre completo</li>
            <li>Email</li>
            <li>Teléfono</li>
            <li>Dirección de envío</li>
            <li>Información de pago (número de operación)</li>
          </ul>

          <h3>1.2 Información recopilada automáticamente:</h3>
          <ul>
            <li>Dirección IP</li>
            <li>Tipo de navegador</li>
            <li>Páginas visitadas</li>
            <li>Tiempo de permanencia</li>
            <li>Cookies (ver sección 6)</li>
          </ul>

          <h2 id="como-usamos">2. Cómo Usamos tu Información</h2>
          <p>Utilizamos tu información para:</p>
          <ul>
            <li>Procesar y confirmar tus pedidos</li>
            <li>Enviarte actualizaciones sobre tu compra</li>
            <li>Mejorar nuestro servicio</li>
            <li>Cumplir con obligaciones legales</li>
            <li>Comunicaciones de marketing (con tu consentimiento)</li>
          </ul>

          <h2 id="proteccion-datos">3. Protección de Datos</h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información:
          </p>
          <ul>
            <li>Encriptación SSL/TLS</li>
            <li>Almacenamiento seguro en servidores certificados</li>
            <li>Acceso restringido a datos personales</li>
            <li>Auditorías de seguridad regulares</li>
          </ul>

          <h2 id="compartir-informacion">4. Compartir Información</h2>
          <p>
            <strong>NO vendemos ni alquilamos</strong> tu información personal a
            terceros.
          </p>
          <p>Podemos compartir datos con:</p>
          <ul>
            <li>Proveedores de servicios de pago (con cifrado)</li>
            <li>Empresas de logística (solo dirección de envío)</li>
            <li>Autoridades (cuando la ley lo requiera)</li>
          </ul>

          <h2 id="tus-derechos">5. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>✅ Acceder a tus datos personales</li>
            <li>✅ Rectificar información incorrecta</li>
            <li>✅ Solicitar eliminación de datos</li>
            <li>✅ Oponerte al procesamiento</li>
            <li>✅ Portabilidad de datos</li>
            <li>✅ Revocar consentimientos</li>
          </ul>
          <p>
            Para ejercer estos derechos, contacta:{' '}
            <a
              href="mailto:privacidad.mhorpheo@example.com"
              className="text-primary hover:underline"
            >
              privacidad.mhorpheo@example.com
            </a>
          </p>

          <h2 id="cookies">6. Cookies</h2>
          <p>Usamos cookies para:</p>
          <ul>
            <li>Mantener tu sesión activa</li>
            <li>Recordar tu carrito de compras</li>
            <li>Analizar el uso del sitio (Google Analytics)</li>
            <li>Mejorar la experiencia de usuario</li>
          </ul>
          <p>
            Puedes deshabilitar cookies en tu navegador, pero algunas funciones
            pueden verse afectadas.
          </p>

          <h2 id="retencion-datos">7. Retención de Datos</h2>
          <p>Conservamos tus datos:</p>
          <ul>
            <li>Órdenes: 5 años (obligación fiscal)</li>
            <li>Cuenta de usuario: Hasta que solicites eliminación</li>
            <li>Cookies: Según configuración de tu navegador</li>
          </ul>

          <h2 id="transferencias-internacionales">
            8. Transferencias Internacionales
          </h2>
          <p>
            Algunos de nuestros proveedores pueden estar fuera de Perú. Nos
            aseguramos de que cumplan con estándares de protección equivalentes.
          </p>

          <h2 id="menores-edad">9. Menores de Edad</h2>
          <p>
            No recopilamos intencionalmente información de menores de 18 años.
          </p>

          <h2 id="cambios-politica">10. Cambios a esta Política</h2>
          <p>
            Notificaremos cambios significativos por email y actualizaremos la
            fecha de &ldquo;Última actualización&rdquo;.
          </p>

          <h2 id="contacto">11. Contacto</h2>
          <p>Para consultas sobre privacidad:</p>
          <ul>
            <li>
              Email:{' '}
              <a
                href="mailto:privacidad.mhorpheo@example.com"
                className="text-primary hover:underline"
              >
                privacidad.mhorpheo@example.com
              </a>
            </li>
            <li>WhatsApp: +51 999 888 666</li>
          </ul>

          <div className="mt-12 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/20">
            <p className="mb-0 text-sm text-amber-800 dark:text-amber-200">
              <strong>Nota:</strong> Este documento es un placeholder. Debe ser
              revisado por un experto legal antes del lanzamiento oficial.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex flex-col justify-between gap-4 border-t pt-8 sm:flex-row">
          <Link href="/terminos" className="text-primary hover:underline">
            ← Términos y Condiciones
          </Link>
          <Link href="/contacto" className="text-primary hover:underline">
            ¿Preguntas? Contáctanos →
          </Link>
        </div>
      </article>
    </div>
  )
}
