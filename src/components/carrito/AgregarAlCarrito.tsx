import { useEffect, useRef, useState } from 'preact/hooks';
import { agregarAlCarrito, type ItemCarrito } from './store';

type Props = Omit<ItemCarrito, 'cantidad'> & {
  /** Muestra selector de cantidad (página de producto). */
  conCantidad?: boolean;
  class?: string;
};

export default function AgregarAlCarrito({ conCantidad = false, class: clase = '', ...producto }: Props) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const temporizador = useRef<number>();

  useEffect(() => () => window.clearTimeout(temporizador.current), []);

  const agregar = () => {
    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
    window.clearTimeout(temporizador.current);
    temporizador.current = window.setTimeout(() => setAgregado(false), 1800);
  };

  return (
    <div class={`flex flex-wrap items-center gap-3 ${clase}`}>
      {conCantidad && (
        <div class="inline-flex items-center rounded-full border border-chocolate/20" role="group" aria-label="Cantidad">
          <button type="button" class="h-11 w-11 rounded-full text-lg hover:bg-crema-200" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar uno">−</button>
          <span class="w-8 text-center font-medium tabular-nums" aria-live="polite">{cantidad}</span>
          <button type="button" class="h-11 w-11 rounded-full text-lg hover:bg-crema-200" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar uno">+</button>
        </div>
      )}
      <button type="button" onClick={agregar} class={conCantidad ? 'boton-primario flex-1' : 'boton-secundario w-full'}>
        <span aria-live="polite">{agregado ? '¡Agregado!' : 'Agregar al carrito'}</span>
      </button>
    </div>
  );
}
