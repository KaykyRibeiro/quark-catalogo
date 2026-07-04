// Helper to resolve product image assets dynamically under Vite
const productImages = import.meta.glob('/src/assets/products/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const getProductImageUrl = (path: string): string => {
  if (!path) return "";
  
  // Normalize path to match keys in productImages (which start with /src/)
  let normalized = path;
  if (normalized.startsWith('./')) {
    normalized = normalized.slice(2);
  }
  if (normalized.startsWith('/')) {
    normalized = normalized.slice(1);
  }
  if (!normalized.startsWith('src/')) {
    normalized = `src/${normalized}`;
  }
  
  const key = `/${normalized}`;
  return productImages[key] || path;
};
