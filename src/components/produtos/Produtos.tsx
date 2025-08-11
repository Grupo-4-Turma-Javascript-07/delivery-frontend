import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "../../api";
import type Categoria from "../Categoria";

interface Produtos {
  id: number;
  nome: string;
  preco: number;
  qtd_disp: number;
  descricao: string;
  foto: string;
  usuario?: any;
  categoria: Categoria;
}

const estadoInicialForm = {
  nome: "",
  preco: "",
  qtd_disp: "",
  descricao: "",
  foto: "",
  categoria: "",
};

function Produtos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [produtos, setProdutos] = useState<Produtos[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState(estadoInicialForm);
  const [produtosEmEdicao, setProdutosEmEdicao] = useState<Produtos | null>(null);

  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
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

  async function buscarCategorias() {
    try {
      const res = await api.get("/categoria");
      setCategorias(res.data);
    } catch {
      setError("Erro ao buscar categorias");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const camposObrigatorios = ["nome", "preco", "qtd_disp", "descricao", "foto", "categoria"];

    const campoVazio = camposObrigatorios.some(
      (campo) => !formData[campo as keyof typeof formData]?.toString().trim()
    );

    if (campoVazio) {
      alert("Por favor preencha todos os campos");
      return;
    }

    const produtoPayload = {
      ...formData,
      preco: parseFloat(formData.preco.replace(",", ".")), // aceita vírgula na digitação
      qtd_disp: Math.max(0, parseInt(formData.qtd_disp, 10)), // impede negativo
      categoria: { id: parseInt(formData.categoria, 10) },
    };

    if (produtosEmEdicao) {
      await api.put(`/produtos/${produtosEmEdicao.id}`, produtoPayload);
    } else {
      await api.post("/produtos", produtoPayload);
    }

    setFormData(estadoInicialForm);
    setProdutosEmEdicao(null);
    buscarProdutos();
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await api.delete(`/produtos/${id}`);
      setProdutos(produtos.filter((produto) => produto.id !== id));
    }
  }

  function handleEdit(produto: Produtos) {
    setProdutosEmEdicao(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco.toString().replace(".", ","), // mostra com vírgula para editar
      qtd_disp: produto.qtd_disp.toString(),
      descricao: produto.descricao,
      foto: produto.foto,
      categoria: produto.categoria.id.toString(),
    });
  }

  function handleCancel() {
    setProdutosEmEdicao(null);
    setFormData(estadoInicialForm);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    let { name, value } = event.target;

    // Para o preço, aceitar vírgula e trocar por ponto para facilitar o parseFloat
    if (name === "preco") {
      value = value.replace(",", ".");
    }

    // Para qtd_disp impedir negativo, podemos usar min no input, mas reforçar aqui
    if (name === "qtd_disp") {
      if (value === "") {
        // deixar vazio permite apagar no input
        setFormData((prevData) => ({ ...prevData, [name]: "" }));
        return;
      }
      // permitir somente números >= 0
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0) {
        setFormData((prevData) => ({ ...prevData, [name]: num.toString() }));
      }
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* --- Formulário de Produtos --- */}
      <div className="bg-green-100 p-6 sm:p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {produtosEmEdicao ? "Editar Produto" : "Adicionar Novo Produto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            value={formData.nome}
            onChange={handleInputChange}
            className="block w-full p-3 border rounded bg-white"
          />

          <input
            type="text" // text para poder digitar vírgula
            name="preco"
            placeholder="Preço"
            value={formData.preco.replace(".", ",")}
            onChange={handleInputChange}
            className="block w-full p-3 border rounded bg-white"
          />

          <input
            type="number"
            name="qtd_disp"
            placeholder="Quantidade disponível"
            value={formData.qtd_disp}
            onChange={handleInputChange}
            min="0"
            className="block w-full p-3 border rounded bg-white"
          />

          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleInputChange}
            className="block w-full p-3 border rounded bg-white"
            rows={4}
          />

          <input
            type="text"
            name="foto"
            placeholder="URL da foto"
            value={formData.foto}
            onChange={handleInputChange}
            className="block w-full p-3 border rounded bg-white"
          />

          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            className="block w-full p-3 border rounded bg-white"
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoria}
              </option>
            ))}
          </select>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white 
                         bg-green-300 hover:bg-green-700 cursor-pointer"
            >
              {produtosEmEdicao ? "Salvar Alterações" : "Adicionar Produto"}
            </button>
            {produtosEmEdicao && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white 
                         bg-green-300 hover:bg-green-700 cursor-pointer"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Lista de Produtos --- */}
      <div className="bg-green-100 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Lista de Produtos</h2>

        <ul className="space-y-3">
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
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(produto)}
                  className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-semibold rounded-md text-gray-800
                         bg-yellow-200 hover:bg-yellow-300 cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(produto.id)}
                  className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-semibold rounded-md text-gray-800
                         bg-red-200 hover:bg-red-300 cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Produtos;
