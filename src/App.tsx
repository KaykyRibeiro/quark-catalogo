import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CatalogPage } from "./pages/CatalogPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import productsDataRaw from "./data/products.json";
import type { ProductData } from "./components/ProductCard";

// Cast JSON imports
const products = productsDataRaw as ProductData[];

interface RouteState {
  name: "catalog" | "product";
  id?: string;
}

function App() {
  // Routing State
  const [route, setRoute] = useState<RouteState>({ name: "catalog" });
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Parse window URL hash
  const parseHash = (): RouteState => {
    const hash = window.location.hash;
    if (hash.startsWith("#/product/")) {
      const id = hash.replace("#/product/", "");
      return { name: "product", id };
    }
    return { name: "catalog" };
  };

  // Listen to hash changes
  useEffect(() => {
    // Set initial route
    setRoute(parseHash());

    const handleHashChange = () => {
      setRoute(parseHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Navigation handlers
  const navigateToCatalog = () => {
    window.location.hash = "/";
  };

  const onViewDetails = (id: string) => {
    window.location.hash = `/product/${id}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans antialiased">
      
      {/* Dynamic Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
        currentRoute={route.name}
        navigateToCatalog={navigateToCatalog}
      />

      {/* Main Page Content */}
      <main className="flex-grow animate-fade-in">
        {route.name === "catalog" ? (
          <CatalogPage
            products={products}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onViewDetails={onViewDetails}
          />
        ) : (
          <ProductDetailPage
            productId={route.id || ""}
            products={products}
            setActiveCategory={setActiveCategory}
            navigateToCatalog={navigateToCatalog}
            onViewDetails={onViewDetails}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveCategory={setActiveCategory}
        navigateToCatalog={navigateToCatalog}
      />
      
    </div>
  );
}

export default App;
