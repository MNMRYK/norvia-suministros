const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Ruta interna con el prefijo de GitHub Pages (/demo-suministros/). */
export const url = (ruta = '') => `${base}/${ruta.replace(/^\//, '')}`;

export const euros = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

/** Minúsculas, sin tildes y con coma decimal → punto, para buscar. */
export const normalizar = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/,/g, '.');
