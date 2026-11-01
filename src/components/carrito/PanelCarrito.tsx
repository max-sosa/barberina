import { useStore } from '@nanostores/preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { negocio } from '../../config';
import { formatearPrecio } from '../../lib/formato';
import { enlaceWhatsApp } from '../../lib/whatsapp';
import {
  $carritoAbierto,
  $items,
  $montoTotal,
  cambiarCantidad,
  quitarDelCarrito,
  vaciarCarrito,
  type ItemCarrito,
} from './store';

type Entrega = 'retiro' | 'envio' | 'app';

const opcionesEntrega: Record<Entrega, string> = {
  retiro: `Retiro en ${negocio.localidad}`,
  envio: 'Envío a domicilio (zona de reparto)',
  app: 'Cabify Envíos / Uber Flash',
};

function manana() {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 1);
  return fecha.toISOString().slice(0, 10);
}

function armarMensaje(items: ItemCarrito[], total: number, datos: Record<string, string>) {
  const lineas = items.map(
    (item) => `• ${item.cantidad} × ${item.nombre} — ${formatearPrecio(item.precio * item.cantidad)}`,
  );
  const fecha = datos.fecha
    ? new Date(`${datos.fecha}T12:00:00`).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';
  return [
    `¡Hola ${negocio.nombre}! Quiero hacer este pedido:`,
    '',
    ...lineas,
    '',
    `*Total: ${formatearPrecio(total)}*`,
    '',
    `Nombre: ${datos.nombre}`,
    `Entrega: ${opcionesEntrega[datos.entrega as Entrega]}`,
    datos.entrega === 'envio' && datos.direccion ? `Dirección: ${datos.direccion}` : null,
    fecha ? `Fecha deseada: ${fecha}` : null,
    datos.notas ? `Notas: ${datos.notas}` : null,
  ]
    .filter((linea) => linea !== null)
    .join('\n');
}

