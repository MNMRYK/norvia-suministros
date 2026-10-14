// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Se publica en GitHub Pages: https://mnmryk.github.io/demo-suministros/
export default defineConfig({
  site: 'https://mnmryk.github.io',
  base: '/demo-suministros/',
  trailingSlash: 'ignore',
  vite: { plugins: [tailwindcss()] },
});
