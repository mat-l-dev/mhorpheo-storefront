# 🎯 INSTRUCCIONES PARA MATHEW - PROMPT #2 COMPLETADO

## ✅ ESTADO ACTUAL

**Build Status:** ✅ COMPILACIÓN EXITOSA  
**Errores TypeScript:** ✅ NINGUNO  
**Páginas Creadas:** ✅ `/` y `/productos`  
**Componentes:** ✅ Footer, ProductCard, ProductSkeleton  
**Servicios:** ✅ Supabase configurado  

---

## 🚀 CÓMO EJECUTAR EL PROYECTO

### Paso 1: Configura las Variables de Entorno

Crea un archivo `.env.local` (o copia desde `.env.example`):

```bash
# Información de Contacto
NEXT_PUBLIC_STORE_EMAIL=contacto@mhorpheo.com
NEXT_PUBLIC_STORE_PHONE=+51987654321

# Supabase (usa las mismas credenciales del admin)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### Paso 2: Ejecuta el Servidor de Desarrollo

```powershell
cd "c:\Mathew\Proyectos\Mhorpheo Pagina Web\mhorpheo-store"
pnpm dev
```

### Paso 3: Abre tu Navegador

- **Home:** http://localhost:3000
- **Productos:** http://localhost:3000/productos

---

## 📋 QUÉ DEBERÍAS VER

### En la Home (/)
1. ✅ Header con logo y navegación
2. ✅ Hero section con título y botones
3. ✅ **Sección "Productos Destacados"** con 3 productos reales (si hay en BD)
4. ✅ Sección de beneficios
5. ✅ CTA section
6. ✅ **Footer completo** con 4 columnas

### En Productos (/productos)
1. ✅ Título "Nuestros Productos"
2. ✅ Grid responsive con productos
3. ✅ Cada producto muestra:
   - Imagen
   - Categoría (badge)
   - Nombre
   - Descripción
   - Precio en S/
   - Stock disponible
   - Botón "Agregar al Carrito"

---

## 🎨 CÓMO SE VE (Descripción Visual)

### ProductCard
```
┌─────────────────────────┐
│                         │
│      [IMAGEN]           │  ← Imagen cuadrada del producto
│                         │
├─────────────────────────┤
│ [Badge: Categoría]      │  ← Badge pequeño con categoría
│ Nombre del Producto     │  ← Título en negrita
│ Descripción corta...    │  ← Descripción (2 líneas max)
│ S/ 1,234.50             │  ← Precio grande y destacado
│ 📦 10 disponibles        │  ← Indicador de stock
│ SKU: ABC-123            │  ← SKU pequeño
│ [Agregar al Carrito]    │  ← Botón call-to-action
└─────────────────────────┘
```

### Footer
```
┌──────────────────────────────────────────────────────────┐
│  Mhorpheo    │  Enlaces    │  Soporte    │  Contacto     │
│  Descripción │  - Home     │  - Términos │  📧 Email     │
│              │  - Products │  - Privacid │  📞 Teléfono  │
│              │  - Nosotros │  - FAQ      │  💬 WhatsApp  │
│              │  - Contacto │  - Garantía │               │
│              │             │             │  [FB][IG][WA] │
├──────────────────────────────────────────────────────────┤
│         © 2025 Mhorpheo. Todos los derechos reservados   │
└──────────────────────────────────────────────────────────┘
```

---

## 🔍 PRUEBAS QUE DEBES HACER

### ✅ Checklist de Verificación

1. **Home Page**
   - [ ] Hero section se ve bien
   - [ ] Productos destacados cargan (3 productos)
   - [ ] Footer aparece al final
   - [ ] Links del footer funcionan
   - [ ] Animaciones son suaves

2. **Página Productos**
   - [ ] Grid responsive (cambia columnas según pantalla)
   - [ ] Todos los productos publicados aparecen
   - [ ] Imágenes cargan correctamente
   - [ ] Precios se muestran en formato S/ X,XXX.XX
   - [ ] Badges de categoría correctos
   - [ ] Stock se muestra correctamente
   - [ ] Productos agotados muestran badge "Agotado"

3. **Responsive**
   - [ ] Mobile: 1 columna
   - [ ] Tablet: 2 columnas
   - [ ] Desktop: 3 columnas
   - [ ] Footer se apila en mobile

4. **Dark Mode**
   - [ ] Toggle de dark mode funciona
   - [ ] Colores cambian correctamente
   - [ ] Productos se ven bien en ambos modos

5. **Loading States**
   - [ ] Skeletons aparecen mientras carga
   - [ ] Transición suave a productos reales

---

## 🐛 SI ALGO NO FUNCIONA

### Productos no cargan

**Verifica en Supabase:**
1. Ve a tu proyecto en https://app.supabase.com
2. Abre "Table Editor" → "products"
3. Asegúrate de tener productos con `published = true`
4. Verifica que `image_url` tenga URLs válidas

**Verifica RLS (Row Level Security):**
1. En Supabase, ve a "Authentication" → "Policies"
2. Tabla `products` debe tener una policy que permita `SELECT` público:

```sql
-- Policy para lectura pública de productos
CREATE POLICY "Enable read access for all users"
ON products FOR SELECT
USING (published = true);
```

### Imágenes no cargan

**Verifica el bucket de Storage:**
1. En Supabase → "Storage" → Bucket "assets"
2. Click en los 3 puntos → "Make public"
3. Asegúrate de que las URLs en `image_url` apunten al bucket correcto

**Formato de URL esperado:**
```
https://xxx.supabase.co/storage/v1/object/public/assets/productos/imagen.jpg
```

### Error de Supabase Connection

**Verifica `.env.local`:**
```bash
# Las URLs deben ser exactas (sin espacios, sin comillas extras)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