export default function PanelCarrito() {
  const abierto = useStore($carritoAbierto);
  const items = useStore($items);
  const total = useStore($montoTotal);
  const [paso, setPaso] = useState<'carrito' | 'datos' | 'enviado'>('carrito');
  const [entrega, setEntrega] = useState<Entrega>('retiro');
  const [confirmarVaciar, setConfirmarVaciar] = useState(false);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const cerrar = () => $carritoAbierto.set(false);

  useEffect(() => {
    if (!abierto) {
      setConfirmarVaciar(false);
      if (paso === 'enviado') setPaso('carrito');
      return;
    }
    const anterior = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    botonCerrar.current?.focus();

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar();
      // Mantiene el foco dentro del panel mientras está abierto.
      if (e.key === 'Tab' && panel.current) {
        const enfocables = panel.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, textarea',
        );
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo?.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero?.focus();
        }
      }
    };
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', alTeclear);
      anterior?.focus();
    };
  }, [abierto]);

  useEffect(() => {
    if (items.length === 0 && paso === 'datos') setPaso('carrito');
  }, [items.length]);

  const enviarPedido = (e: Event) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)) as Record<string, string>;
    window.open(enlaceWhatsApp(armarMensaje(items, total, datos)), '_blank', 'noopener');
    setPaso('enviado');
  };

  const faltaParaEnvioGratis = negocio.envioGratisDesde - total;

  return (
    <div
      class={`fixed inset-0 z-50 ${abierto ? '' : 'pointer-events-none'}`}
      aria-hidden={!abierto}
      inert={!abierto}
    >
      <div
        class={`absolute inset-0 bg-chocolate/40 backdrop-blur-[2px] transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
        onClick={cerrar}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-carrito"
        class={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-crema transition-transform duration-300 ease-out ${abierto ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`}
      >
        <header class="flex items-center justify-between border-b border-chocolate/10 px-6 py-5">
          <h2 id="titulo-carrito" class="text-2xl">
            {paso === 'datos' ? 'Tus datos' : 'Tu pedido'}
          </h2>
          <button
            ref={botonCerrar}
            type="button"
            onClick={cerrar}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-crema-200"
            aria-label="Cerrar carrito"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        {paso === 'enviado' ? (
          <div class="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p class="font-display text-2xl">¡Gracias por tu pedido!</p>
            <p class="text-chocolate-700">
              Se abrió WhatsApp con el detalle. Envianos el mensaje y te confirmamos disponibilidad, costo de envío y forma de pago.
            </p>
            <div class="mt-4 flex w-full flex-col gap-3">
              <button type="button" class="boton-primario" onClick={() => { vaciarCarrito(); setPaso('carrito'); cerrar(); }}>
                Ya lo envié, vaciar carrito
              </button>
              <button type="button" class="boton-secundario" onClick={() => setPaso('datos')}>
                Volver al pedido
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div class="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p class="font-display text-xl">Tu carrito está vacío</p>
            <p class="text-sm text-chocolate-700">Elegí tus tortas y panificados favoritos para armar el pedido.</p>
            <a href="/tienda" class="boton-primario mt-2" onClick={cerrar}>Ir a la tienda</a>
          </div>
        ) : paso === 'carrito' ? (
          <>
            <ul class="flex-1 divide-y divide-chocolate/10 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} class="flex gap-4 py-5">
                  <img src={item.imagen} alt="" width={80} height={80} class="h-20 w-20 flex-none rounded-xl object-cover" />
                  <div class="flex flex-1 flex-col">
                    <div class="flex justify-between gap-2">
                      <p class="font-medium">{item.nombre}</p>
                      <p class="font-medium tabular-nums">{formatearPrecio(item.precio * item.cantidad)}</p>
                    </div>
                    <p class="text-xs text-chocolate-500">{formatearPrecio(item.precio)} {item.unidad}</p>
                    <div class="mt-auto flex items-center justify-between pt-2">
                      <div class="inline-flex items-center rounded-full border border-chocolate/20" role="group" aria-label={`Cantidad de ${item.nombre}`}>
                        <button type="button" class="h-8 w-8 rounded-full hover:bg-crema-200" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)} aria-label={`Restar un ${item.nombre}`}>−</button>
                        <span class="w-7 text-center text-sm tabular-nums">{item.cantidad}</span>
                        <button type="button" class="h-8 w-8 rounded-full hover:bg-crema-200" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)} aria-label={`Sumar un ${item.nombre}`}>+</button>
                      </div>
                      <button type="button" class="text-xs text-chocolate-500 underline-offset-4 hover:text-chocolate hover:underline" onClick={() => quitarDelCarrito(item.id)}>
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <footer class="space-y-4 border-t border-chocolate/10 bg-crema-100 px-6 py-5">
              <p class="text-xs text-chocolate-700">
                {faltaParaEnvioGratis > 0
                  ? `Te faltan ${formatearPrecio(faltaParaEnvioGratis)} para el envío gratis en zona de reparto.`
                  : '¡Tu pedido tiene envío gratis en zona de reparto!'}
              </p>
              <div class="flex items-baseline justify-between">
                <span class="text-sm">Total</span>
                <span class="font-display text-2xl tabular-nums">{formatearPrecio(total)}</span>
              </div>
              <button type="button" class="boton-primario w-full" onClick={() => setPaso('datos')}>
                Continuar
              </button>
              <div class="text-center text-xs">
                {confirmarVaciar ? (
                  <span>
                    ¿Vaciar el carrito?{' '}
                    <button type="button" class="font-semibold text-rosa-600 hover:underline" onClick={() => { vaciarCarrito(); setConfirmarVaciar(false); }}>Sí, vaciar</button>
                    {' · '}
                    <button type="button" class="hover:underline" onClick={() => setConfirmarVaciar(false)}>Cancelar</button>
                  </span>
                ) : (
                  <button type="button" class="text-chocolate-500 hover:text-chocolate hover:underline" onClick={() => setConfirmarVaciar(true)}>
                    Vaciar carrito
                  </button>
                )}
              </div>
            </footer>
          </>
        ) : (
          <form class="flex flex-1 flex-col overflow-hidden" onSubmit={enviarPedido}>
            <div class="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              <div>
                <label class="etiqueta" for="pedido-nombre">Nombre</label>
                <input id="pedido-nombre" name="nombre" required autoComplete="name" class="campo" placeholder="¿A nombre de quién?" />
              </div>
              <fieldset>
                <legend class="etiqueta">Entrega</legend>
                <div class="space-y-2">
                  {(Object.keys(opcionesEntrega) as Entrega[]).map((opcion) => (
                    <label key={opcion} class={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${entrega === opcion ? 'border-chocolate bg-white' : 'border-chocolate/20 hover:border-chocolate/50'}`}>
                      <input type="radio" name="entrega" value={opcion} checked={entrega === opcion} onChange={() => setEntrega(opcion)} class="accent-chocolate" />
                      {opcionesEntrega[opcion]}
                    </label>
                  ))}
                </div>
                {entrega === 'app' && (
                  <p class="mt-2 text-xs text-chocolate-700">El costo del viaje lo abonás vos a través de la app. Coordinamos el horario por WhatsApp.</p>
                )}
              </fieldset>
              {entrega === 'envio' && (
                <div>
                  <label class="etiqueta" for="pedido-direccion">Dirección</label>
                  <input id="pedido-direccion" name="direccion" required autoComplete="street-address" class="campo" placeholder="Calle, número, localidad" />
                  <p class="mt-1.5 text-xs text-chocolate-700">
                    Solo dentro de la <a href="/envios" class="underline" onClick={cerrar}>zona de reparto</a>. Entregas {negocio.horarioEntregas}.
                  </p>
                </div>
              )}
              <div>
                <label class="etiqueta" for="pedido-fecha">Fecha deseada <span class="font-normal text-chocolate-500">(opcional)</span></label>
                <input id="pedido-fecha" name="fecha" type="date" min={manana()} class="campo" />
              </div>
              <div>
                <label class="etiqueta" for="pedido-notas">Notas <span class="font-normal text-chocolate-500">(opcional)</span></label>
                <textarea id="pedido-notas" name="notas" rows={3} class="campo resize-none" placeholder="Dedicatoria, horario, alergias…" />
              </div>
            </div>
            <footer class="space-y-3 border-t border-chocolate/10 bg-crema-100 px-6 py-5">
              <div class="flex items-baseline justify-between">
                <span class="text-sm">Total</span>
                <span class="font-display text-2xl tabular-nums">{formatearPrecio(total)}</span>
              </div>
              <button type="submit" class="boton w-full bg-[#1f7a4d] text-white hover:bg-[#186540]">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
                </svg>
                Enviar pedido por WhatsApp
              </button>
              <button type="button" class="w-full text-center text-xs text-chocolate-500 hover:text-chocolate hover:underline" onClick={() => setPaso('carrito')}>
                ← Volver al carrito
              </button>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}
