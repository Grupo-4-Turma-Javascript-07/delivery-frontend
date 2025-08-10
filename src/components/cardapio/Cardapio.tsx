type Produto = {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem: string
}

export default function Cardapio() {
  const produtos: Produto[] = [
    {
      id: 1,
      nome: "Feijoada (500g)",
      descricao: "Feijoada completa, acompanha arroz, torresmo, farofa e couve!",
      preco: 40.90,
      imagem: "https://sabores-new.s3.amazonaws.com/public/2024/11/feijoada_1.jpg"
    },
    {
      id: 2,
      nome: "Baião de Dois (500g)",
      descricao: "Baião de dois que serve até duas pessoas, arroz, feijão, linguiça calabresa e queijo coalho.",
      preco: 38.90,
      imagem: "https://lirp.cdn-website.com/33406c6e/dms3rep/multi/opt/baiao+de+dois-1920w.jpg"
    }
  ]

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4">
      {produtos.length > 0 ? (
        produtos.map(produto => (
          <div
            key={produto.id}
            className="flex justify-between items-center border-b border-gray-200 p-4"
          >
            <div className="flex flex-col">
              <h3 className="font-bold text-lg">{produto.nome}</h3>
              <p className="text-gray-600 text-sm">{produto.descricao}</p>
              <span className="text-black font-semibold">
                R$ {produto.preco.toFixed(2)}
              </span>
            </div>
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-6">
          Nenhum produto cadastrado
        </p>
      )}
    </div>
  )
}
