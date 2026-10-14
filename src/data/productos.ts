// Catálogo de EJEMPLO. Productos genéricos, sin fabricantes reales. Precios ficticios (PVP sin IVA).

export type FamiliaId = 'electrico' | 'fontaneria' | 'industrial';
export type Stock = 'stock' | 'pedido';

export interface Producto {
  ref: string;
  nombre: string;
  familia: FamiliaId;
  subfamilia: string;
  precio: number;
  unidad?: string;
  stock: Stock;
  ilus: string;
  destacado?: boolean;
}

export const familias: Record<FamiliaId, { nombre: string; corto: string; descripcion: string; foto: string }> = {
  electrico: {
    nombre: 'Material eléctrico',
    corto: 'Eléctrico',
    descripcion: 'Cable, protección, mecanismos, iluminación LED y canalización para instalaciones de baja tensión.',
    foto: 'electrico',
  },
  fontaneria: {
    nombre: 'Fontanería',
    corto: 'Fontanería',
    descripcion: 'Tubería multicapa y PVC, accesorios de prensar, valvulería, grifería y saneamiento.',
    foto: 'fontaneria',
  },
  industrial: {
    nombre: 'Suministro industrial',
    corto: 'Industrial',
    descripcion: 'Rodamientos, fijación, herramienta, abrasivos y EPIs para talleres y mantenimiento.',
    foto: 'industrial',
  },
};

