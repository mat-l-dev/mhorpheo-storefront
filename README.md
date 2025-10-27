# 🚀 Mhorpheo Storefront

E-commerce de kits solares para Starlink. Permite a clientes comprar kits de energía solar, realizar pagos mediante transferencia/Yape/Plin, y hacer seguimiento de sus pedidos.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** shadcn/ui
- **Animaciones:** Framer Motion
- **Backend:** Supabase (Database + Storage + Auth)
- **State Management:** React Context (Carrito)
- **Validación:** Zod
- **Analytics:** Vercel Analytics
- **Testing:** Jest + React Testing Library

---

## 📋 Características

### ✅ Funcionalidades Principales
- Catálogo de productos con categorías
- Carrito de compras con persistencia (localStorage)
- Checkout con pago manual (Transferencia, Yape, Plin)
- Upload de comprobante de pago
- Tracking de pedidos por email
- Dark mode completo
- Responsive design (mobile-first)
- WhatsApp integration (botón flotante)
- SEO optimizado (metadata, Open Graph, robots.txt)
- Breadcrumbs navigation

### 🎨 Componentes UI
- Product cards con animaciones
- Carrito de compras interactivo
- Formularios validados con Zod
- Toast notifications (Sonner)
- Loading skeletons
- Modal dialogs
- Payment method selector
- File upload para comprobantes

### � Páginas
- `/` - Home con hero y productos destacados
- `/productos` - Catálogo completo
- `/productos/[slug]` - Detalle de producto
- `/carrito` - Carrito de compras
- `/checkout` - Proceso de pago
- `/orders/[id]` - Confirmación y tracking
- `/nosotros` - Información de la empresa
- `/contacto` - Formulario de contacto
- `/como-comprar` - Guía de compra
- `/garantia` - Información de garantía
- `/faq` - Preguntas frecuentes
- `/terminos` - Términos y condiciones
- `/privacidad` - Política de privacidad

---

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 18.17.0
- pnpm 8 (recomendado) o npm
- Cuenta en Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/mat-l-dev/mhorpheo-storefront.git
cd mhorpheo-storefront
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Pagos
NEXT_PUBLIC_PAYMENT_BCP_ACCOUNT_NUMBER=123-456789-0-12
NEXT_PUBLIC_PAYMENT_YAPE_NUMBER=999999999
NEXT_PUBLIC_PAYMENT_PLIN_NUMBER=999999999

# Contacto
NEXT_PUBLIC_STORE_EMAIL=ventas@mhorpheo.com
NEXT_PUBLIC_WHATSAPP_NUMBER=51999888777
```

### 4. Configurar Supabase

Ver el archivo `SUPABASE_RLS_CONFIG.md` para instrucciones completas de configuración de la base de datos.

### 5. Ejecutar en desarrollo
```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

---

## 📦 Scripts Disponibles

- `pnpm dev` — Inicia la aplicación en modo desarrollo en `http://localhost:3000`
- `pnpm build` — Crea un build optimizado de producción
- `pnpm start` — Inicia la aplicación en modo producción
- `pnpm type-check` — Valida el código con TypeScript compiler
- `pnpm lint` — Ejecuta ESLint para todos los archivos en `src`
- `pnpm format-check` — Verifica problemas de formato con Prettier
- `pnpm format` — Formatea archivos con Prettier
- `pnpm test` — Ejecuta todos los tests de Jest
- `pnpm test:ci` — Ejecuta tests en modo CI
- `pnpm analyze` — Construye el proyecto y abre el bundle analyzer

---

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Coverage
pnpm test:coverage
```

---

## 📂 Estructura del Proyecto

```
mhorpheo-store/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (pages)/            # Páginas del sitio
│   │   ├── layout.tsx          # Layout principal
│   │   └── globals.css         # Estilos globales
│   ├── components/             
│   │   ├── cart/               # Componentes del carrito
│   │   ├── checkout/           # Componentes de checkout
│   │   ├── layout/             # Header, Footer, etc.
│   │   ├── products/           # Product cards, grids
│   │   ├── shared/             # WhatsApp, Breadcrumbs
│   │   └── ui/                 # shadcn/ui components
│   ├── contexts/               
│   │   └── CartContext.tsx     # Estado global del carrito
│   ├── lib/
│   │   └── supabase/           # Cliente de Supabase
│   ├── actions/                # Server actions
│   ├── utils/                  # Utilidades
│   └── types/                  # TypeScript types
├── public/
│   ├── assets/                 # Imágenes
│   └── robots.txt              # SEO
├── .env.example                # Variables de entorno
└── README.md                   # Este archivo
```

---

## 📦 Deploy a Producción

### Deploy en Vercel (Recomendado)

1. **Conectar repositorio a Vercel**
   - Importa el proyecto desde GitHub
   - Vercel detectará automáticamente Next.js

2. **Configurar variables de entorno**
   - En Vercel Dashboard > Settings > Environment Variables
   - Agregar todas las variables de `.env.example`

3. **Deploy automático**
   - Cada push a `main` deployará automáticamente
   - O usa el comando: `vercel --prod`

### Deploy Manual

```bash
# Build de producción
pnpm build

# Preview local del build
pnpm start
```

---

## 🔗 Links Relacionados

- **Admin Dashboard:** [mhorpheo-admin](https://github.com/mat-l-dev/mhorpheo-admin)
- **Documentación Supabase:** Ver `SUPABASE_RLS_CONFIG.md`
- **Guía de Configuración:** Ver `CONFIGURACION_ENV.md`

---

## 🎯 Roadmap

### ✅ Completado
- [x] Sistema de productos y categorías
- [x] Carrito de compras
- [x] Checkout y pagos manuales
- [x] Upload de comprobantes
- [x] Tracking de pedidos
- [x] Dark mode
- [x] WhatsApp integration
- [x] SEO optimization
- [x] Breadcrumbs
- [x] Vercel Analytics

### 🚧 Próximas Funcionalidades
- [ ] Sistema de cupones/descuentos
- [ ] Pasarela de pago automatizada
- [ ] Notificaciones por email (Resend)
- [ ] Reviews de productos
- [ ] Wishlist/favoritos

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: nueva feature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto es privado y propietario.

© 2025 Mhorpheo. Todos los derechos reservados.

---

## 📞 Soporte

- **Email:** soporte@mhorpheo.com
- **WhatsApp:** +51 999 888 777
- **Website:** https://mhorpheo.com

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**Desarrollado con ❤️ por el equipo de Mhorpheo**

