# 🚀 QUICK START - Verificación de Fixes UX

## Iniciar el servidor de desarrollo

```bash
cd mhorpheo-store
npm run dev
```

## ✅ Testing Checklist Rápido

### 1. Hero de Nosotros (/nosotros)
- [ ] Abrir http://localhost:3000/nosotros
- [ ] ✅ Hero **NO** debe verse 100% negro al cargar
- [ ] ✅ Debe tener un gradiente visible desde el inicio
- [ ] ✅ Transición suave de 0.8s

### 2. Animaciones FAQ (/faq)
- [ ] Abrir http://localhost:3000/faq
- [ ] ✅ Las categorías deben aparecer con **stagger** (una tras otra)
- [ ] ✅ Delay de 0.1s entre cada categoría
- [ ] ✅ Breadcrumbs con espacio superior (pt-8)

### 3. Animaciones Términos (/terminos)
- [ ] Abrir http://localhost:3000/terminos
- [ ] ✅ Contenido debe hacer **fade-in** al cargar
- [ ] ✅ Animación de 0.6s
- [ ] ✅ Breadcrumbs con espacio superior

### 4. Animaciones Privacidad (/privacidad)
- [ ] Abrir http://localhost:3000/privacidad
- [ ] ✅ Contenido debe hacer **fade-in** al cargar (igual que términos)
- [ ] ✅ Breadcrumbs con espacio superior

### 5. Spacing en TODAS las páginas
- [ ] Verificar `/nosotros`
- [ ] Verificar `/contacto`
- [ ] Verificar `/faq`
- [ ] Verificar `/garantia`
- [ ] Verificar `/como-comprar`
- [ ] Verificar `/terminos`
- [ ] Verificar `/privacidad`

**Verificar en cada una:**
- ✅ Breadcrumbs **NO pegados** al header (tienen pt-8)
- ✅ Contenido con padding generoso (py-12 sm:py-16)

### 6. Botón WhatsApp (en cualquier página)

**Al cargar la página:**
- [ ] ✅ Botón aparece después de 3 segundos
- [ ] ✅ Hace **2 pulsos** (no infinito)
- [ ] ✅ Tooltip aparece automáticamente
- [ ] ✅ Tooltip desaparece después de 5 segundos

**Diseño del botón:**
- [ ] ✅ Posición: esquina inferior derecha (bottom-8 right-8)
- [ ] ✅ Tamaño: h-14 w-14 (más grande)
- [ ] ✅ Color: Verde sutil (gradiente 500-600)
- [ ] ✅ Shadow suave (no muy pronunciada)

**Tooltip:**
- [ ] ✅ Backdrop blur (efecto glassmorphism)
- [ ] ✅ Border sutil
- [ ] ✅ Esquinas redondeadas (rounded-2xl)
- [ ] ✅ Botón X para cerrar funciona

**Interacciones:**
- [ ] ✅ Hover: scale 1.05 + shadow más grande
- [ ] ✅ Click: scale 0.95 (efecto tap)
- [ ] ✅ Glow effect verde sutil en hover
- [ ] ✅ Abre WhatsApp correctamente

---

## 🐛 Problemas Conocidos

### Si el botón no aparece:
1. Esperar 3 segundos
2. Verificar que estás en una página que lo incluya
3. Revisar la consola del navegador

### Si las animaciones no funcionan:
1. Verificar que framer-motion está instalado: `npm list framer-motion`
2. Limpiar caché: `rm -rf .next`
3. Reiniciar dev server

---

## 📱 Testing en Móvil

### Responsive (resize ventana):
- [ ] ✅ Botón WhatsApp se ve bien en mobile
- [ ] ✅ Tooltip se adapta en pantallas pequeñas
- [ ] ✅ Spacing se mantiene consistente
- [ ] ✅ Animaciones funcionan igual

---

## ✅ Aprobación Final

Una vez verificados todos los puntos:

- [ ] Hero de Nosotros visible desde inicio ✅
- [ ] Animaciones stagger en FAQ ✅
- [ ] Fade-in en Términos y Privacidad ✅
- [ ] Spacing consistente en todas las páginas ✅
- [ ] Botón WhatsApp rediseñado funciona ✅

**Proyecto listo para deploy:** ✅ / ❌

---

**Última actualización:** 29 de octubre de 2025
