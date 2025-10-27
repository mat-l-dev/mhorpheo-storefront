# Páginas Informativas Mhorpheo

## Resumen

Se han creado 7 páginas informativas profesionales con diseño estilo Apple (minimalista, espacios generosos, tipografía clara) para el e-commerce Mhorpheo.

---

## Páginas Creadas

### 1. `/nosotros` - Página Nosotros
**Archivo:** `src/app/nosotros/page.tsx`

**Características:**
- Hero section con parallax
- Sección "Nuestra Historia" con grid alternado
- Misión destacada con fondo negro
- Valores con iconos (Innovación, Calidad, Soporte)
- Sección "¿Por qué kits solares?" con beneficios listados
- Animaciones fade-in con framer-motion

**SEO:**
- Title: "Nosotros - Mhorpheo"
- Description optimizada
- Open Graph tags

---

### 2. `/contacto` - Página Contacto
**Archivo:** `src/app/contacto/page.tsx`

**Características:**
- Layout split: Formulario (izquierda) + Info de contacto (derecha)
- Formulario con validación Zod:
  - Nombre completo (requerido)
  - Email (requerido)
  - Teléfono (opcional)
  - Asunto (select)
  - Mensaje (textarea, requerido)
- Toast de confirmación (simulado)
- CTAs de WhatsApp para ventas y soporte
- Información de contacto detallada:
  - Emails: ventas.mhorpheo@example.com, soporte.mhorpheo@example.com
  - WhatsApp Ventas: +51 999 888 777
  - WhatsApp Soporte: +51 999 888 666
  - Horarios de atención
  - Ubicación

**Nota:** El formulario por ahora NO envía emails reales (solo simulación)

---

### 3. `/terminos` - Términos y Condiciones
**Archivo:** `src/app/terminos/page.tsx`

**Características:**
- Layout de artículo (max-w-4xl)
- Fecha de última actualización
- Secciones:
  1. Uso del Sitio
  2. Productos y Servicios
  3. Proceso de Compra
  4. Métodos de Pago
  5. Política de Envíos
  6. Garantías
  7. Limitación de Responsabilidad
  8. Modificaciones
  9. Contacto
