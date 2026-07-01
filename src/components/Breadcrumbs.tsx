import React from "react";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  category: string;
  productName?: string;
  setActiveCategory: (category: string) => void;
  navigateToCatalog: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  category,
  productName,
  setActiveCategory,
  navigateToCatalog,
}) => {
  const handleHomeClick = () => {
    setActiveCategory("Todos");
    navigateToCatalog();
  };

  const handleCategoryClick = () => {
    setActiveCategory(category);
    navigateToCatalog();
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs font-medium text-zinc-500">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {/* Home */}
        <li className="inline-flex items-center">
          <button
            onClick={handleHomeClick}
            className="inline-flex items-center gap-1.5 hover:text-black transition-colors focus:outline-none"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </button>
        </li>
        
        {/* Category */}
        <li className="inline-flex items-center">
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300 mx-1" />
          <button
            onClick={handleCategoryClick}
            className="hover:text-black transition-colors focus:outline-none"
          >
            {category}
          </button>
        </li>

        {/* Product Name */}
        {productName && (
          <li className="inline-flex items-center text-zinc-900 truncate max-w-[150px] sm:max-w-none">
            <ChevronRight className="h-3.5 w-3.5 text-zinc-300 mx-1" />
            <span aria-current="page" className="font-semibold">
              {productName}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};
