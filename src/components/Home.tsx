import { useState } from "react";
import NavbarCat from "./NavbarCat";

function Home() {
  const [categoriaFiltrada, setCategoriaFiltrada] = useState<{
    id: number | null;
    nome: string;
  }>({
    id: null,
    nome: "Todos"
  });

  function handleCategoriaSelect(categoriaId: number | null, categoriaNome: string) {
    setCategoriaFiltrada({
      id: categoriaId,
      nome: categoriaNome
    });
  }

  return (
    <>
      {/* Navbar de categorias */}
      <NavbarCat onCategoriaSelect={handleCategoriaSelect} />

      {/* Conteúdo principal */}
      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="bg-green-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {categoriaFiltrada.nome}
          </h2>
          
          {categoriaFiltrada.id ? (
            <div className="text-center py-12">
              <div className="text-slate-600">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-lg">
                  Produtos da categoria <strong>{categoriaFiltrada.nome}</strong> serão exibidos aqui
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  ID da categoria selecionada: {categoriaFiltrada.id}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-600">
                <div className="text-6xl mb-4">🇧🇷</div>
                <p className="text-lg">
                  Todos os produtos serão exibidos aqui
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  Aguardando implementação do componente de produtos
                </p>
              </div>
            </div>
          )}

          {/* Simulação de conteúdo para demonstrar scroll */}
          <div className="mt-8 space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-slate-800">Área de produtos</h3>
              <p className="text-slate-600 text-sm">
                Aqui será implementada a lista de produtos pelos outros integrantes do projeto.
              </p>
            </div>
            
            {/* Conteúdo adicional para demonstrar o scroll */}
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-200">
                <h4 className="font-medium text-slate-700">Produto {i + 1}</h4>
                <p className="text-slate-600 text-sm">
                  Exemplo de produto da categoria {categoriaFiltrada.nome}.
                  Este conteúdo demonstra como a navbar permanece fixa no topo durante o scroll.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;