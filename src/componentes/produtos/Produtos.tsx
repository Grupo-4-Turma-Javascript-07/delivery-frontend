import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "../../api"; // importa a API para fazer requisições
import { Produtos } from "../../models/Produtos";

// Aqui criamos um "molde" para como um produto deve ser
interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  categoriaId: number;
  imagemUrl?: string; // opcional — usado quando queremos mostrar a imagem do produto
  categoria?: string; // opcional — usado quando queremos mostrar o nome da categoria
}

// E um molde para categoria (porque vamos buscar isso também)
interface Categoria {
  id: number;
  categoria: string;
}

// 📋 Nosso formulário começa sempre vazio
const estadoInicialForm = {
  nome: "",
  preco: 0,
  descricao: "",
  categoriaId: 0,
};

function Produto() {
  //  Aqui criamos "caixinhas de memória" para guardar informações
  const [loading, setLoading] = useState(false); // diz se está carregando
  const [error, setError] = useState(""); // guarda mensagens de erro
  const [produtos, setProdutos] = useState<Produto[]>([]); // lista de produtos
  const [categorias, setCategorias] = useState<Categoria[]>([]); // lista de categorias
  const [formData, setFormData] = useState(estadoInicialForm); // dados do formulário
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<Produto | null>(null); // produto que está sendo editado

  // Quando a página abrir, vamos buscar os produtos e categorias
  useEffect(() => {
    buscarProdutos();
    buscarCategorias();
  }, []);

  // Buscar lista de produtos no servidor
  async function buscarProdutos() {
    try {
      setLoading(true); // ativa o "carregando"
      const res = await api.get("/produto"); // pede para o servidor os produtos
      setProdutos(res.data); // guarda os produtos na memória
    } catch {
      setError("Erro ao buscar produtos");
    } finally {
      setLoading(false); // desativa o "carregando"
    }
  }

  // Buscar lista de categorias no servidor
  async function buscarCategorias() {
    try {
      const res = await api.get("/categoria");
      setCategorias(res.data);
    } catch {
      setError("Erro ao buscar categorias");
    }
  }

  // Quando clicar em "Salvar" no formulário
  async function handleSubmit(event: FormEvent) {
    event.preventDefault(); // impede a página de recarregar

    // se faltar algum dado, avisa e não continua
    if (!formData.nome.trim() || !formData.descricao.trim() || formData.categoriaId === 0) {
      alert("Por favor preencha todos os campos");
      return;
    }

    if (produtoEmEdicao) {
      // se estamos editando, atualiza o produto existente
      await api.put(`/produto/${produtoEmEdicao.id}`, formData);
    } else {
      // se não, adiciona um novo produto
      await api.post("/produto", formData);
    }

    // limpa o formulário e volta ao estado inicial
    setFormData(estadoInicialForm);
    setProdutoEmEdicao(null);
    buscarProdutos(); // atualiza a lista
  }

  // 🗑 Excluir produto
  async function handleDelete(id: number) {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      await api.delete(`/produto/${id}`);
      // remove o produto da lista sem precisar recarregar tudo
      setProdutos(produtos.filter((prod) => prod.id !== id));
    }
  }

  // Editar produto (coloca os dados no formulário)
  function handleEdit(produto: Produto) {
    setProdutoEmEdicao(produto);
    setFormData({
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      categoriaId: produto.categoriaId,
    });
  }

  // Cancelar edição
  function handleCancel() {
    setProdutoEmEdicao(null);
    setFormData(estadoInicialForm);
  }

  //  Quando digitar nos campos do formulário
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "preco" || name === "categoriaId" ? Number(value) : value,
    }));
  }

}

export default Produtos;