// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Reemplazar por el dominio definitivo al publicar (se usa para URLs canónicas y Open Graph).
  site: 'https://barberina.com.ar',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
