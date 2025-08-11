import { useEffect, useState } from "react";
import { api } from "../../api";

interface Categoria {
  id: number;
  categoria: string;
  descricao: string;
}

interface NavbarCatProps {
  onCategoriaSelect?: (categoriaId: number | null, categoriaNome: string) => void;
  onRecomendacao?: (categoriaId: number | null) => void;
  categoriaAtiva?: number | null;
}

function NavbarCat({ onCategoriaSelect, onRecomendacao, categoriaAtiva }: NavbarCatProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setLoading(true);
      const res = await api.get("/categoria");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoriaClick(categoria: Categoria | null) {
    if (categoria) {
      onCategoriaSelect?.(categoria.id, categoria.categoria);
    } else {
      onCategoriaSelect?.(null, "Todos");
    }
  }

  return (
    <div className="sticky top-[86px] z-50 bg-white rounded-lg border-b border-slate-200 shadow-sm">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-1 py-3 overflow-x-auto scrollbar-hide">
          {/* Botão "Todos" */}
          <button
            onClick={() => handleCategoriaClick(null)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
              categoriaAtiva === null
                ? "bg-green-200 text-slate-800 shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-slate-800"
            }`}
          >
            Todos
          </button>

          {/* Botões das categorias */}
          {loading ? (
            <div className="flex space-x-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 h-8 w-24 bg-slate-200 rounded-full animate-pulse"
                />
              ))}
            </div>
          ) : (
            categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => handleCategoriaClick(categoria)}
                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
                  categoriaAtiva === categoria.id
                    ? "bg-green-200 text-slate-800 shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-green-100 hover:text-slate-800"
                }`}
                title={categoria.descricao}
              >
                {categoria.categoria}
              </button>
            ))
          )}

          {/* Botão de Recomendação - APENAS UMA VEZ, FORA DO LOOP */}
          <button
            onClick={() => onRecomendacao?.(categoriaAtiva ?? null)}
            className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap ${
              categoriaAtiva === -1
                ? "bg-amber-200 text-amber-800 shadow-md"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200"
            }`}
          >
            🎯 Recomendação!
          </button>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default NavbarCat;