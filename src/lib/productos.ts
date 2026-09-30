import { getCollection, type CollectionEntry } from 'astro:content';

export type Categoria = CollectionEntry<'productos'>['data']['categoria'];

export const categorias: Record<Categoria, { titulo: string; bajada: string }> = {
  tortas: {
    titulo: 'Tortas',
    bajada:
      'Elaboradas con ingredientes frescos y naturales. También hacemos tortas personalizadas para cumpleaños y eventos.',
  },
  panificados: {
    titulo: 'Panificados',
    bajada:
      'Panes frescos y sabrosos, hechos con ingredientes de la más alta calidad, para disfrutar solo o en familia.',
  },
};

export async function obtenerProductos(categoria?: Categoria) {
  const productos = await getCollection('productos', (p) => !categoria || p.data.categoria === categoria);
  const ordenCategoria: Record<Categoria, number> = { tortas: 0, panificados: 1 };
  return productos.sort(
    (a, b) => ordenCategoria[a.data.categoria] - ordenCategoria[b.data.categoria] || a.data.orden - b.data.orden,
  );
}
