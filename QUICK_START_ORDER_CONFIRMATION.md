# Guía Rápida: Sistema de Confirmación de Órdenes

## 🚀 Inicio Rápido

### Ver una Orden
```
URL: /orders/{orderId}
Ejemplo: /orders/550e8400-e29b-41d4-a716-446655440000
```

### Flujo del Usuario
1. Usuario completa checkout → `/checkout`
2. Sistema crea orden y redirige → `/orders/{id}`
3. Usuario ve confirmación con estado "Verificando pago"
4. Admin aprueba en panel → Estado cambia a "En proceso"
5. Timeline se actualiza mostrando progreso

---

## 📁 Estructura de Archivos

```
src/
├── app/
│   └── orders/
│       └── [id]/
│           ├── page.tsx          ← Página principal de orden
│           ├── loading.tsx       ← Estado de carga
│           └── not-found.tsx     ← Error 404
├── components/
│   └── orders/
│       ├── OrderStatusBadge.tsx  ← Badge de estado
│       ├── OrderTimeline.tsx     ← Timeline visual
│       └── OrderSummary.tsx      ← Resumen de pago
├── lib/
│   ├── supabase/
│   │   └── orders.ts             ← Servicio de órdenes
│   └── utils.ts                  ← formatDate() agregado
```

---

## 🎨 Componentes

### OrderStatusBadge
```tsx
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge'

<OrderStatusBadge status="pending_verification" />
```

Estados disponibles:
- `pending` → Gris
- `pending_verification` → Amarillo
- `processing` → Azul
- `delivered` → Verde
- `cancelled` → Rojo

---

### OrderTimeline
```tsx
import { OrderTimeline } from '@/components/orders/OrderTimeline'

<OrderTimeline currentStatus="processing" />
```

Muestra automáticamente:
- Pasos completados (verde)
- Paso actual con animación (amarillo pulsante)
- Pasos pendientes (gris)

---

### OrderSummary
```tsx
import { OrderSummary } from '@/components/orders/OrderSummary'

<OrderSummary subtotal={100} shipping={15} />
```

Calcula y muestra el total automáticamente.

---

## 🔧 Funciones Útiles

### getOrderById
```tsx
import { getOrderById } from '@/lib/supabase/orders'

const order = await getOrderById('uuid-aqui')

if (!order) {
  notFound()
}

// order contiene:
// - Datos de la orden
// - Información del cliente
// - Lista de productos con detalles
```

---

### formatDate
```tsx
import { formatDate } from '@/lib/utils'

const formatted = formatDate('2025-10-27T14:30:00')
// → "27 de octubre de 2025, 14:30"
```

---

## 📊 Estados de Orden

| Estado                  | Descripción                      | Color    | Timeline |
|------------------------|----------------------------------|----------|----------|
| `pending`              | Orden creada, pago pendiente     | Gris     | Paso 1   |
| `pending_verification` | Verificando comprobante de pago  | Amarillo | Paso 1   |
| `processing`           | Pago aprobado, preparando orden  | Azul     | Paso 3   |
| `delivered`            | Orden entregada al cliente       | Verde    | Paso 5   |
| `cancelled`            | Orden cancelada                  | Rojo     | X        |

---

## 🎯 Mensaje de Verificación

Se muestra automáticamente cuando `status === 'pending_verification'`:

```tsx
{order.status === 'pending_verification' && (
  <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
    {/* Mensaje amarillo con info de verificación */}
  </div>
)}
```

Incluye:
- ⏰ Tiempo estimado: 2-24 horas
- 📧 Email de notificación
- 📋 Explicación del proceso

---

## 🔍 Debugging

### Verificar que la orden existe
```tsx
// En la consola del navegador:
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('id', 'uuid-de-la-orden')
  .single()

console.log(data, error)
```

### Verificar RLS policies
```sql
-- En Supabase SQL Editor:
SELECT * FROM orders WHERE id = 'uuid-de-la-orden';
```

Si no retorna nada, revisar políticas RLS.

---

## 🎨 Personalización

### Cambiar colores del badge
Editar: `src/components/orders/OrderStatusBadge.tsx`

```tsx
const statusConfig = {
  pending_verification: {
    label: 'Verificando pago',
    variant: 'outline',
    className: 'bg-yellow-50 text-yellow-700 ...',
    // ↑ Cambiar colores aquí
  },
  // ...
}
```

### Modificar pasos del timeline
Editar: `src/components/orders/OrderTimeline.tsx`

```tsx
const steps: TimelineStep[] = [
  { id: 'created', label: 'Pedido realizado', description: '...' },
  // ↑ Agregar/modificar pasos aquí
]
```

### Ajustar layout de la página
Editar: `src/app/orders/[id]/page.tsx`

Grid principal:
```tsx
<div className="grid gap-8 lg:grid-cols-3">
  {/* 2 columnas para contenido */}
  <div className="lg:col-span-2">...</div>
  
  {/* 1 columna para sidebar */}
  <div>...</div>
</div>
```

---

## 📱 Responsive Breakpoints

- **Mobile**: Stack vertical de todas las secciones
- **Desktop (lg: 1024px+)**: Grid 2+1 columnas

```tsx
// Mobile first
<div className="space-y-6">
  {/* Stack vertical */}
</div>

// Desktop
<div className="lg:grid lg:grid-cols-3 lg:gap-8">
  {/* Grid de columnas */}
</div>
```

---

## ⚡ Performance

### Server Component
La página principal es un Server Component (sin 'use client'):
- Fetch de datos en el servidor
- SEO optimizado
- Metadata dinámica
- Sin JavaScript innecesario en el cliente

### Loading States
Next.js muestra automáticamente `loading.tsx` mientras carga `page.tsx`:
- Mejora perceived performance
- Evita layout shift
- UX más fluida

---

## 🔐 Seguridad

### Datos del Cliente
Todos los datos se obtienen desde Supabase con RLS:
- Solo se muestran órdenes existentes
- No se exponen datos sensibles
- Validación de UUID en el servidor

### Protección de Rutas
Si una orden no existe:
```tsx
if (!order) {
  notFound() // Next.js 404
}
```

---

## 📞 Soporte

### Problemas Comunes

**1. Orden no se encuentra**
- Verificar UUID válido
- Revisar RLS policies
- Confirmar orden existe en DB

**2. Imágenes no cargan**
- Verificar `image_url` en productos
- Revisar storage policies
- Fallback a icono Package (ya implementado)

**3. Timeline no actualiza**
- Refrescar página manualmente
- Verificar status de la orden
- Solo actualiza en cambio de estado

---

## ✅ Checklist de Testing

- [ ] Crear orden desde checkout
- [ ] Verificar redirección correcta
- [ ] Probar estado `pending_verification`
- [ ] Cambiar estado a `processing` (admin)
- [ ] Verificar timeline se actualiza
- [ ] Probar orden inexistente (404)
- [ ] Verificar responsive mobile
- [ ] Verificar responsive desktop
- [ ] Probar loading state
- [ ] Verificar todos los datos se muestran

---

## 🚀 Deploy

Antes de hacer deploy:
1. ✅ Verificar RLS policies en Supabase
2. ✅ Confirmar variables de entorno
3. ✅ Probar flujo completo en staging
4. ✅ Verificar imágenes de productos
5. ✅ Testar en mobile real

---

**Listo para usar** ✨

Para más detalles, ver: `ORDER_CONFIRMATION_IMPLEMENTATION.md`
