import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getProductImageUrl } from "../utils/imageHelper";

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  images: string[];
  colors: { name: string; hex: string; image?: string }[];
  dimensions: string;
  material: string;
  notes: string;
}

interface ProductCardProps {
  product: ProductData;
  onViewDetails: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div
      onClick={() => onViewDetails(product.id)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-200 hover:shadow-xl hover:shadow-zinc-100 cursor-pointer"
    >
      {/* Category Tag (Floating Glassmorphism) */}
      <div className="absolute top-4 left-4 z-10 rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-950 shadow-sm backdrop-blur-md">
        {product.category}
      </div>

      {/* Product Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50">
        <img
          src={getProductImageUrl(product.images[0])}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold tracking-tight text-zinc-950 group-hover:text-indigo-600 transition-colors duration-200">
            {product.name}
          </h3>
          
          {/* Technical Specs Summary */}
          <p className="mt-1 text-xs font-medium text-zinc-400">
            {product.material} • {product.dimensions}
          </p>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-500">
            {product.description}
          </p>
        </div>

        {/* Action / Price Area */}
        <div className="mt-6 flex items-center justify-between border-t border-zinc-50 pt-4">
          <div>
            <span className="text-xs text-zinc-400 block font-medium">Orçamento estimado</span>
            <span className="text-base font-bold text-zinc-950">
              {product.price ? `R$ ${product.price.toFixed(2)}` : "Sob Consulta"}
            </span>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product.id);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white transition-all duration-200 group-hover:bg-indigo-600 group-hover:scale-105 active:scale-95 shadow-md shadow-zinc-200"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
