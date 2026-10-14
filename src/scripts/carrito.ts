// Carrito simulado: se guarda en localStorage, sin backend.
import { buscarRef, imagenProducto } from '../data/productos';
import { euros } from '../lib/url';

type Lineas = Record<string, number>;
const CLAVE = 'norvia-carrito';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function leer(): Lineas {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) || '{}');
  } catch {
    return {};
  }
}

function guardar(lineas: Lineas) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    /* sin almacenamiento: el carrito vive solo en esta página */
  }
  memoria = lineas;
  pintar();
}

let memoria: Lineas = leer();

export function anadir(ref: string, cantidad = 1, aviso = true) {
  const p = buscarRef(ref);
  if (!p) return false;
  const lineas = { ...memoria };
  lineas[p.ref] = (lineas[p.ref] || 0) + cantidad;
  guardar(lineas);
  if (aviso) avisar(`${cantidad} × ${p.nombre} añadido al carrito`);
  return true;
}

export function anadirVarios(items: { ref: string; cantidad: number }[], mensaje: string) {
  const lineas = { ...memoria };
  for (const { ref, cantidad } of items) {
    const p = buscarRef(ref);
    if (p) lineas[p.ref] = (lineas[p.ref] || 0) + cantidad;
  }
  guardar(lineas);
  avisar(mensaje);
}

function cambiar(ref: string, cantidad: number) {
  const lineas = { ...memoria };
  if (cantidad <= 0) delete lineas[ref];
  else lineas[ref] = cantidad;
  guardar(lineas);
}

let temporizador: number | undefined;
export function avisar(texto: string) {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  if (!toast) return;
  toast.querySelector('[data-toast-texto]')!.textContent = texto;
  toast.classList.remove('opacity-0', 'translate-y-3', 'pointer-events-none');
  clearTimeout(temporizador);
  temporizador = window.setTimeout(() => toast.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none'), 3200);
}

function pintar() {
  const entradas = Object.entries(memoria).filter(([ref]) => buscarRef(ref));
  const unidades = entradas.reduce((s, [, n]) => s + n, 0);

  document.querySelectorAll<HTMLElement>('[data-carrito-num]').forEach((el) => {
    el.textContent = String(unidades);
    el.classList.toggle('hidden', unidades === 0);
  });

  const lista = document.querySelector<HTMLElement>('[data-carrito-lista]');
  if (!lista) return;
  const vacio = document.querySelector<HTMLElement>('[data-carrito-vacio]')!;
  const pie = document.querySelector<HTMLElement>('[data-carrito-pie]')!;
  vacio.classList.toggle('hidden', entradas.length > 0);
  pie.classList.toggle('hidden', entradas.length === 0);

  let total = 0;
  lista.innerHTML = entradas
    .map(([ref, n]) => {
      const p = buscarRef(ref)!;
      total += p.precio * n;
      return `<li class="flex gap-3 py-4">
        <img src="${base}/${imagenProducto(p)}" alt="" width="64" height="48" class="h-12 w-16 rounded-lg bg-surface object-contain">
        <div class="min-w-0 flex-1">
          <p class="num text-xs text-ink-2">Ref. ${p.ref}</p>
          <p class="truncate text-sm font-semibold">${p.nombre}</p>
          <div class="mt-2 flex items-center justify-between">
            <div class="flex items-center rounded-lg border border-line">
              <button type="button" data-cant="${p.ref}" data-delta="-1" class="grid size-8 place-items-center text-ink-2 hover:text-brand-600" aria-label="Quitar una unidad de ${p.nombre}">−</button>
              <span class="num w-8 text-center text-sm font-semibold" aria-label="Cantidad">${n}</span>
              <button type="button" data-cant="${p.ref}" data-delta="1" class="grid size-8 place-items-center text-ink-2 hover:text-brand-600" aria-label="Añadir una unidad de ${p.nombre}">+</button>
            </div>
            <span class="num text-sm font-bold">${euros(p.precio * n)}</span>
          </div>
        </div>
      </li>`;
    })
    .join('');
  document.querySelector('[data-carrito-total]')!.textContent = euros(total);
}

function abrir() {
  const panel = document.querySelector<HTMLDialogElement>('[data-carrito]');
  if (!panel) return;
  document.querySelector('[data-toast]')?.classList.add('opacity-0', 'translate-y-3', 'pointer-events-none');
  panel.querySelector('[data-carrito-ok]')?.classList.add('hidden');
  panel.querySelector('[data-carrito-contenido]')?.classList.remove('hidden');
  panel.showModal();
}

function iniciar() {
  pintar();
  document.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const add = t.closest<HTMLElement>('[data-anadir]');
    if (add) anadir(add.dataset.anadir!);
    if (t.closest('[data-abrir-carrito]')) abrir();
    if (t.closest('[data-cerrar-carrito]')) document.querySelector<HTMLDialogElement>('[data-carrito]')?.close();
    const cant = t.closest<HTMLElement>('[data-cant]');
    if (cant) cambiar(cant.dataset.cant!, (memoria[cant.dataset.cant!] || 0) + Number(cant.dataset.delta));
    if (t.closest('[data-vaciar]')) guardar({});
    if (t.closest('[data-pedir]')) {
      guardar({});
      document.querySelector('[data-carrito-contenido]')?.classList.add('hidden');
      document.querySelector('[data-carrito-ok]')?.classList.remove('hidden');
    }
  });
  // Cerrar al pulsar fuera del panel
  document.querySelector<HTMLDialogElement>('[data-carrito]')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) (e.currentTarget as HTMLDialogElement).close();
  });
  window.addEventListener('storage', (e) => {
    if (e.key === CLAVE) {
      memoria = leer();
      pintar();
    }
  });
}

iniciar();
