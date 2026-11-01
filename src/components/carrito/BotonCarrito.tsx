import { useStore } from '@nanostores/preact';
import { useEffect, useState } from 'preact/hooks';
import { $cantidadTotal, $carritoAbierto } from './store';

export default function BotonCarrito() {
  const cantidad = useStore($cantidadTotal);
  // El servidor no conoce el carrito (vive en localStorage): mostramos el contador recién al montar.
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  const visible = montado && cantidad > 0;

  return (
    <button
      type="button"
      onClick={() => $carritoAbierto.set(true)}
      class="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-chocolate transition-colors hover:bg-crema-200"
      aria-label={visible ? `Abrir carrito, ${cantidad} productos` : 'Abrir carrito'}
    >
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 8h14l-1.2 11.1a2 2 0 0 1-2 1.9H8.2a2 2 0 0 1-2-1.9L5 8Z" />
        <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      </svg>
      {visible && (
        <span class="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rosa-600 px-1 text-[11px] font-semibold text-white">
          {cantidad}
        </span>
      )}
    </button>
  );
}