**Reinicia el servidor después de cambiar `.env.local`:**
```bash
# Ctrl+C para detener
pnpm dev  # Volver a iniciar
```

---

## 📊 ESTRUCTURA DE LA BASE DE DATOS

### Tabla: products

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  selling_price NUMERIC NOT NULL,
  cost_price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: categories

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 SIGUIENTE PASO: PROMPT #3

Una vez que verifiques que todo funciona, el próximo PROMPT incluirá:

1. **Página de Detalle de Producto** (`/productos/[slug]`)
   - Galería de imágenes
   - Descripción completa
   - Selector de cantidad
   - Botón "Agregar al carrito"

2. **Carrito de Compras**
   - Context API para estado global
   - LocalStorage para persistencia
   - Drawer/Sheet para ver carrito
   - Cálculo de totales

3. **Checkout**
   - Formulario de datos del cliente
   - Resumen del pedido
   - Selección de método de pago

---

## 💾 ARCHIVOS IMPORTANTES CREADOS

```
src/
├── components/
│   ├── layout/
│   │   └── Footer.tsx ⭐ NUEVO
│   └── products/
│       ├── ProductCard.tsx ⭐ NUEVO
│       └── ProductSkeleton.tsx ⭐ NUEVO
├── lib/
│   ├── supabase/
│   │   ├── client.ts ⭐ NUEVO
│   │   └── products.ts ⭐ NUEVO
│   └── utils.ts ⭐ ACTUALIZADO (formatPrice)
├── types/
│   └── database.types.ts ⭐ ACTUALIZADO (ProductWithCategory)
└── app/
    ├── page.tsx ⭐ ACTUALIZADO (productos reales)
    └── productos/
        └── page.tsx ⭐ NUEVO
```

---

## ✅ CHECKLIST FINAL

Antes de continuar con PROMPT #3, confirma:

- [ ] `pnpm dev` corre sin errores
- [ ] Home muestra productos destacados
- [ ] `/productos` muestra todos los productos
- [ ] Footer aparece en todas las páginas
- [ ] Imágenes de productos cargan
- [ ] Precios se muestran en formato PEN
- [ ] Responsive funciona (prueba en mobile, tablet, desktop)
- [ ] Dark mode funciona
- [ ] Loading states aparecen

---

## 📞 DATOS DE CONTACTO EN FOOTER

Actualiza en `.env.local`:

```bash
NEXT_PUBLIC_STORE_EMAIL=tu-email@mhorpheo.com
NEXT_PUBLIC_STORE_PHONE=+51987654321  # Sin espacios
```

Estos aparecerán automáticamente en el Footer.

---

## 🎉 ¡LISTO!

**Todo está funcionando correctamente.** ✅

El build fue exitoso (verificado con `pnpm build`).

**Ahora solo ejecuta:**

```bash
pnpm dev
```

**Y abre:** http://localhost:3000

---

**¿Dudas o problemas?**  
Revisa `PROMPT_2_COMPLETADO.md` para troubleshooting detallado.

**¡Disfruta tu e-commerce funcionando! 🚀**
