# ✅ Checklist de Verificación - PROMPT #3

## Pre-requisitos
- [ ] `pnpm dev` corre sin errores
- [ ] Servidor local en `http://localhost:3001`
- [ ] Supabase configurado y productos en la BD
- [ ] Variables de entorno configuradas

---

## 🏠 Home Page (/)
- [ ] Botón "Contactar Ahora" está centrado en sección CTA
- [ ] El botón tiene hover effect
- [ ] Todas las animaciones funcionan

---

## 📦 Lista de Productos (/productos)
- [ ] Se muestran todos los productos
- [ ] Cada ProductCard tiene botón "Agregar al Carrito"
- [ ] Badge de stock se muestra correctamente
- [ ] Productos agotados muestran "Agotado"
- [ ] Click en card redirige a detalle

---

## 🔍 Detalle de Producto (/productos/[slug])

### Layout
- [ ] Breadcrumbs visibles (Home > Productos > Nombre)
- [ ] Imagen grande a la izquierda (desktop)
- [ ] Info del producto a la derecha (desktop)
- [ ] Stack vertical en mobile

### Información
- [ ] Badge de categoría clickeable
- [ ] Nombre del producto (h1)
- [ ] Precio destacado y grande
- [ ] Descripción legible
- [ ] Badge de stock con color correcto:
  - [ ] Verde si stock > 10
  - [ ] Amarillo si stock 1-10
  - [ ] Rojo si stock = 0

### Interactividad
- [ ] QuantitySelector funciona
  - [ ] Botón `-` deshabilitado en 1
  - [ ] Botón `+` deshabilitado en stock máximo
  - [ ] Número se actualiza al hacer click
- [ ] Botón "Agregar al Carrito"
  - [ ] Funciona correctamente
  - [ ] Muestra toast de confirmación
  - [ ] Badge en header se actualiza
  - [ ] Dice "Agotado" si stock = 0

### Productos Relacionados
- [ ] Se muestran hasta 3 productos
- [ ] Son de la misma categoría
- [ ] No incluye el producto actual
- [ ] Click redirige a ese producto

---

## 🛒 Carrito (/carrito)

### Estado Vacío
- [ ] Icono de bolsa de compras grande
- [ ] Mensaje "Tu carrito está vacío"
- [ ] Botón "Ver Productos" funciona
- [ ] Diseño centrado y elegante

### Con Items
- [ ] Se muestran todos los productos agregados
- [ ] Layout de 2 columnas en desktop
- [ ] Stack en mobile

### CartItemCard
- [ ] Imagen del producto visible
- [ ] Nombre clickeable (va a detalle)
- [ ] Precio unitario correcto
- [ ] Selector de cantidad funciona
  - [ ] Botón `-` reduce cantidad
  - [ ] Botón `+` aumenta cantidad
  - [ ] No permite más que el stock
  - [ ] No permite menos de 1
- [ ] Subtotal se calcula bien (precio × cantidad)
- [ ] Botón basura elimina el item
  - [ ] Muestra toast de confirmación
  - [ ] Item desaparece del carrito

### OrderSummary
- [ ] Card sticky en desktop
- [ ] Muestra subtotal correcto
- [ ] Muestra costo de envío ($0 o el configurado)
- [ ] Muestra total correcto
- [ ] Botón "Proceder al Checkout" visible
- [ ] Nota de seguridad visible con icono de candado

### Funcionalidad General
- [ ] Totales se actualizan en tiempo real
- [ ] Link "Continuar Comprando" funciona
- [ ] Animaciones suaves al cargar

---

## 🎯 Header (todos las páginas)

### Cart Badge
- [ ] Icono de carrito visible
- [ ] Badge rojo con número cuando hay items
- [ ] Número es correcto (suma de cantidades)
- [ ] Badge desaparece cuando carrito está vacío
- [ ] Click redirige a `/carrito`

### General
- [ ] Header sticky al hacer scroll
- [ ] Cambia de estilo al scrollear
- [ ] Navigation links funcionan
- [ ] Theme toggle funciona
- [ ] Mobile menu funciona

---

## 🔔 Notificaciones (Toasts)

### Agregar al Carrito
- [ ] Toast verde de éxito al agregar
- [ ] Mensaje: "Producto agregado al carrito"
- [ ] Se muestra arriba al centro
- [ ] Desaparece automáticamente (3-5 seg)

### Actualizar Cantidad
- [ ] Toast de éxito al actualizar
- [ ] Mensaje: "Cantidad actualizada en el carrito"

### Eliminar Item
- [ ] Toast de éxito al eliminar
- [ ] Mensaje: "Producto eliminado del carrito"

### Error de Stock
- [ ] Toast rojo de error
- [ ] Mensaje: "No hay suficiente stock disponible"
- [ ] Aparece cuando intentas agregar más del stock

---

## 💾 Persistencia

### localStorage
- [ ] Carrito se guarda automáticamente
- [ ] Al recargar página (F5), carrito persiste
- [ ] Al cerrar y abrir navegador, carrito persiste
- [ ] Key en localStorage: `mhorpheo-cart`
  - Verificar en DevTools → Application → Local Storage

---

## 📱 Responsive Design

### Mobile (< 640px)
- [ ] Header compacto con menu hamburguesa
- [ ] Product detail en stack vertical
- [ ] Cart items en lista vertical
- [ ] OrderSummary debajo de items
- [ ] Botones full-width
- [ ] Todo legible y usable

