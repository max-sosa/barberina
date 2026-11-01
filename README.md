# Barberina

Barberina || Un lugar de cosas ricas.

Sitio de la pastelería y panadería Barberina (Olivos, Buenos Aires), con tienda online y pedidos por WhatsApp.

**Sitio publicado:** https://barberina.vercel.app

## Tecnologías

- [Astro](https://astro.build): sitio estático, rápido y bueno para SEO
- [Tailwind CSS v4](https://tailwindcss.com) para los estilos, con la paleta propia en `src/styles/global.css`
- [Preact](https://preactjs.com) + [nanostores](https://github.com/nanostores/nanostores) para el carrito (se guarda en `localStorage`)
- Tipografías Fraunces (títulos) e Inter (texto), servidas desde el propio sitio
- Imágenes optimizadas automáticamente a WebP con `astro:assets`

## Cómo usarlo

Requiere Node.js 22 o superior.

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

## Estructura

```
src/
├── assets/          # fotos de productos, historia, envíos y logo
├── components/      # cabecera, pie, tarjetas, formulario de contacto
│   └── carrito/     # estado del carrito, botón, panel y "agregar al carrito"
├── content/
│   └── productos/   # un archivo .md por producto
├── layouts/         # layout base (SEO, cabecera, pie, carrito)
├── lib/             # utilidades: formato de precios, enlaces de WhatsApp
├── pages/           # una página por ruta (/, /tienda, /tortas, /producto/[id], ...)
├── styles/          # Tailwind y paleta de colores
└── config.ts        # datos del negocio
public/              # favicons
```

Los archivos del sitio anterior (`*.html`, `index.css`, `sass/`, `scripts/` e `images/`) siguen en la raíz como referencia. El sitio nuevo no los usa y se pueden borrar.

## Publicación

El sitio está en Vercel, en el proyecto `barberina` del equipo FixCo360. Vercel compila con `npm run build` y publica la carpeta `dist/`.

El proyecto todavía no está conectado al repositorio, así que los cambios no se publican solos: hay que lanzar un nuevo deploy desde Vercel. Para que cada commit se publique automáticamente, conectalo en Vercel → proyecto `barberina` → Settings → Git → Connect Git Repository y elegí la rama de producción.

Antes de publicar el dominio definitivo, actualizá `site` en `astro.config.mjs`; se usa para las URLs canónicas y las vistas previas al compartir en redes.

## Cómo funciona el pedido

1. La persona agrega productos al carrito.
2. Completa nombre, forma de entrega, fecha y notas.
3. Se abre WhatsApp con el pedido ya escrito, listo para enviar al número de `src/config.ts`.

## Pendientes

- Revisar las descripciones de los productos.
- Actualizar precios y el monto de envío gratis (`envioGratisDesde` en `src/config.ts`).
- Borrar los archivos del sitio anterior.

## Alumno

Alumno: Maximiliano Alejandro Sosa.
