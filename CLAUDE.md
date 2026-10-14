# Demo «Norvia Suministros», portfolio de MN Design Web

Demo de portfolio de MN Design Web (Mariana; diseño web y software a medida, Cocentaina, Alicante): la web de un
almacén distribuidor de material eléctrico, fontanería y suministro industrial para profesionales de Alcoy y comarca
(l'Alcoià, El Comtat, Ibi).

## Dónde se usa
- La captura de la primera pantalla de la portada (1440×900) va en el hero de la landing «Diseño web en Alcoy»
  (mndesignweb.es/alcoi/), dentro de un marco de navegador sobre un fondo pastel lila/rosa/cian con efecto glass.
- También en el carrusel de proyectos y, más adelante, en una landing de software a medida.
- Se publica en GitHub Pages: **https://mnmryk.github.io/demo-suministros/** (repo `demo-suministros`).
  La carpeta local se llama `demo-fontaneria`, pero el repo y la subruta son `demo-suministros`.

## Reglas de contenido (no negociables)
- **Marca FICTICIA**: «Norvia Suministros». Se comprobó en octubre de 2026 que no existe ninguna empresa con ese nombre
  en la Comunitat Valenciana ni en España. Ojo: se parece a «Noria», el grupo real de distribución eléctrica y de
  fontanería (Novelec, Sinelec). El nombre está centralizado en `src/data/marca.ts`.
- Dirección genérica sin calle («Polígono industrial · Alcoy (Alicante)»), teléfono `965 000 000` y email
  `pedidos@norvia.example` (`.example` es un dominio reservado).
- Footer: «Demo diseñada por MN Design Web» enlazando a https://mndesignweb.es/
- Sin fabricantes ni logos reales. Las líneas de producto son propias e inventadas (Norvia Pro/Basic/Work).
- NO inventar reseñas, cifras de clientes ni certificaciones. Los datos de ejemplo se rotulan como «ejemplo».
- `<meta name="robots" content="noindex">` a propósito, para que una empresa ficticia no aparezca en Google.
  Por eso Lighthouse SEO sale en 63; el resto de puntuaciones están en ≥ 98.

## Dirección visual
- Debe parecer una empresa industrial real y moderna, NO la web del estudio. Nada de glass ni iridiscencias.
  Tiene que armonizar con un fondo lila.
- Neutros: blanco, `#F5F7FA` (surface), `#E5E7EB` (líneas), `#1F2937` (grafito: textos, barra superior, footer),
  `#4B5563` (texto secundario).
- Acento único: `#3B5BFD` (brand-500), `#2A44D6` (brand-600, hover y texto de enlaces), `#EEF2FF` (brand-50).
- **PROHIBIDO**: naranjas, amarillos y rojos intensos. Estados: verde `#047857` sobre `#ECFDF5` (en stock / entregado)
  y pizarra `#475569` sobre `#F1F5F9` (bajo pedido / preparando).
- Errores: sin rojo, pero siempre con icono + texto claro (nunca solo color).
- Tipografía: Manrope (titulares, precios) + Inter (texto), autoalojadas con Fontsource. Números tabulares (`.num`).
- Esquinas de 12–16 px (20 px en bloques grandes), sombras suaves (`shadow-card`, `shadow-lift`), mucho aire.
  Contraste AA en todo el texto.
- Fotos de ambiente: solo tonos fríos/neutros, sin chalecos amarillos, carretillas naranjas ni luz cálida, y sin logos.
  Corrección fría en `scripts/procesar-fotos.mjs`.
- Ilustraciones de producto: SVG **planos duotono** (grafito + índigo sobre `#F5F7FA`), viewBox 400×300, sombra
  elíptica al 8 %. Muestras aprobadas o en revisión: magnetotérmico, válvula de esfera, rodamiento. El resto usan
  `pendiente.svg` (lista `ILUSTRACIONES_LISTAS` en `src/data/productos.ts`).

## Stack
- Astro 7 (estático) + Tailwind CSS 4 (`@tailwindcss/vite`, tokens en `src/styles/global.css` con `@theme`;
  las clases reutilizables van como `@utility`, no como `@layer components`) + TypeScript sin frameworks.
- `astro.config.mjs`: `site: https://mnmryk.github.io`, `base: /demo-suministros/`. Rutas internas siempre con
  `url()` de `src/lib/url.ts`; en scripts de cliente, con `import.meta.env.BASE_URL`.
- Despliegue: `.github/workflows/deploy.yml` (withastro/action), con Pages configurado como «GitHub Actions».
- Carrito (`src/scripts/carrito.ts`, localStorage), buscador con autocompletado (`Buscador.astro`) y área de clientes
  funcionan con datos simulados, sin backend.

## Estructura
- `src/data/marca.ts`: datos de la marca. `src/data/productos.ts`: 36 productos de ejemplo, familias y subfamilias.
- `src/components/`: Header, Footer, Logo, Icon (Lucide), Buscador, ProductCard, Carrito (dialog + toast).
- `src/pages/index.astro`: portada. Pendientes: `catalogo.astro` y `area-clientes.astro`.
- `public/img/fotos/`: webp generados. `public/img/productos/`: ilustraciones SVG.
- `CREDITS.md`: licencias de fotos, iconos y fuentes.

## Comandos
- `npm run dev`: desarrollo (http://localhost:4321/demo-suministros/).
- `npm run build`: genera `dist/`.
- `npm run capturas` (después del build): genera en `capturas/` la primera pantalla de la portada a 1440×900
  (+ @2x), la portada completa a 1280 px de ancho y el área de clientes a 1440×900. `SOLO=hero|completa|area` genera
  solo una. Requiere `npx playwright install chromium`.
- `node scripts/procesar-fotos.mjs <carpeta-originales>`: regenera los webp a partir de los jpg originales de Unsplash.
- `node scripts/muestra-ilustraciones.mjs <salida.png>`: hoja de revisión de ilustraciones.

## Estado
- [x] Portada (primera pantalla ajustada para la captura 1440×900; página completa ~3.070 px a 1280).
- [x] Lighthouse móvil de la portada: Rendimiento 98 · Accesibilidad 100 · Buenas prácticas 100 · SEO 63 (por el noindex).
- [ ] Aprobación del estilo de las 3 ilustraciones de muestra y luego dibujar las demás.
- [ ] Catálogo con filtros (familia, subfamilia, stock), buscador y `?q=` / `?familia=` / `?stock=`.
- [ ] Área de clientes simulada (pedidos con estado, repetir pedido, tarifas, facturas PDF de ejemplo, pedido rápido).
- [ ] Capturas finales, Lighthouse de las 3 páginas, repo y publicación.
