import React, { useState, useEffect } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import type { ProductData } from "../components/ProductCard";
import { generateWhatsAppLink } from "../utils/whatsapp";
import { getProductImageUrl } from "../utils/imageHelper";
import { 
  Ruler, 
  Layers, 
  AlertCircle, 
  Check, 
  MessageSquare, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface ProductDetailPageProps {
  productId: string;
  products: ProductData[];
  setActiveCategory: (category: string) => void;
  navigateToCatalog: () => void;
  onViewDetails: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  products,
  setActiveCategory,
  navigateToCatalog,
  onViewDetails,
}) => {
  const product = products.find((p) => p.id === productId);

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Reset indices when product changes, aligning with default color's image
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (product) {
      // Find the image for the first color (index 0) if available
      const defaultColor = product.colors[0];
      if (defaultColor && defaultColor.image) {
        const imgIndex = product.images.indexOf(defaultColor.image);
        if (imgIndex !== -1) {
          setSelectedImageIndex(imgIndex);
          setSelectedColorIndex(0);
          return;
        }
      }
    }
    
    setSelectedImageIndex(0);
    setSelectedColorIndex(0);
  }, [productId, product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-zinc-950">Produto não encontrado</h2>
        <p className="mt-2 text-zinc-500">O produto solicitado pode ter sido removido ou o código está inválido.</p>
        <button
          onClick={navigateToCatalog}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  const selectedColor = product.colors[selectedColorIndex];
  
  // Dynamic WhatsApp Link
  const whatsAppLink = generateWhatsAppLink({
    productName: product.name,
    selectedColor: selectedColor?.name || "Padrão",
    material: product.material,
    dimensions: product.dimensions,
  });

  // Calculate related products (same category first, limit to 4, exclude current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .filter((p, index, self) => self.findIndex((t) => t.id === p.id) === index && p.id !== product.id)
    .slice(0, 4);

  // Image Navigation with color auto-detection
  const nextImage = () => {
    const nextIdx = (selectedImageIndex + 1) % product.images.length;
    setSelectedImageIndex(nextIdx);
    
    const imgPath = product.images[nextIdx];
    const colorIdx = product.colors.findIndex((c) => c.image === imgPath);
    if (colorIdx !== -1) {
      setSelectedColorIndex(colorIdx);
    }
  };

  const prevImage = () => {
    const prevIdx = (selectedImageIndex - 1 + product.images.length) % product.images.length;
    setSelectedImageIndex(prevIdx);
    
    const imgPath = product.images[prevIdx];
    const colorIdx = product.colors.findIndex((c) => c.image === imgPath);
    if (colorIdx !== -1) {
      setSelectedColorIndex(colorIdx);
    }
  };

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
    const color = product.colors[index];
    if (color && color.image) {
      const imgIndex = product.images.indexOf(color.image);
      if (imgIndex !== -1) {
        setSelectedImageIndex(imgIndex);
      }
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    const imgPath = product.images[index];
    const colorIdx = product.colors.findIndex((c) => c.image === imgPath);
    if (colorIdx !== -1) {
      setSelectedColorIndex(colorIdx);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-2">
          <Breadcrumbs
            category={product.category}
            productName={product.name}
            setActiveCategory={setActiveCategory}
            navigateToCatalog={navigateToCatalog}
          />
          <button
            onClick={navigateToCatalog}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Catálogo
          </button>
        </div>

        {/* Product Details Section */}
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
          
          {/* Gallery Column */}
          <div className="space-y-4">
            
            {/* Main Image Screen */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-50 shadow-sm">
              <img
                src={getProductImageUrl(product.images[selectedImageIndex])}
                alt={`${product.name} - Imagem ${selectedImageIndex + 1}`}
                className="h-full w-full object-cover object-center transition-opacity duration-300"
              />
              
              {/* Carousel navigation buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black shadow-md hover:bg-white transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-black shadow-md hover:bg-white transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery (below main image) */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative aspect-[4/3] w-24 flex-shrink-0 overflow-hidden rounded-xl border transition-all ${
                      selectedImageIndex === index
                        ? "border-black ring-2 ring-zinc-950/10 scale-95"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <img
                      src={getProductImageUrl(img)}
                      alt={`Miniatura ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Details Column */}
          <div className="flex flex-col">
            
            {/* Header info */}
            <div>
              <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
                {product.category}
              </span>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
                {product.name}
              </h1>
              
              <div className="mt-3 flex items-center justify-between border-b border-zinc-100 pb-5">
                <div>
                  <span className="text-xs text-zinc-400 block font-medium">Orçamento estimado</span>
                  <span className="text-2xl font-black text-zinc-950">
                    {product.price ? `R$ ${product.price.toFixed(2)}` : "Sob Consulta"}
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  Pronto para Encomenda
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-zinc-900">Descrição do Produto</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {product.description}
              </p>
            </div>

            {/* Color Swatch Selectors */}
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Cor Selecionada</h3>
                <span className="text-xs font-medium text-zinc-500">
                  {selectedColor?.name}
                </span>
              </div>
              
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(index)}
                    title={color.name}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all focus:outline-none ${
                      selectedColorIndex === index
                        ? "border-black scale-110 ring-4 ring-zinc-950/10"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColorIndex === index && (
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow-md shadow-black/10 transition-transform duration-200"
                        style={{
                          color: color.hex.toLowerCase() === "#ffffff" ? "#000000" : "#000000",
                        }}
                      >
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-8 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-6 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900">Ficha Técnica</h3>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                
                {/* Dimensions */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-zinc-100 text-zinc-600 shadow-sm">
                    <Ruler className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-zinc-400 font-medium">Dimensões Máximas</span>
                    <span className="font-semibold text-zinc-800">{product.dimensions}</span>
                  </div>
                </div>

                {/* Material */}
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-zinc-100 text-zinc-600 shadow-sm">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-zinc-400 font-medium">Material Utilizado</span>
                    <span className="font-semibold text-zinc-800">{product.material}</span>
                  </div>
                </div>

              </div>

              {/* Technical Notes */}
              <div className="flex gap-3 border-t border-zinc-200/50 pt-4 text-xs">
                <AlertCircle className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                <p className="text-zinc-500 leading-relaxed">
                  <span className="font-semibold text-zinc-700">Observações: </span>
                  {product.notes}
                </p>
              </div>

            </div>

            {/* Main Order CTA Button */}
            <div className="mt-8">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-500 py-4 text-center font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0 text-base"
              >
                <MessageSquare className="h-5 w-5 fill-white text-emerald-500" />
                Solicitar pelo WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-zinc-400">
                Ao clicar, você iniciará uma conversa com as especificações do produto pré-selecionadas.
              </p>
            </div>

          </div>
        </div>

        {/* Related Products Shelf */}
        <section className="mt-20 border-t border-zinc-100 pt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Produtos Relacionados</h2>
              <p className="text-sm text-zinc-500">Veja outras peças que podem combinar com o seu setup.</p>
            </div>
            <button
              onClick={() => {
                setActiveCategory(product.category);
                navigateToCatalog();
              }}
              className="text-xs font-bold text-indigo-600 hover:text-black transition-colors self-start sm:self-auto"
            >
              Ver mais em {product.category} →
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
