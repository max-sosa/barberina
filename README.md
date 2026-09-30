# Barberina

Barberina || Un lugar de cosas ricas.

Sitio de la pastelería y panadería Barberina (Olivos, Buenos Aires), con tienda online y pedidos por WhatsApp.

## Tecnologías

- [Astro](https://astro.build): sitio estático, rápido y bueno para SEO
- [Tailwind CSS v4](https://tailwindcss.com) para los estilos, con la paleta propia en `src/styles/global.css`
- [Preact](https://preactjs.com) + [nanostores](https://github.com/nanostores/nanostores) para el carrito (se guarda en `localStorage`)
- Tipografías Fraunces (títulos) e Inter (texto), servidas desde el propio sitio
- Imágenes optimizadas automáticamente a WebP con `astro:assets`

## Cómo usarlo

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # verifica tipos y genera el sitio en dist/
npm run preview  # sirve el build localmente
```

## Dónde editar

| Qué | Dónde |
| --- | --- |
| Teléfono de WhatsApp, redes, envío gratis, horarios | `src/config.ts` |
| Productos (nombre, precio, foto, descripción, destacado) | `src/content/productos/*.md`, un archivo por producto |
| Fotos | `src/assets/` |
| Colores y tipografías | `src/styles/global.css` |
| Páginas | `src/pages/` |

Para agregar un producto, copiá cualquier archivo de `src/content/productos/`, cambiá los datos y agregá la foto en `src/assets/productos/`. Si algún dato falta o tiene un formato incorrecto, el build avisa.

## Cómo funciona el pedido

1. La persona agrega productos al carrito.
2. Completa nombre, forma de entrega, fecha y notas.
3. Se abre WhatsApp con el pedido ya escrito, listo para enviar al número de `src/config.ts`.

## Alumno

Alumno: Maximiliano Alejandro Sosa.
