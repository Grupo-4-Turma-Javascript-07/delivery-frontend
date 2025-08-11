import { useEffect, useState } from "react";
import { api } from "../../api";
import NavbarCat from "../navbar/NavbarCat";
import type Produtos from "../produtos/Produtos";

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produtos, setProdutos] = useState<Produtos[]>([]);

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

    useEffect(() => {
      buscarProdutos();
    }, []);
  
    async function buscarProdutos() {
      try {
        setLoading(true);
        const res = await api.get("/produtos");
        setProdutos(res.data);
      } catch {
        setError("Erro ao buscar produtos");
      } finally {
        setLoading(false);
      }
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
      
      <div id="cardapio" className="w-full max-w-6xl mx-auto px-4 py-8 scroll-mt-2 space-y-8">
              <NavbarCat onCategoriaSelect={handleCategoriaSelect} />

      <main className="w">
        <div className="bg-green-100 p-6 rounded-xl shadow-lg mt-14">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            {categoriaFiltrada.nome}
          </h2>
            
            {/* Subs por on click get categoria.produto.map */}
<ul className="space-y-3">
          {!loading && !error && produtos.length === 0 && (
            <p className="text-slate-500">Nenhum produto encontrado.</p>
          )}
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg bg-white"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={produto.foto}
                  alt={produto.nome}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <span className="font-semibold">{produto.nome}</span>
                  <p>Preço: R$ {produto.preco.toFixed(2).replace(".", ",")}</p>
                  <p>Quantidade: {produto.qtd_disp}</p>
                  <p>{produto.descricao}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>          </div>
          </main>
          </div>
    </>
  )
}
export default Home