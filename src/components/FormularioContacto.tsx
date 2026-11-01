import { useState } from 'preact/hooks';
import { enlaceWhatsApp } from '../lib/whatsapp';

const motivos = ['Consulta general', 'Torta para un evento', 'Pedido mayorista', 'Otro'];

export default function FormularioContacto() {
  const [enviado, setEnviado] = useState(false);

  const enviar = (e: Event) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.currentTarget as HTMLFormElement)) as Record<string, string>;
    const mensaje = [`¡Hola! Soy ${datos.nombre}.`, `Motivo: ${datos.motivo}`, '', datos.mensaje].join('\n');
    window.open(enlaceWhatsApp(mensaje), '_blank', 'noopener');
    setEnviado(true);
  };

  return (
    <form onSubmit={enviar} class="space-y-5">
      <div>
        <label class="etiqueta" for="contacto-nombre">Nombre</label>
        <input id="contacto-nombre" name="nombre" required autoComplete="name" class="campo" />
      </div>
      <div>
        <label class="etiqueta" for="contacto-motivo">Motivo</label>
        <select id="contacto-motivo" name="motivo" class="campo">
          {motivos.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label class="etiqueta" for="contacto-mensaje">Mensaje</label>
        <textarea id="contacto-mensaje" name="mensaje" required rows={5} class="campo resize-none" placeholder="Contanos en qué te podemos ayudar" />
      </div>
      <button type="submit" class="boton-primario w-full sm:w-auto">Enviar por WhatsApp</button>
      <p class="text-sm text-chocolate-700" aria-live="polite">
        {enviado ? 'Se abrió WhatsApp con tu mensaje. ¡Te respondemos a la brevedad!' : ''}
      </p>
    </form>
  );
}
