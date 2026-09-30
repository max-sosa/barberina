import { negocio } from '../config';

/** Arma un enlace wa.me que abre WhatsApp con el mensaje ya escrito. */
export const enlaceWhatsApp = (mensaje?: string) => {
  const base = `https://wa.me/${negocio.whatsapp}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
};
