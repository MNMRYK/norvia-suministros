// Convierte las fotos originales (Unsplash) a webp con una corrección fría suave.
// Uso: node scripts/procesar-fotos.mjs <carpeta-originales>
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const src = process.argv[2];
const out = 'public/img/fotos';
mkdirSync(out, { recursive: true });

// nombre → anchos generados y saturación (más baja en fotos con cartón cálido)
const fotos = {
  hero: { widths: [640, 960, 1280], sat: 0.72 },
  almacen: { widths: [640, 1280], sat: 0.75 },
  electrico: { widths: [480, 800], sat: 0.9 },
  fontaneria: { widths: [480, 800], sat: 0.9 },
  industrial: { widths: [480, 800], sat: 0.9 },
};

const frio = [
  [0.95, 0.03, 0.02],
  [0.01, 0.98, 0.01],
  [0.0, 0.03, 1.04],
];

for (const [nombre, { widths, sat }] of Object.entries(fotos)) {
  for (const w of widths) {
    const info = await sharp(`${src}/${nombre}.jpg`)
      .resize({ width: w, withoutEnlargement: true })
      .modulate({ saturation: sat })
      .recomb(frio)
      .webp({ quality: 74, effort: 6 })
      .toFile(`${out}/${nombre}-${w}.webp`);
    console.log(`${nombre}-${w}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)} KB`);
  }
}
