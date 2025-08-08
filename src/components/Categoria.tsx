import { useEffect, useState } from "react";
import { api } from "../api";

interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  produto: [];
}

function Categoria() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);


  useEffect(() => {
    buscarCategorias()
  },[])

  async function buscarCategorias() {
    try {
      setLoading(true);
      const res = await api.get("http://localhost:3000");
      setCategorias(res.data);
    } catch {
      setError("error ao buscar informações");
    } finally {
      setLoading(false);
    }
  }




  
  return <div>Categoria</div>;
}

export default Categoria;
