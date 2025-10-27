# ⚡ QUICK FIX - Supabase RLS

## 🔴 Problema Actual
Error: `new row violates row-level security policy`

## ✅ Solución Rápida (copia y pega en Supabase SQL Editor)

```sql
-- 1. STORAGE: payment-proofs
CREATE POLICY "anon_upload_payment_proofs"
ON storage.objects FOR INSERT TO anon
WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "public_read_payment_proofs"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'payment-proofs');

-- 2. TABLA: customers
CREATE POLICY "anon_insert_customers"
ON public.customers FOR INSERT TO anon
WITH CHECK (true);

-- 3. TABLA: orders
CREATE POLICY "anon_insert_orders"
ON public.orders FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "anon_read_orders"
ON public.orders FOR SELECT TO anon
USING (true);

-- 4. TABLA: order_items
CREATE POLICY "anon_insert_order_items"
ON public.order_items FOR INSERT TO anon
WITH CHECK (true);
```

## 📋 Pasos

1. **Crear bucket** (si no existe):
   - Storage > New bucket > `payment-proofs` > **Public: ✅**

2. **Pegar SQL** arriba en SQL Editor > Run

3. **Reiniciar**: `pnpm dev`

4. **Probar** checkout nuevamente

---

**Ver `SUPABASE_RLS_CONFIG.md` para documentación completa.**
