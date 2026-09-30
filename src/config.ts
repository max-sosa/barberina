// Datos del negocio: editá este archivo para cambiar teléfono, redes, envíos, etc.
export const negocio = {
  nombre: 'Barberina',
  lema: 'Un lugar de cosas ricas',
  descripcion:
    'Pastelería y panadería artesanal en Olivos. Tortas, panificados y recetas de familia desde 1923.',
  // Número de WhatsApp en formato internacional, sin "+", espacios ni guiones.
  // TODO: reemplazar por el número real del negocio.
  whatsapp: '5491100000000',
  ubicacion: 'Olivos, Buenos Aires, Argentina',
  localidad: 'Olivos',
  horarioEntregas: 'de 9 a 16 h',
  demoraEntrega: '1 a 2 días hábiles',
  // Compras desde este monto tienen envío gratis dentro de la zona de reparto.
  envioGratisDesde: 1000,
  redes: {
    instagram: 'https://www.instagram.com/barberina_/',
    facebook: 'https://www.facebook.com/baberinapanaderiaypasteleria',
  },
  mapaEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52601.54696130476!2d-58.53326704183281!3d-34.51310772804219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb147d4018937%3A0xfa30a67c6ada18f7!2sOlivos%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1637553333935!5m2!1ses-419!2sar',
} as const;

export const navegacion = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/tortas', label: 'Tortas' },
  { href: '/panificados', label: 'Panificados' },
  { href: '/quienes-somos', label: 'Nosotros' },
  { href: '/envios', label: 'Envíos' },
  { href: '/contacto', label: 'Contacto' },
] as const;
