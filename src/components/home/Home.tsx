import { useState } from "react";
import NavbarCat from "../navbar/NavbarCat";

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
      <div id='home' className="bg-background flex items-center justify-center scroll-mt-44 mt-20">
        <div className='container grid grid-cols-2 text-nav-footer'>
          <div className="flex justify-center">
            <img
              src="https://alegrafoods.com.br/wp-content/uploads/2023/06/composicao-kit-feijoada-scaled.jpg"
              alt="Imagem Página Home"
              className='w-full h-96 rounded-[56px] object-cover shadow-lg'
            />
          </div>
          <div className="flex flex-col gap-3 items-center justify-center py-4 px-9 ">
            <h2 className='text-4xl font-bold text-green-400 mb-1'>
              TemperoBR
            </h2>
            <h3 className="text-3xl font-light text-green-300 mb-4 relative">
              Sabores do{' '}
              <span className="relative z-10 px-2 text-shadow-lg/15 font-semibold text-amber-300">Brasil
                <span className="absolute left-0 bottom-1 h-9 bg-green-400 rounded border-r-[4px] border-[#061735] animate-brasil"></span>
              </span>
            </h3>
            <p className='text-lg text-green-400'>
              No TemperoBR, cada garfada é uma viagem pelos sabores do nosso Brasil.
              Da feijoada caprichada ao tropeiro da vovó, entregamos comida com alma, feita com carinho e aquele tempero que aquece o coração.
            </p>
            <button className="px-4 py-2 hover:bg-green-400 hover:text-white hover:border-green-400 transition-all duration-300 border-2 rounded-4xl cursor-pointer">
              <a href="#cardapio">Ver Cardápio</a>
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 py-8 mt-8 space-y-4">
              <NavbarCat onCategoriaSelect={handleCategoriaSelect} />

      <main className="w">
        <div className="bg-green-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {categoriaFiltrada.nome}
          </h2>
            {categoriaFiltrada.id ? (
            <div className="text-center py-12">
              <div className="text-slate-600">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-lg">
                  <strong>{categoriaFiltrada.nome}</strong>
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
            
            {/* Subs por Produtos */}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border border-slate-200">
                    <img
                      src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.receiteria.com.br%2Freceita%2Farroz-biro-biro-com-calabresa%2F&psig=AOvVaw2LIQp3sC7VQfV-mYqtj2NK&ust=1754963063629000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMjcsoHRgY8DFQAAAAAdAAAAABAE'
                      alt=''
                      style={{ width: '100%', borderRadius: '8px' }}
                    />
                <h4 className="font-medium text-slate-700">Produto {i + 1}</h4>
                <p className="text-slate-600 text-sm">
                  Exemplo de produto da categoria {categoriaFiltrada.nome}.
                  Este conteúdo demonstra como a navbar permanece fixa no topo durante o scroll.
                </p>
              </div>
            ))}
          </div>
          </main>
          </div>
    </>
  )
}
export default Home