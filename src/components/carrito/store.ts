import { atom, computed } from 'nanostores';
import { persistentJSON } from '@nanostores/persistent';

export type ItemCarrito = {
  id: string;
  nombre: string;
  precio: number;
  unidad: string;
  imagen: string;
  cantidad: number;
};

/** Carrito guardado en localStorage, sincronizado entre pestañas. */
export const $carrito = persistentJSON<Record<string, ItemCarrito>>('barberina:carrito', {});

export const $carritoAbierto = atom(false);

export const $items = computed($carrito, (carrito) => Object.values(carrito));

export const $cantidadTotal = computed($items, (items) =>
  items.reduce((suma, item) => suma + item.cantidad, 0),
);

export const $montoTotal = computed($items, (items) =>
  items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
);

export function agregarAlCarrito(producto: Omit<ItemCarrito, 'cantidad'>, cantidad = 1) {
  const carrito = $carrito.get();
  const actual = carrito[producto.id]?.cantidad ?? 0;
  $carrito.set({ ...carrito, [producto.id]: { ...producto, cantidad: actual + cantidad } });
}

export function cambiarCantidad(id: string, cantidad: number) {
  const carrito = $carrito.get();
  if (!carrito[id]) return;
  if (cantidad <= 0) return quitarDelCarrito(id);
  $carrito.set({ ...carrito, [id]: { ...carrito[id], cantidad } });
}

export function quitarDelCarrito(id: string) {
  const { [id]: _quitado, ...resto } = $carrito.get();
  $carrito.set(resto);
}

export function vaciarCarrito() {
  $carrito.set({});
}
