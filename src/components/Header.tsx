import React, { useState } from "react";
import { Search, Menu, X, Cpu, Phone } from "lucide-react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  currentRoute: string;
  navigateToCatalog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  currentRoute,
  navigateToCatalog,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentRoute !== "catalog") {
      navigateToCatalog();
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    navigateToCatalog();
    setIsMobileMenuOpen(false);
  };

  const categories = [
    "Todos",
    "Organização",
    "Escritório",
    "Decoração",
    "Suportes",
    "Casa",
    "Geek",
    "Ferramentas",
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => {
              setActiveCategory("Todos");
              setSearchQuery("");
              navigateToCatalog();
            }}
            className="flex cursor-pointer items-center gap-2 transition-transform duration-200 active:scale-95"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-md shadow-zinc-300">
              <Cpu className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider text-black">QUARK</span>
              <span className="text-xs font-semibold tracking-widest text-zinc-400 block -mt-1">3D PRINTING</span>
            </div>
          </div>

          {/* Search Bar - Center */}
          <div className="hidden max-w-md flex-1 md:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                <Search className="h-5 w-5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Pesquise por produtos impressos..."
                className="w-full rounded-full border border-zinc-200 bg-zinc-50/50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-black focus:bg-white focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Navigation & CTA */}
          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-6">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-sm font-medium transition-colors hover:text-black ${
                    activeCategory === cat && currentRoute === "catalog"
                      ? "text-black underline underline-offset-8 decoration-2"
                      : "text-zinc-500"
                  }`}
                >
                  {cat === "Todos" ? "Catálogo" : cat}
                </button>
              ))}
            </nav>

            <span className="h-6 w-px bg-zinc-200" />

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-all duration-200 hover:bg-emerald-600 hover:shadow-emerald-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="h-4 w-4" />
              Falar WhatsApp
            </a>
          </div>

          {/* Mobile Search and Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input - visible on smaller screens */}
        <div className="pb-4 md:hidden">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar produtos..."
              className="w-full rounded-full border border-zinc-200 bg-zinc-50/50 py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-black focus:bg-white"
            />
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-zinc-100 bg-white px-4 py-6 shadow-xl lg:hidden animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            <div className="font-semibold text-xs tracking-wider text-zinc-400 uppercase">Categorias</div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-all ${
                    activeCategory === cat && currentRoute === "catalog"
                      ? "bg-black text-white"
                      : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <hr className="border-zinc-150" />
            
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-100"
            >
              <Phone className="h-4 w-4" />
              Solicitar Orçamento
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
