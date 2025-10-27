# ✅ CHECKLIST DE IMPLEMENTACIÓN - PROMPT #4

## Pre-requisitos
- [x] Código implementado (completado automáticamente)
- [x] Sin errores de compilación
- [x] Dependencia Zod instalada

---

## Configuración del Usuario

### 1. Variables de Entorno
- [ ] Abrir archivo `.env.local`
- [ ] Agregar/actualizar variables de pago (BCP, Yape, Plin)
- [ ] Reemplazar valores de ejemplo (XXX) con datos reales
- [ ] Guardar archivo
- [ ] Reiniciar servidor de desarrollo (`pnpm dev`)

**Archivo**: `.env.local`
```env
NEXT_PUBLIC_SHIPPING_COST=15
NEXT_PUBLIC_PAYMENT_BCP_ENABLED=true
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_NUMBER=...
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_HOLDER=...
NEXT_PUBLIC_PAYMENT_BCP_RUC=...
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_TYPE=...
NEXT_PUBLIC_PAYMENT_YAPE_ENABLED=true
NEXT_PUBLIC_PAYMENT_YAPE_NUMBER=...
NEXT_PUBLIC_PAYMENT_YAPE_NAME=...
NEXT_PUBLIC_PAYMENT_PLIN_ENABLED=true
NEXT_PUBLIC_PAYMENT_PLIN_NUMBER=...
NEXT_PUBLIC_PAYMENT_PLIN_NAME=...
```

---

### 2. Supabase Storage
- [ ] Ir a Supabase Dashboard
- [ ] Navegar a "Storage"
- [ ] Click "Create a new bucket"
- [ ] Nombre: `payment-proofs`
- [ ] Public bucket: ✅ Yes
- [ ] Click "Create bucket"
- [ ] Ir a pestaña "Policies"
- [ ] Ejecutar SQL para permitir uploads anónimos:

```sql
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');
```

---

### 3. Políticas RLS de Tablas
- [ ] Ir a Supabase SQL Editor
- [ ] Ejecutar políticas para `customers`:

```sql
CREATE POLICY "Allow anonymous insert customers"
ON public.customers FOR INSERT
TO anon
WITH CHECK (true);
```

- [ ] Ejecutar políticas para `orders`:

```sql
CREATE POLICY "Allow anonymous insert orders"
ON public.orders FOR INSERT
TO anon
WITH CHECK (true);
```

- [ ] Ejecutar políticas para `order_items`:

```sql
CREATE POLICY "Allow anonymous insert order_items"
ON public.order_items FOR INSERT
TO anon
WITH CHECK (true);
```

---

### 4. (Opcional) Función de Stock
- [ ] Ir a Supabase SQL Editor
- [ ] Ejecutar función:

```sql
CREATE OR REPLACE FUNCTION decrement_product_stock(
  product_id UUID,
  quantity INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE products
  SET stock = stock - quantity,
      updated_at = now()
  WHERE id = product_id
  AND stock >= quantity;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', product_id;
  END IF;
END;
$$;
```

---

## Testing

### Prueba 1: Checkout Básico
- [ ] Agregar productos al carrito
- [ ] Ir a `/carrito`
- [ ] Click "Proceder al Checkout"
- [ ] Llenar formulario del cliente
- [ ] Seleccionar método de pago
- [ ] Verificar que se muestren datos de cuenta
- [ ] Subir imagen de comprobante
- [ ] Ingresar número de operación
- [ ] Click "Finalizar Pedido"
- [ ] Verificar redirect a `/orders/[id]`
- [ ] Verificar que carrito se limpió

### Prueba 2: Validaciones
- [ ] Intentar submit sin llenar campos → Ver errores
- [ ] Intentar email inválido → Ver error de email
- [ ] Intentar teléfono inválido → Ver error de teléfono
- [ ] Intentar subir archivo muy grande → Ver error de tamaño
- [ ] Intentar subir archivo no imagen → Ver error de tipo

### Prueba 3: Métodos de Pago
- [ ] Probar checkout con Transferencia BCP
- [ ] Probar checkout con Yape
- [ ] Probar checkout con Plin
- [ ] Verificar botón "Copiar" funciona
- [ ] Verificar feedback visual al copiar

### Prueba 4: Base de Datos
- [ ] Verificar orden creada en tabla `orders`
- [ ] Verificar estado es `pending_verification`
- [ ] Verificar items en tabla `order_items`
- [ ] Verificar comprobante en Storage `payment-proofs`
- [ ] Verificar stock reducido (si función existe)

### Prueba 5: Responsive
- [ ] Probar en móvil (< 768px)
- [ ] Probar en tablet (768px - 1024px)
- [ ] Probar en desktop (> 1024px)
- [ ] Verificar scroll sticky del resumen

### Prueba 6: Dark Mode
- [ ] Cambiar a dark mode
- [ ] Verificar todos los componentes se ven bien
- [ ] Verificar contraste de textos
- [ ] Verificar colores de botones

---

## Verificación Final

### Funcionalidad
- [ ] Checkout carga correctamente
- [ ] Validaciones funcionan
- [ ] Upload de archivos funciona
- [ ] Orden se crea exitosamente
- [ ] Redirect funciona
- [ ] Carrito se limpia
- [ ] Página de confirmación muestra datos correctos

### UI/UX
- [ ] Diseño se ve profesional
- [ ] Espaciado es consistente
- [ ] Textos son legibles
- [ ] Botones responden al hover
- [ ] Loading states se muestran
- [ ] Errores son claros

### Performance
- [ ] Página carga rápido
- [ ] No hay warnings en consola
- [ ] No hay errores en consola
- [ ] Imágenes cargan correctamente

---

## Problemas Comunes

### ❌ Error: "payment-proofs bucket does not exist"
**Solución**: Crear bucket en Supabase (Paso 2)

### ❌ Error: "RLS policy violation"
**Solución**: Configurar políticas RLS (Paso 3)

### ❌ Variables no funcionan
**Solución**: 
1. Verificar que empiecen con `NEXT_PUBLIC_`
2. Reiniciar servidor de desarrollo
3. Verificar archivo `.env.local` en la raíz

### ❌ Stock no se reduce
**Solución**: Es opcional. Si quieres que funcione, ejecutar SQL del Paso 4.

---

## ✅ Completado

Una vez que hayas marcado todos los checkboxes anteriores:

- [ ] Todo está configurado correctamente
- [ ] Todas las pruebas pasan
- [ ] No hay errores en consola
- [ ] El flujo funciona de principio a fin

**¡Felicitaciones! El checkout está 100% funcional.** 🎉

---

## Próximos Pasos Opcionales

- [ ] Personalizar colores del tema
- [ ] Agregar emails transaccionales
- [ ] Integrar WhatsApp para notificaciones
- [ ] Agregar página de historial de órdenes
- [ ] Configurar Google Analytics
- [ ] Optimizar SEO

---

**Documentación de referencia**:
- `QUICK_START_PROMPT_4.md` - Guía detallada
- `PROMPT_4_COMPLETADO.md` - Documentación técnica
- `RESUMEN_PROMPT_4.md` - Resumen ejecutivo
