import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "../../api";

interface Categoria {
  id: number;
  categoria: string;
  descricao: string;
}

const estadoInicialForm = {
  descricao: "",
  categoria: "",
};

function Categoria() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [formData, setFormData] = useState(estadoInicialForm);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState<Categoria | null>(
    null
  );

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setLoading(true);
      const res = await api.get("/categoria");
      console.log("Categorias recebidas:", res.data);
      setCategorias(res.data);
    } catch {
      setError("error ao buscar informações");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!formData.categoria.trim() || !formData.descricao.trim()) {
      alert("Por favor preencha todos os campos");
      return;
    }

    if (categoriaEmEdicao) {
      await api.put(`/categoria/${categoriaEmEdicao.id}`, formData);
    } else {
      await api.post("/categoria", formData);
    }

    setFormData(estadoInicialForm);
    setCategoriaEmEdicao(null);
    buscarCategorias();
  }

  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      await api.delete(`/categoria/${id}`);
      setCategorias(categorias.filter((cat) => cat.id !== id));
    }
  }

  function handleEdit(categoria: Categoria) {
    setCategoriaEmEdicao(categoria);
    setFormData({
      categoria: categoria.categoria,
      descricao: categoria.descricao,
    });
  }

  function handleCancel() {
    setCategoriaEmEdicao(null);
    setFormData(estadoInicialForm);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    
    <div id='categoria' className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* --- Card do Formulário --- */}
      <div className="bg-green-100 p-6 sm:p-8 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {categoriaEmEdicao ? "Editar Categoria" : "Adicionar Nova Categoria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-slate-800 mb-1"
            >
              Nome da Categoria
            </label>
            <input
              type="text"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              className="block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm p-3 text-slate-800
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-slate-800 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              className="block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm p-3 text-slate-800
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-semibold rounded-md text-white 
                         bg-green-300 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition-colors duration-200"
            >
              {categoriaEmEdicao ? "Salvar Alterações" : "Adicionar Categoria"}
            </button>
            {categoriaEmEdicao && (
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-5 border border-slate-300 shadow-sm text-sm font-semibold rounded-md text-slate-700 
                           bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                           transition-colors duration-200"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Card da Lista de Categorias --- */}
      <div className="bg-green-100 p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Categorias
        </h2>

        {loading && <p className="text-slate-500">Carregando...</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <ul className="space-y-3">
          {!loading && !error && categorias.length === 0 && (
            <p className="text-slate-500">Nenhuma categoria encontrada.</p>
          )}
          {categorias.map((cat) => (
            <li
              key={cat.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-150"
            >
              <div className="mb-3 sm:mb-0">
                <span className="font-semibold text-slate-800">
                  {cat.categoria}
                </span>
                <p className="text-sm text-slate-600">{cat.descricao}</p>
              </div>

              <div className="flex space-x-2 self-end sm:self-center">
                <button
                  onClick={() => handleEdit(cat)}
                  className="py-1 px-3 text-sm font-medium rounded-md text-black bg-yellow-200 hover:bg-yellow-300 hover:text-yellow-800 transition-colors duration-150"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="py-1 px-3 text-sm font-medium rounded-md text-black bg-red-200 hover:bg-red-300 hover:text-red-800 transition-colors duration-150"
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

export default Categoria;