### Tablet (640px - 1024px)
- [ ] Layout se adapta bien
- [ ] Grid de 2 columnas en productos
- [ ] Spacing apropiado

### Desktop (> 1024px)
- [ ] Grid de 3-4 columnas en productos
- [ ] Product detail en 2 columnas
- [ ] Cart en 2 columnas (items + summary)
- [ ] OrderSummary sticky
- [ ] Hover effects visibles

---

## 🎨 Diseño y Animaciones

### Estilo
- [ ] Bordes redondeados (rounded-2xl, rounded-3xl)
- [ ] Spacing generoso y consistente
- [ ] Tipografía clara y legible
- [ ] Colores neutros con acentos
- [ ] Modo oscuro funciona bien

### Animaciones
- [ ] Fade in al cargar páginas
- [ ] Hover zoom en imágenes de productos
- [ ] Hover effects en botones
- [ ] Transitions suaves (no bruscas)
- [ ] Loading states en botones

---

## 🔐 Validaciones

### Stock Management
- [ ] No se puede agregar más del stock disponible
- [ ] Productos con stock 0 se deshabilitan
- [ ] Mensaje de error claro cuando excede stock
- [ ] Stock badge actualiza correctamente

### User Input
- [ ] Cantidad mínima siempre es 1
- [ ] Cantidad máxima es el stock disponible
- [ ] Botones se deshabilitan en límites
- [ ] Input de cantidad no es editable (solo botones)

---

## 🧪 Tests de Integración

### Flujo Completo 1: Agregar y Comprar
1. [ ] Ir a `/productos`
2. [ ] Click en un producto
3. [ ] Seleccionar cantidad 2
4. [ ] Agregar al carrito
5. [ ] Verificar toast
6. [ ] Verificar badge (debe ser 2)
7. [ ] Ir a carrito
8. [ ] Verificar que está el producto con cantidad 2
9. [ ] Verificar total correcto

### Flujo Completo 2: Modificar Carrito
1. [ ] Tener 1 producto en carrito
2. [ ] Ir a `/carrito`
3. [ ] Aumentar cantidad a 3
4. [ ] Verificar total actualizado
5. [ ] Verificar badge (debe ser 3)
6. [ ] Eliminar producto
7. [ ] Verificar estado vacío
8. [ ] Verificar badge desapareció

### Flujo Completo 3: Múltiples Productos
1. [ ] Agregar Producto A (cantidad 2)
2. [ ] Agregar Producto B (cantidad 1)
3. [ ] Agregar Producto C (cantidad 3)
4. [ ] Verificar badge (debe ser 6)
5. [ ] Ir a carrito
6. [ ] Verificar 3 items en lista
7. [ ] Verificar totales correctos
8. [ ] Eliminar Producto B
9. [ ] Verificar badge (debe ser 5)

### Flujo Completo 4: Persistencia
1. [ ] Agregar productos al carrito
2. [ ] Recargar página (F5)
3. [ ] Verificar que siguen en carrito
4. [ ] Cerrar navegador
5. [ ] Abrir navegador
6. [ ] Ir a la app
7. [ ] Verificar que siguen en carrito

---

## 🐛 Tests de Edge Cases

### Stock Límite
- [ ] Producto con stock 1
  - [ ] Agregar 1 unidad funciona
  - [ ] Intentar agregar otra da error
  - [ ] En carrito, botón `+` deshabilitado

### Stock 0
- [ ] Producto agotado
  - [ ] Botón dice "Agotado"
  - [ ] Botón está deshabilitado
  - [ ] Badge rojo "Agotado" visible
  - [ ] No se puede agregar al carrito

### Carrito Vacío
- [ ] Sin productos
  - [ ] Badge no aparece en header
  - [ ] Página carrito muestra empty state
  - [ ] CTA "Ver Productos" funciona

---

## ⚡ Performance

### Carga de Páginas
- [ ] Home carga en < 2 segundos
- [ ] Lista productos carga en < 2 segundos
- [ ] Detalle producto carga en < 1 segundo
- [ ] Carrito carga instantáneamente

### Imágenes
- [ ] Usan next/image
- [ ] Tienen sizes apropiados
- [ ] Lazy loading funciona
- [ ] Placeholder mientras cargan

### Interacciones
- [ ] Agregar al carrito es instantáneo
- [ ] Cambiar cantidad es instantáneo
- [ ] Navegación es fluida
- [ ] No hay lag visible

---

## 📊 Estado Final

**Total de checks:** ~150
**Checks completados:** ___ / 150

### Prioridad Alta (críticos)
- [ ] Agregar al carrito funciona
- [ ] Carrito persiste
- [ ] Badge actualiza correctamente
- [ ] Totales se calculan bien
- [ ] Validación de stock funciona

### Prioridad Media (importantes)
- [ ] Diseño responsive
- [ ] Animaciones suaves
- [ ] Toasts informativos
- [ ] Empty states

### Prioridad Baja (nice to have)
- [ ] Productos relacionados
- [ ] Hover effects
- [ ] Breadcrumbs
- [ ] Order summary sticky

---

## ✅ Signoff

**Fecha de verificación:** _______________

**Verificado por:** _______________

**Issues encontrados:** _______________

**Estado:** 
- [ ] ✅ Todo funciona perfectamente
- [ ] ⚠️ Algunos issues menores
- [ ] ❌ Necesita correcciones

**Notas adicionales:**
_________________________________________
_________________________________________
_________________________________________
