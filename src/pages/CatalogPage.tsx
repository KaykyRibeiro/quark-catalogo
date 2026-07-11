import React, { useState, useMemo, useEffect } from "react";
import { ProductCard } from "../components/ProductCard";
import type { ProductData } from "../components/ProductCard";
import { SlidersHorizontal, Trash2, Cpu, Sparkles } from "lucide-react";

interface CatalogPageProps {
  products: ProductData[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onViewDetails: (id: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  onViewDetails,
}) => {
  const categories = [
    "Todos",
    "Organização",
    "Ferramentas",
    "Escritório",
    "Decoração",
    "Suportes",
    "Banheiro",
    "Geek",
    "Chaveiros",
    "Religiosos",
    "Outros"
  ];

  // Shuffle products array once when the products list or component mounts
  const shuffledProducts = useMemo(() => {
    const arr = [...products];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [products]);

  // Filter products based on search query and selected category
  const filteredProducts = useMemo(() => {
    const queryClean = searchQuery.toLowerCase().replace(/[\s#_-]/g, "");
    return shuffledProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some(tag => {
          const tagClean = tag.toLowerCase().replace(/[\s#_-]/g, "");
          return tagClean.includes(queryClean);
        }));
        
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [shuffledProducts, searchQuery, activeCategory]);

  const INITIAL_LIMIT = 8;
  const INCREMENT_LIMIT = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  // Reset visible count when search query or category changes
  useEffect(() => {
    setVisibleCount(INITIAL_LIMIT);
  }, [searchQuery, activeCategory]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INCREMENT_LIMIT);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("Todos");
  };

  return (
    <div className="bg-white pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-zinc-950 py-20 text-white lg:py-28">
        {/* Abstract grids / design elements in the background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-semibold text-zinc-300 backdrop-blur-sm mb-6">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Catálogo Interativo 3D
          </div>
          <div className="flex items-center justify-center">
            <img src="./logomarca-transparente.png" className="h-50" alt="" />
          </div>
          
          
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 leading-relaxed sm:text-lg">
            Navegue por nossa linha exclusiva de organizadores, itens geek, ferramentas e peças decorativas. 
            Todos os itens são impressos sob demanda com tecnologia de ponta e materiais sustentáveis.
          </p>
        </div>
      </section>

      {/* Catalog Control Section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        
        {/* Category Pills Header */}
        <div className="flex flex-col gap-4 border-b border-zinc-150 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-zinc-900">
            <SlidersHorizontal className="h-5 w-5 text-zinc-500" />
            <span className="font-bold tracking-tight">Filtros de Categoria</span>
          </div>

          {(searchQuery || activeCategory !== "Todos") && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-black transition-colors self-start md:self-auto"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Category Pills Slider */}
        <div className="mt-4 flex overflow-x-auto pb-3 gap-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                activeCategory === cat
                  ? "bg-zinc-950 text-white shadow-md shadow-zinc-300"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Text */}
        <div className="mt-8 flex items-center justify-between text-sm text-zinc-500">
          <p>
            Mostrando{" "}
            <span className="font-semibold text-black">
              {Math.min(visibleCount, filteredProducts.length)}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-black">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            {activeCategory !== "Todos" && (
              <>
                {" "}
                em <span className="font-semibold text-black">"{activeCategory}"</span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}
                para <span className="font-semibold text-black">"{searchQuery}"</span>
              </>
            )}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={onViewDetails}
                  setSearchQuery={setSearchQuery}
                  navigateToCatalog={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
            {filteredProducts.length > visibleCount && (
              <div className="mt-12 flex justify-center animate-fade-in">
                <button
                  onClick={handleLoadMore}
                  className="rounded-full bg-zinc-950 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-zinc-300 hover:bg-zinc-800 transition-all duration-250 hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  Carregar Mais
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="my-16 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400 mb-4">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900">Nenhum produto correspondente</h3>
            <p className="mt-2 max-w-sm text-sm text-zinc-500 leading-relaxed">
              Não encontramos resultados para a sua busca ou filtro. Tente redefinir suas palavras-chave ou categorias.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-zinc-950 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-zinc-300 transition-all hover:bg-zinc-800"
            >
              Exibir Todos os Produtos
            </button>
          </div>
        )}

      </section>

    </div>
  );
};