- Anclas para cada sección (#uso-del-sitio, etc.)
- Banner de advertencia (placeholder legal)
- Links de navegación al footer

**Advertencia:** Contenido placeholder - debe ser revisado por abogado

---

### 4. `/privacidad` - Política de Privacidad
**Archivo:** `src/app/privacidad/page.tsx`

**Características:**
- Layout de artículo (max-w-4xl)
- Fecha de última actualización
- Secciones GDPR-compliant:
  1. Información que Recopilamos
  2. Cómo Usamos tu Información
  3. Protección de Datos
  4. Compartir Información
  5. Tus Derechos
  6. Cookies
  7. Retención de Datos
  8. Transferencias Internacionales
  9. Menores de Edad
  10. Cambios a esta Política
  11. Contacto
- Anclas para cada sección
- Banner de advertencia (placeholder legal)
- Links de navegación al footer

**Advertencia:** Contenido placeholder - debe ser revisado por experto legal

---

### 5. `/faq` - Preguntas Frecuentes
**Archivo:** `src/app/faq/page.tsx`

**Características:**
- Buscador funcional de preguntas
- 5 categorías con iconos:
  1. 🛍️ Compra y Pago (4 preguntas)
  2. 📦 Productos (4 preguntas)
  3. 🚚 Envíos (4 preguntas)
  4. 🔧 Soporte y Garantía (3 preguntas)
  5. ⚡ Técnicas (4 preguntas)
- Componente Accordion de shadcn/ui
- Filtrado en tiempo real
- CTA final con botones de WhatsApp y Email
- Animaciones stagger para categorías

**Total:** 19 preguntas frecuentes

---

### 6. `/garantia` - Garantía
**Archivo:** `src/app/garantia/page.tsx`

**Características:**
- Hero con icono Shield
- Tabla de cobertura de garantía:
  - Paneles Solares: 5 años
  - Baterías: 2 años
  - Controlador MPPT: 2 años
  - Cables y conectores: 1 año
  - Mano de obra: 1 año
- Sección "¿Qué cubre?" vs "¿Qué NO cubre?"
- Proceso de garantía (5 pasos con timeline visual)
- Sección de Garantía Extendida (opcional):
  - +2 años: +15% del valor
  - +5 años: +25% del valor
  - Incluye mantenimiento preventivo anual
- Fondo negro para destacar garantía extendida

---

### 7. `/como-comprar` - Cómo Comprar
**Archivo:** `src/app/como-comprar/page.tsx`

**Características:**
- Hero con icono CheckCircle
- Timeline visual de 6 pasos:
  1. Elige tu kit
  2. Agrega al carrito
  3. Completa tus datos
  4. Realiza el pago
  5. Sube el comprobante
  6. Espera la verificación
- Cada paso incluye:
  - Icono representativo
  - Descripción detallada
  - Tip útil en recuadro destacado
- Sección "Métodos de Pago Detallados" con Accordion:
  - Transferencia Bancaria (BCP) - instrucciones paso a paso
  - Yape - instrucciones paso a paso
  - Plin - instrucciones paso a paso
- Banner de seguridad
- CTA de ayuda con contacto WhatsApp y email

---

## Componentes UI Creados

Se crearon los siguientes componentes de shadcn/ui:

1. **Input** (`src/components/ui/input.tsx`)
2. **Textarea** (`src/components/ui/textarea.tsx`)
3. **Select** (`src/components/ui/select.tsx`)
4. **Accordion** (`src/components/ui/accordion.tsx`)
5. **Toast** (`src/components/ui/toast.tsx`)
6. **Toaster** (`src/components/ui/toaster.tsx`)

## Hooks Creados

- **use-toast** (`src/hooks/use-toast.ts`) - Hook para mostrar notificaciones toast

---

## Actualizaciones al Footer

**Archivo:** `src/components/layout/Footer.tsx`

Se reorganizó el footer en 5 columnas:

1. **Logo y descripción** (igual)
2. **Enlaces Rápidos**
   - Home
   - Productos
   - Nosotros
   - Contacto
3. **Información** (NUEVO)
   - Cómo Comprar
   - Garantía
   - Preguntas Frecuentes
   - Soporte
4. **Legal**
   - Términos y Condiciones
   - Política de Privacidad
5. **Contacto**
   - Email: ventas.mhorpheo@example.com
   - Teléfono: +51 999 888 777
   - Redes sociales

---

## Dependencias Instaladas

```bash
pnpm add @radix-ui/react-select @radix-ui/react-accordion @radix-ui/react-toast zod
```

**Dependencias agregadas:**
- `@radix-ui/react-select` - Para componente Select
- `@radix-ui/react-accordion` - Para componente Accordion (FAQ)
- `@radix-ui/react-toast` - Para sistema de notificaciones
- `zod` - Para validación de formularios

---

## Diseño y Estilo

### Filosofía de Diseño: Apple-like

- **Minimalismo:** Espacios en blanco generosos, sin saturación visual
- **Tipografía:** Grande y legible (text-3xl a text-6xl para títulos)
- **Colores:** Negro/blanco con acentos sutiles de primary
- **Transiciones:** Suaves y elegantes (300ms)
- **Responsive:** Mobile-first

### Animaciones (framer-motion)

- **Fade in** al scroll (viewport triggers)
- **Slide up** para secciones
- **Stagger** para listas y grids
- **Scale** en hover de botones

### Layout Patterns

- **Max container:** max-w-7xl para contenido general
- **Artículos:** max-w-4xl para páginas legales
- **Padding:** px-4 sm:px-6 lg:px-8
- **Secciones:** py-16 sm:py-24

---

## Información de Contacto (Placeholders)

**Emails:**
- ventas.mhorpheo@example.com
- soporte.mhorpheo@example.com
- privacidad.mhorpheo@example.com
- legal.mhorpheo@example.com

**WhatsApp:**
- Ventas: +51 999 888 777
- Soporte: +51 999 888 666

**Horario:**
- Lunes a Viernes: 9:00 AM - 6:00 PM
- Sábados: 9:00 AM - 1:00 PM
- (Hora de Perú - GMT-5)

**Ubicación:**
- Lima, Perú (Envíos a todo el país)

**Datos Bancarios (Placeholder):**
- Banco: BCP
- Cuenta: 193-XXXXXXXX-X-XX
- Titular: Mhorpheo SAC
- RUC: 20XXXXXXXXX

---

## SEO

Todas las páginas incluyen:

```typescript
export const metadata: Metadata = {
  title: 'Título - Mhorpheo',
  description: 'Descripción optimizada (150-160 caracteres)',
  openGraph: {
    title: 'Título',
    description: 'Descripción',
    images: ['/og-image.jpg'],
  },
}
```

---

## Notas Importantes

### ⚠️ Pendientes de Implementación

1. **Formulario de Contacto:** Implementar envío real de emails (actualmente solo toast simulado)
2. **Contenido Legal:** Revisar Términos y Política de Privacidad con abogado
3. **Imágenes:** Reemplazar placeholders con fotos reales de productos/kits
4. **Datos Bancarios:** Actualizar con información real antes de producción
5. **Emails y Teléfonos:** Actualizar con contactos reales

### 🎨 Personalizaciones Sugeridas

- Agregar fotos profesionales en sección "Nosotros"
- Video testimonial de clientes en zona rural
- Galería de instalaciones en "Garantía"
- Chat widget integrado (opcional)

### 🚀 Optimizaciones Futuras

- Implementar tabla de contenidos flotante en páginas legales
- Agregar breadcrumbs para navegación
- Sistema de tickets para soporte
- Base de conocimientos expandida (más FAQs)

---

## Testing

Para probar las páginas localmente:

```bash
cd mhorpheo-store
pnpm dev
```

Navegar a:
- http://localhost:3001/nosotros
- http://localhost:3001/contacto
- http://localhost:3001/terminos
- http://localhost:3001/privacidad
- http://localhost:3001/faq
- http://localhost:3001/garantia
- http://localhost:3001/como-comprar

---

## Estructura Final

```
src/app/
├── nosotros/
│   └── page.tsx ✅
├── contacto/
│   └── page.tsx ✅
├── terminos/
│   └── page.tsx ✅
├── privacidad/
│   └── page.tsx ✅
├── faq/
│   └── page.tsx ✅
├── garantia/
│   └── page.tsx ✅
└── como-comprar/
    └── page.tsx ✅
```

---

**Fecha de Creación:** 27 de octubre de 2025  
**Total de Páginas:** 7  
**Total de Componentes UI:** 6  
**Total de Hooks:** 1
