import React from "react";
import { Cpu, Mail, ArrowUp } from "lucide-react";
import { WHATSAPP_NUMBER } from "../utils/whatsapp";

interface FooterProps {
  setActiveCategory: (category: string) => void;
  navigateToCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveCategory, navigateToCatalog }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    navigateToCatalog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 text-zinc-400">
      
      {/* Top Banner with back to top button */}
      <div className="border-b border-zinc-900 bg-zinc-900/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            QUARK 3D — Tecnologia & Design em Impressão 3D
          </span>
          <button
            onClick={scrollToTop}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all active:scale-90"
            title="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Company Bio */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-wider">QUARK 3D</span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500">
              Transformando modelos digitais em produtos físicos tridimensionais de alta precisão. 
              Trabalhamos com filamentos de engenharia premium e resinas fotossensíveis para 
              entregar a melhor qualidade do mercado.
            </p>
          </div>

          {/* Quick Links Categories */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Categorias</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Organização", "Escritório", "Decoração", "Suportes", "Casa", "Geek", "Ferramentas"].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Institucional</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleCategoryClick("Todos")} className="hover:text-white transition-colors">
                  Ver Todo o Catálogo
                </button>
              </li>
              <li>
                <a href="#/sobre" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Como Funciona o Pedido
                </a>
              </li>
              <li>
                <a href="#/materiais" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Guia de Materiais 3D
                </a>
              </li>
              <li>
                <a href="#/faq" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Dúvidas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Socials */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Contato & Social</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors text-emerald-500 font-medium"
                >
                  <svg className="h-4 w-4 fill-emerald-500" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.479 2.012 14.019.99 11.397.99c-5.446 0-9.877 4.37-9.881 9.8-.001 1.763.476 3.486 1.381 5.02L1.888 20.1l4.759-1.238c.023-.008.046-.017.069-.026z" />
                  </svg>
                  WhatsApp: (11) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@quark3d.com.br"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-zinc-500" />
                  contato@quark3d.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/quark3d.printing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  @quark3d.printing
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-10 border-zinc-900" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} Quark 3D Printing. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#/termos" onClick={(e) => e.preventDefault()} className="hover:text-zinc-400">Termos de Uso</a>
            <a href="#/privacidade" onClick={(e) => e.preventDefault()} className="hover:text-zinc-400">Políticas de Privacidade</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
