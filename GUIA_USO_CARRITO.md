# 🛒 Guía de Uso - Sistema de Carrito Mhorpheo

## Inicio Rápido

### 1. Verificar Variables de Entorno

Asegúrate de tener en tu `.env.local`:

```bash
# Costo de envío (0 = gratis)
NEXT_PUBLIC_SHIPPING_COST=0

# Supabase (ya deberías tenerlas)
NEXT_PUBLIC_SUPABASE_URL=tu-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
```

### 2. Ejecutar el Proyecto

```bash
cd mhorpheo-store
pnpm dev
```

El proyecto estará en: `http://localhost:3001`

---

## 🎯 Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Home con hero, features y productos destacados |
| `/productos` | Lista de todos los productos |
| `/productos/[slug]` | Detalle de producto individual |
| `/carrito` | Página del carrito de compras |
| `/nosotros` | Sobre la empresa (si existe) |
| `/contacto` | Formulario de contacto (si existe) |

---

## 🛍️ Flujo de Compra

### Paso 1: Explorar Productos
- Visita `/productos` para ver todos los productos
- Usa los filtros de categoría (si están disponibles)
- Click en "Ver Detalles" o en la imagen para ver más

### Paso 2: Ver Detalle de Producto
- URL: `/productos/[slug]` (ej: `/productos/kit-solar-basico`)
- Verás:
  - Imagen grande con hover zoom
  - Nombre y descripción
  - Precio destacado
  - Stock disponible (con badge de color)
  - Selector de cantidad (+/-)
  - Productos relacionados al final

### Paso 3: Agregar al Carrito
1. Selecciona la cantidad deseada con los botones +/-
2. Click en "Agregar al Carrito"
3. Verás un toast de confirmación
4. El badge en el header se actualiza automáticamente

### Paso 4: Ver el Carrito
- Click en el icono del carrito en el header
- O navega a `/carrito`
- Verás:
  - Lista de todos tus productos
  - Posibilidad de cambiar cantidades
  - Botón para eliminar items
  - Resumen con subtotal, envío y total

### Paso 5: Checkout (próximamente)
- Click en "Proceder al Checkout"
- Llenar datos de contacto y entrega
- Seleccionar método de pago
- Confirmar orden

---

## 🎨 Componentes Clave

### AddToCartButton

Usar en cualquier lugar donde quieras agregar un producto al carrito:

```tsx
import { AddToCartButton } from '@/components/products/AddToCartButton'

<AddToCartButton
  product={{
    id: "uuid",
    name: "Producto",
    slug: "producto-slug",
    image_url: "/image.jpg",
    selling_price: 1500,
    stock: 10
  }}
  quantity={1} // opcional, default 1
  variant="default" // default | outline | secondary | ghost
  size="default" // sm | default | lg
  className="w-full" // clases adicionales
/>
```

### QuantitySelector

Selector de cantidad con validación:

```tsx
import { QuantitySelector } from '@/components/products/QuantitySelector'

const [quantity, setQuantity] = useState(1)

<QuantitySelector
  productId="uuid"
  maxStock={10}
  onChange={setQuantity}
  initialQuantity={1}
/>
```

### useCart Hook

Acceder al carrito desde cualquier componente cliente:

```tsx
'use client'

import { useCart } from '@/contexts/CartContext'

function MyComponent() {
  const { 
    items,        // Array de items
    itemCount,    // Total de items
    total,        // Total en precio
    addToCart,    // Función para agregar
    removeFromCart, // Función para eliminar
    updateQuantity, // Función para actualizar cantidad
    clearCart     // Función para vaciar
  } = useCart()

  return (
    <div>
      <p>Items en carrito: {itemCount}</p>
      <p>Total: ${total}</p>
    </div>
  )
}
```

---

## 🧪 Testing Manual

### Test 1: Agregar Producto
1. ✅ Ve a un producto
2. ✅ Agrega 1 unidad
3. ✅ Verifica toast de confirmación
4. ✅ Verifica badge en header (debe ser 1)

### Test 2: Validación de Stock
1. ✅ Encuentra un producto con stock bajo (ej: 3 unidades)
2. ✅ Intenta agregar 5 unidades
3. ✅ Debe mostrar error y no agregar

### Test 3: Carrito Vacío
1. ✅ Vacía tu carrito (elimina todos los items)
2. ✅ Ve a `/carrito`
3. ✅ Debe mostrar estado vacío con CTA

### Test 4: Modificar Cantidades
1. ✅ Agrega un producto al carrito
2. ✅ Ve a `/carrito`
3. ✅ Cambia la cantidad con los botones +/-
4. ✅ Verifica que el subtotal y total se actualicen

### Test 5: Persistencia
1. ✅ Agrega productos al carrito
2. ✅ Recarga la página (F5)
3. ✅ Los productos deben seguir ahí

### Test 6: Responsive
1. ✅ Abre DevTools
2. ✅ Cambia a vista mobile
3. ✅ Navega por productos y carrito
4. ✅ Verifica que todo se vea bien

---

## 🔧 Configuración Avanzada

### Cambiar Costo de Envío

En `.env.local`:
```bash
NEXT_PUBLIC_SHIPPING_COST=50  # $50 por envío
```

### Modificar Key de localStorage

En `src/providers/CartProvider.tsx`:
```tsx
const CART_STORAGE_KEY = 'mi-nueva-key'
```

### Personalizar Toasts

En `src/app/layout.tsx`:
```tsx
<Toaster 
  position="bottom-right"  // Cambiar posición
  richColors 
  closeButton
/>
```

---

## 🐛 Troubleshooting

### El carrito no persiste
- Verifica que localStorage esté habilitado en tu navegador
- Abre DevTools → Application → Local Storage
- Busca la key `mhorpheo-cart`

### El badge no se actualiza
- El Header debe ser un Client Component (`'use client'`)
- Debe usar el hook `useCart()` correctamente
- Verifica que CartProvider esté en layout.tsx

### Errores de TypeScript
- Ejecuta: `pnpm run build` para ver errores
- Verifica que todos los imports sean correctos
- Los archivos en `/utils` y `/lib/supabase` deben existir

### Productos no cargan
- Verifica tu conexión a Supabase
- Revisa que la tabla `products` tenga datos
- Check las variables de entorno

---

## 📚 Próximas Funcionalidades

- [ ] Wishlist (guardar favoritos)
- [ ] Comparador de productos
- [ ] Quick view modal
- [ ] Cart drawer (slide-in)
- [ ] Stock notifications
- [ ] Descuentos y cupones

---

## 💡 Tips de UX

1. **Stock Bajo**: Los productos con stock <10 muestran badge amarillo
2. **Agotados**: Se deshabilitan automáticamente
3. **Confirmación Visual**: Siempre hay toast al agregar/eliminar
4. **Navegación Rápida**: Breadcrumbs en product detail
5. **Productos Relacionados**: Fomenta la exploración

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa los errores en la consola del navegador
2. Verifica los logs del servidor (terminal)
3. Comprueba que las variables de entorno estén bien
4. Revisa este documento de troubleshooting

**Fecha de creación:** Octubre 2025
**Versión del sistema:** 1.0.0
