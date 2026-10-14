// Genera las capturas para el portfolio a partir de dist/ (ejecutar antes `npm run build`).
// Uso: node scripts/capturas.mjs [carpeta-salida]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const BASE = '/demo-suministros/';
const SALIDA = process.argv[2] || 'capturas';
const MAX_ALTO = 3200;

const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.png': 'image/png',
};

// Servidor estático mínimo que sirve dist/ bajo la subruta de GitHub Pages
const servidor = createServer(async (req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!ruta.startsWith(BASE)) return res.writeHead(404).end();
  ruta = normalize(join('dist', ruta.slice(BASE.length)));
  try {
    if ((await stat(ruta)).isDirectory()) ruta = join(ruta, 'index.html');
    const datos = await readFile(ruta);
    res.writeHead(200, { 'content-type': tipos[extname(ruta)] || 'application/octet-stream' });
    res.end(datos);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => servidor.listen(4329, r));
const origen = `http://localhost:4329${BASE}`;

await mkdir(SALIDA, { recursive: true });
const navegador = await chromium.launch();

async function capturar({ ruta, ancho, alto, completa = false, escala = 1, archivo, preparar }) {
  const pagina = await navegador.newPage({ viewport: { width: ancho, height: alto }, deviceScaleFactor: escala });
  await pagina.goto(origen + ruta, { waitUntil: 'networkidle' });
  await pagina.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important}' });
  await pagina.evaluate(() => document.fonts.ready);
  if (preparar) await preparar(pagina);
  // Carga las imágenes diferidas antes de una captura completa
  if (completa) {
    await pagina.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager'));
      await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)))));
    });
  }
  const png = await pagina.screenshot({ fullPage: completa });
  await pagina.close();

  let img = sharp(png);
  const { height } = await img.metadata();
  if (completa && height > MAX_ALTO * escala) {
    console.warn(`  ⚠ ${archivo}: ${height / escala}px de alto, se recorta a ${MAX_ALTO}px`);
    img = img.extract({ left: 0, top: 0, width: ancho * escala, height: MAX_ALTO * escala });
  }
  const info = await img.webp({ quality: 88, effort: 6 }).toFile(join(SALIDA, archivo));
  console.log(`✓ ${archivo} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)} KB`);
}

const solo = process.env.SOLO; // p. ej. SOLO=hero para generar solo una
const trabajos = [
  { id: 'hero', ruta: '', ancho: 1440, alto: 900, archivo: 'portada-hero-1440x900.webp' },
  { id: 'hero', ruta: '', ancho: 1440, alto: 900, escala: 2, archivo: 'portada-hero-1440x900@2x.webp' },
  { id: 'completa', ruta: '', ancho: 1280, alto: 900, completa: true, archivo: 'portada-completa-1280.webp' },
  { id: 'area', ruta: 'area-clientes/', ancho: 1440, alto: 900, archivo: 'area-clientes-1440x900.webp' },
];

for (const t of trabajos) {
  if (solo && t.id !== solo) continue;
  if (t.id === 'area' && !(await stat('dist/area-clientes').catch(() => null))) continue;
  await capturar(t);
}

await navegador.close();
servidor.close();
