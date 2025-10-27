# 🚀 GUÍA RÁPIDA: Configuración del Checkout

## Pasos para poner en funcionamiento el checkout

### 1️⃣ Configurar Variables de Entorno

Editar `.env.local` y agregar:

```env
# Costo de envío
NEXT_PUBLIC_SHIPPING_COST=15

# Transferencia Bancaria BCP
NEXT_PUBLIC_PAYMENT_BCP_ENABLED=true
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_NUMBER=191-XXXXXXXX-X-XX
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_HOLDER=Mhorpheo E.I.R.L.
NEXT_PUBLIC_PAYMENT_BCP_RUC=20XXXXXXXXX
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_TYPE=Cuenta Corriente

# Yape
NEXT_PUBLIC_PAYMENT_YAPE_ENABLED=true
NEXT_PUBLIC_PAYMENT_YAPE_NUMBER=+51 9XX XXX XXX
NEXT_PUBLIC_PAYMENT_YAPE_NAME=Mhorpheo Store

# Plin
NEXT_PUBLIC_PAYMENT_PLIN_ENABLED=true
NEXT_PUBLIC_PAYMENT_PLIN_NUMBER=+51 9XX XXX XXX
NEXT_PUBLIC_PAYMENT_PLIN_NAME=Mhorpheo Store
```

**⚠️ Importante**: Reemplaza las X con tus datos reales.

---

### 2️⃣ Crear Storage Bucket en Supabase

1. Ve a tu proyecto en Supabase
2. Click en "Storage" en el menú lateral
3. Click en "Create a new bucket"
4. Nombre: `payment-proofs`
5. Public bucket: **✅ Yes** (para obtener URLs públicas)
6. Click "Create bucket"

#### Configurar Políticas RLS del Bucket

En la pestaña "Policies" del bucket `payment-proofs`:

```sql
-- Permitir uploads anónimos
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'payment-proofs');

-- Permitir lectura pública
CREATE POLICY "Allow public access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');
```

---

### 3️⃣ Configurar Políticas RLS de Tablas

#### Tabla `customers`
```sql
-- Permitir insertar clientes anónimos
CREATE POLICY "Allow anonymous insert customers"
ON public.customers FOR INSERT
TO anon
WITH CHECK (true);
```

#### Tabla `orders`
```sql
-- Permitir insertar órdenes anónimas
CREATE POLICY "Allow anonymous insert orders"
ON public.orders FOR INSERT
TO anon
WITH CHECK (true);
```

#### Tabla `order_items`
```sql
-- Permitir insertar order items anónimos
CREATE POLICY "Allow anonymous insert order_items"
ON public.order_items FOR INSERT
TO anon
WITH CHECK (true);
```

---

### 4️⃣ (Opcional) Crear Función de Stock

En Supabase SQL Editor:

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

### 5️⃣ Reiniciar Servidor de Desarrollo

```bash
# Detener servidor actual (Ctrl+C)
# Luego reiniciar:
pnpm dev
```

---

## ✅ Testing

### Probar Flujo Completo

1. **Agregar productos al carrito**
   - Ir a `/productos`
   - Click en un producto
   - Agregar al carrito

2. **Ir al carrito**
   - Click en ícono de carrito en header
   - Verificar productos
   - Click "Proceder al Checkout"

3. **Llenar formulario de checkout**
   - **Paso 1**: Información del cliente
     - Nombre: `Juan Pérez`
     - Email: `juan@example.com`
     - Teléfono: `+51 987654321` o `987654321`
     - Dirección: `Av. Los Pinos 123, San Isidro, Lima`
   
   - **Paso 2**: Método de pago
     - Seleccionar BCP / Yape / Plin
     - Copiar datos de cuenta
   
   - **Paso 3**: Comprobante
     - Subir imagen (max 5MB, JPG/PNG/WEBP)
     - Número de operación: `001234567890`
     - Notas (opcional)

4. **Finalizar pedido**
   - Click "Finalizar Pedido"
   - Esperar confirmación
   - Verificar redirect a `/orders/[id]`

5. **Verificar en Supabase**
   - Tabla `orders`: nueva orden con estado `pending_verification`
   - Tabla `order_items`: items de la orden
   - Storage `payment-proofs`: comprobante subido
   - Tabla `products`: stock reducido (si función existe)

---

## 🐛 Troubleshooting

### Error: "Cannot find module '@/hooks/use-toast'"
✅ **Resuelto**: Se removió dependencia, usa estado local.

### Error: "payment-proofs bucket does not exist"
❌ **Solución**: Crear bucket en Supabase (paso 2)

### Error: "RLS policy violation"
❌ **Solución**: Configurar políticas RLS (paso 3)

### Variables de entorno no funcionan
❌ **Solución**: 
1. Reiniciar servidor de desarrollo
2. Verificar que empiecen con `NEXT_PUBLIC_`
3. Verificar archivo `.env.local` en la raíz

### El stock no se reduce
⚠️ **Normal**: La función SQL es opcional. Si no existe, el servidor continúa sin error.

---

## 📱 Rutas Disponibles

- `/checkout` - Página de checkout
- `/orders/[id]` - Confirmación de orden
- `/carrito` - Carrito de compras
- `/productos` - Lista de productos
- `/productos/[slug]` - Detalle de producto

---

## 🎯 Próximos Pasos Recomendados

1. **Personalizar datos de pago** en `.env.local`
2. **Agregar validación de email** en backend (opcional)
3. **Configurar emails transaccionales** (SendGrid, Resend, etc.)
4. **Panel de admin** ya existe en `/mhorpheo-admin` para verificar pagos

---

**¿Necesitas ayuda?** Revisa `PROMPT_4_COMPLETADO.md` para documentación completa.
