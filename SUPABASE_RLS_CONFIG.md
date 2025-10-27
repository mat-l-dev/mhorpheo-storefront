# 🔧 CONFIGURACIÓN SUPABASE REQUERIDA - URGENTE

## ⚠️ Error Actual
```
Error: new row violates row-level security policy
```

Este error indica que las políticas RLS (Row Level Security) no permiten que usuarios anónimos inserten datos.

---

## 🛠️ SOLUCIONES - Ejecuta estos SQLs en Supabase

### 1️⃣ Storage Bucket: `payment-proofs`

#### A. Crear el Bucket (si no existe)
1. Ve a **Storage** en Supabase
2. Click **"New bucket"**
3. Nombre: `payment-proofs`
4. Public: **✅ SÍ** (marcar checkbox)
5. Click **"Create bucket"**

#### B. Políticas del Bucket
Ve a **Storage > payment-proofs > Policies** y ejecuta:

```sql
-- Permitir SUBIR archivos (INSERT) de forma anónima
CREATE POLICY "Allow anonymous uploads to payment-proofs"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'payment-proofs');

-- Permitir LEER archivos (SELECT) públicamente
CREATE POLICY "Allow public read payment-proofs"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'payment-proofs');
```

---

### 2️⃣ Tabla: `customers`

Ve a **SQL Editor** y ejecuta:

```sql
-- Permitir INSERT anónimo en customers
CREATE POLICY "Allow anonymous insert customers"
ON public.customers
FOR INSERT
TO anon
WITH CHECK (true);

-- Permitir UPDATE para usuarios autenticados y anónimos
CREATE POLICY "Allow update own customer"
ON public.customers
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
```

---

### 3️⃣ Tabla: `orders`

```sql
-- Permitir INSERT anónimo en orders
CREATE POLICY "Allow anonymous insert orders"
ON public.orders
FOR INSERT
TO anon
WITH CHECK (true);

-- Permitir SELECT de propias órdenes
CREATE POLICY "Allow read own orders"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (true);
```

---

### 4️⃣ Tabla: `order_items`

```sql
-- Permitir INSERT anónimo en order_items
CREATE POLICY "Allow anonymous insert order_items"
ON public.order_items
FOR INSERT
TO anon
WITH CHECK (true);

-- Permitir SELECT de propios items
CREATE POLICY "Allow read own order_items"
ON public.order_items
FOR SELECT
TO anon, authenticated
USING (true);
```

---

### 5️⃣ Tabla: `products` (solo lectura)

```sql
-- Permitir SELECT público de productos
CREATE POLICY "Allow public read products"
ON public.products
FOR SELECT
TO public
USING (published = true);
```

---

## ✅ CHECKLIST - Ejecuta en orden

- [ ] 1. Crear bucket `payment-proofs` (público)
- [ ] 2. Aplicar políticas del bucket (INSERT + SELECT)
- [ ] 3. Aplicar política de `customers` (INSERT + UPDATE)
- [ ] 4. Aplicar política de `orders` (INSERT + SELECT)
- [ ] 5. Aplicar política de `order_items` (INSERT + SELECT)
- [ ] 6. Aplicar política de `products` (SELECT público)
- [ ] 7. Verificar que RLS está HABILITADO en todas las tablas

---

## 🔍 Verificar RLS está Habilitado

En **Table Editor**, para cada tabla:
1. Click en la tabla
2. Ve a pestaña **"RLS"**
3. Asegúrate que **"Enable RLS"** esté **activado** (switch verde)

---

## 🧪 Probar después de configurar

1. Reinicia el servidor: `pnpm dev`
2. Ve a `/checkout`
3. Llena el formulario
4. Sube comprobante
5. Click "Finalizar Pedido"
6. Debería funcionar sin errores

---

## 📝 Notas Importantes

### Seguridad
Estas políticas permiten operaciones anónimas porque es un e-commerce público. Es normal y seguro para este caso de uso.

### Si necesitas más restricciones
Puedes agregar validaciones adicionales en las políticas, por ejemplo:
- Limitar tamaño de archivos
- Validar formato de email
- Limitar cantidad de órdenes por IP (requiere extensión)

---

## 🆘 Si sigue sin funcionar

Verifica en **SQL Editor**:

```sql
-- Ver todas las políticas de una tabla
SELECT * FROM pg_policies WHERE tablename = 'customers';
SELECT * FROM pg_policies WHERE tablename = 'orders';
SELECT * FROM pg_policies WHERE tablename = 'order_items';

-- Ver políticas del storage
SELECT * FROM storage.policies WHERE bucket_id = 'payment-proofs';
```

---

## 🚀 Alternativa Rápida (Desarrollo ONLY)

Si quieres probar RÁPIDO sin políticas detalladas (SOLO DESARROLLO):

```sql
-- ADVERTENCIA: Esto deshabilita RLS completamente
-- NO USAR EN PRODUCCIÓN

ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
```

**⚠️ NO recomendado para producción**, pero útil para testear.

---

**Ejecuta estos SQLs y avísame cuando termines para probar el checkout.**