export const productos: Producto[] = [
  // Material eléctrico
  { ref: 'EL-20416', nombre: 'Magnetotérmico 2P 16 A curva C', familia: 'electrico', subfamilia: 'Protección', precio: 9.4, stock: 'stock', ilus: 'magnetotermico', destacado: true },
  { ref: 'EL-10125', nombre: 'Cable H07V-K 2,5 mm² · rollo 100 m', familia: 'electrico', subfamilia: 'Cables', precio: 38.9, stock: 'stock', ilus: 'cable-bobina', destacado: true },
  { ref: 'EL-10160', nombre: 'Cable RZ1-K 3G6 mm²', familia: 'electrico', subfamilia: 'Cables', precio: 2.85, unidad: 'm', stock: 'stock', ilus: 'cable-bobina' },
  { ref: 'EL-20440', nombre: 'Diferencial 2P 40 A 30 mA clase A', familia: 'electrico', subfamilia: 'Protección', precio: 42.6, stock: 'stock', ilus: 'diferencial' },
  { ref: 'EL-20112', nombre: 'Cuadro de superficie 12 módulos IP40', familia: 'electrico', subfamilia: 'Protección', precio: 19.5, stock: 'pedido', ilus: 'cuadro' },
  { ref: 'EL-20725', nombre: 'Contactor modular 25 A 2NA', familia: 'electrico', subfamilia: 'Protección', precio: 28.7, stock: 'pedido', ilus: 'contactor' },
  { ref: 'EL-30210', nombre: 'Base de enchufe empotrable 16 A', familia: 'electrico', subfamilia: 'Mecanismos', precio: 3.15, stock: 'stock', ilus: 'enchufe' },
  { ref: 'EL-30120', nombre: 'Conmutador empotrable 10 A', familia: 'electrico', subfamilia: 'Mecanismos', precio: 2.9, stock: 'stock', ilus: 'conmutador' },
  { ref: 'EL-40118', nombre: 'Panel LED 60×60 40 W 4000 K', familia: 'electrico', subfamilia: 'Iluminación', precio: 24.9, stock: 'stock', ilus: 'panel-led', destacado: true },
  { ref: 'EL-40230', nombre: 'Proyector LED 50 W IP65', familia: 'electrico', subfamilia: 'Iluminación', precio: 21.4, stock: 'stock', ilus: 'proyector' },
  { ref: 'EL-50020', nombre: 'Tubo corrugado M20 · rollo 100 m', familia: 'electrico', subfamilia: 'Canalización', precio: 17.8, stock: 'stock', ilus: 'corrugado' },
  { ref: 'EL-60010', nombre: 'Regleta de conexión 12 polos 10 mm²', familia: 'electrico', subfamilia: 'Conexión', precio: 1.95, stock: 'stock', ilus: 'regleta' },

  // Fontanería
  { ref: 'FO-30134', nombre: 'Válvula de esfera 3/4" palanca', familia: 'fontaneria', subfamilia: 'Valvulería', precio: 7.9, stock: 'stock', ilus: 'valvula-esfera', destacado: true },
  { ref: 'FO-10220', nombre: 'Tubo multicapa 20×2 mm · rollo 100 m', familia: 'fontaneria', subfamilia: 'Tubería', precio: 98, stock: 'stock', ilus: 'multicapa', destacado: true },
  { ref: 'FO-10425', nombre: 'Tubo PEX 25 mm · rollo 50 m', familia: 'fontaneria', subfamilia: 'Tubería', precio: 46.5, stock: 'pedido', ilus: 'multicapa' },
  { ref: 'FO-10340', nombre: 'Tubo PVC evacuación Ø40 · barra 3 m', familia: 'fontaneria', subfamilia: 'Saneamiento', precio: 4.6, stock: 'stock', ilus: 'tubo-pvc' },
  { ref: 'FO-20120', nombre: 'Codo prensar multicapa 20 mm', familia: 'fontaneria', subfamilia: 'Accesorios', precio: 3.85, stock: 'stock', ilus: 'codo' },
  { ref: 'FO-20416', nombre: 'Te prensar multicapa 16 mm', familia: 'fontaneria', subfamilia: 'Accesorios', precio: 4.2, stock: 'stock', ilus: 'te' },
  { ref: 'FO-40210', nombre: 'Latiguillo flexible 3/8" 40 cm', familia: 'fontaneria', subfamilia: 'Accesorios', precio: 2.6, stock: 'stock', ilus: 'latiguillo' },
  { ref: 'FO-60100', nombre: 'Cinta de teflón 12 mm × 12 m · pack 10', familia: 'fontaneria', subfamilia: 'Accesorios', precio: 4.9, stock: 'stock', ilus: 'teflon' },
  { ref: 'FO-30212', nombre: 'Válvula antirretorno 1/2"', familia: 'fontaneria', subfamilia: 'Valvulería', precio: 5.4, stock: 'stock', ilus: 'antirretorno' },
  { ref: 'FO-30320', nombre: 'Manómetro Ø63 0–10 bar', familia: 'fontaneria', subfamilia: 'Valvulería', precio: 8.7, stock: 'stock', ilus: 'manometro' },
  { ref: 'FO-40150', nombre: 'Grifo monomando de lavabo', familia: 'fontaneria', subfamilia: 'Grifería', precio: 39.9, stock: 'pedido', ilus: 'grifo' },
  { ref: 'FO-50110', nombre: 'Sifón botella extensible 1 1/4"', familia: 'fontaneria', subfamilia: 'Saneamiento', precio: 6.3, stock: 'stock', ilus: 'sifon' },

  // Suministro industrial
  { ref: 'IN-10620', nombre: 'Rodamiento rígido de bolas 6204-2RS', familia: 'industrial', subfamilia: 'Rodamientos', precio: 3.4, stock: 'stock', ilus: 'rodamiento', destacado: true },
  { ref: 'IN-10630', nombre: 'Rodamiento rígido de bolas 6305-2RS', familia: 'industrial', subfamilia: 'Rodamientos', precio: 5.9, stock: 'stock', ilus: 'rodamiento' },
  { ref: 'IN-20810', nombre: 'Tornillo DIN 933 M8×30 zincado · caja 100', familia: 'industrial', subfamilia: 'Fijación', precio: 7.2, stock: 'stock', ilus: 'tornillo' },
  { ref: 'IN-20450', nombre: 'Taco de nylon 8 mm · caja 100', familia: 'industrial', subfamilia: 'Fijación', precio: 3.1, stock: 'stock', ilus: 'taco' },
  { ref: 'IN-20900', nombre: 'Brida de nylon 4,8×300 mm · bolsa 100', familia: 'industrial', subfamilia: 'Fijación', precio: 4.5, stock: 'stock', ilus: 'brida' },
  { ref: 'IN-30110', nombre: 'Guante de nitrilo para taller T9 · 12 pares', familia: 'industrial', subfamilia: 'EPIs', precio: 14.9, stock: 'stock', ilus: 'guante', destacado: true },
  { ref: 'IN-30220', nombre: 'Gafas de protección incoloras', familia: 'industrial', subfamilia: 'EPIs', precio: 3.8, stock: 'stock', ilus: 'gafas' },
  { ref: 'IN-30310', nombre: 'Protector auditivo de orejera', familia: 'industrial', subfamilia: 'EPIs', precio: 12.6, stock: 'pedido', ilus: 'orejeras' },
  { ref: 'IN-40115', nombre: 'Disco de corte inox 125×1 mm · pack 10', familia: 'industrial', subfamilia: 'Abrasivos', precio: 9.9, stock: 'stock', ilus: 'disco' },
  { ref: 'IN-50201', nombre: 'Llave ajustable 250 mm', familia: 'industrial', subfamilia: 'Herramienta', precio: 16.4, stock: 'stock', ilus: 'llave' },
  { ref: 'IN-50310', nombre: 'Juego de brocas HSS 1–10 mm · 19 piezas', familia: 'industrial', subfamilia: 'Herramienta', precio: 18.9, stock: 'pedido', ilus: 'brocas' },
  { ref: 'IN-60110', nombre: 'Spray lubricante multiuso 400 ml', familia: 'industrial', subfamilia: 'Mantenimiento', precio: 5.2, stock: 'stock', ilus: 'spray' },
];

export const buscarRef = (ref: string) => productos.find((p) => p.ref.toUpperCase() === ref.trim().toUpperCase());

export const subfamilias = (f: FamiliaId) => [...new Set(productos.filter((p) => p.familia === f).map((p) => p.subfamilia))];

// Ilustraciones ya dibujadas. Las demás usan un marcador provisional hasta aprobar el estilo.
const ILUSTRACIONES_LISTAS = new Set(['magnetotermico', 'valvula-esfera', 'rodamiento']);
export const imagenProducto = (p: Producto) =>
  `img/productos/${ILUSTRACIONES_LISTAS.has(p.ilus) ? p.ilus : 'pendiente'}.svg`;
