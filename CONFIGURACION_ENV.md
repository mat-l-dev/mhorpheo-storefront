# 🎯 Configuración de Variables de Entorno

Para que los métodos de pago funcionen correctamente, necesitas configurar las variables de entorno.

## Pasos:

1. **Copia el archivo `.env.example`:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edita `.env.local` con tus datos reales:**
   - Datos de la cuenta bancaria BCP
   - Números de teléfono de Yape y Plin
   - Habilita/deshabilita los métodos según necesites

3. **Ejemplo de `.env.local`:**
   ```env
   # BCP - Transferencia Bancaria
   NEXT_PUBLIC_PAYMENT_BCP_ENABLED=true
   NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_NUMBER=191-12345678-0-99
   NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_HOLDER=TU EMPRESA S.A.C.
   NEXT_PUBLIC_PAYMENT_BCP_RUC=20XXXXXXXXX
   NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_TYPE=Cuenta Corriente

   # Yape
   NEXT_PUBLIC_PAYMENT_YAPE_ENABLED=true
   NEXT_PUBLIC_PAYMENT_YAPE_NUMBER=987654321
   NEXT_PUBLIC_PAYMENT_YAPE_NAME=Tu Nombre

   # Plin
   NEXT_PUBLIC_PAYMENT_PLIN_ENABLED=true
   NEXT_PUBLIC_PAYMENT_PLIN_NUMBER=987654321
   NEXT_PUBLIC_PAYMENT_PLIN_NAME=Tu Nombre
   ```

4. **Reinicia el servidor:**
   ```bash
   pnpm dev
   ```

## 📝 Notas:

- El archivo `.env.local` NO debe subirse a Git (ya está en .gitignore)
- Usa `NEXT_PUBLIC_` prefix para variables que se usen en el cliente
- Si pones `ENABLED=false`, ese método de pago no aparecerá en el checkout

## 🔒 Seguridad:

⚠️ **IMPORTANTE:** Nunca expongas datos sensibles como claves privadas, tokens de API, o passwords en variables que empiecen con `NEXT_PUBLIC_`. Estas variables son visibles en el navegador del cliente.

Para datos sensibles, usa variables de entorno sin el prefijo `NEXT_PUBLIC_` y accede a ellas solo desde el servidor (Server Components o API Routes).
