import { createContext, useContext, useEffect, useState } from "react"

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = "Carrinho"

export const CarrinhoProvider = ({children}) => {
  const [carrinho, setCarrinho] = useState([])
	const [quantidadeProduto, setQuantidadeProduto] = useState(0)
  return (
    <CarrinhoContext.Provider 
			value={
				{
					carrinho, 
					setCarrinho, 
					quantidadeProduto,
					setQuantidadeProduto
				}
				}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinhoContext = () => {
  const {
		carrinho, 
		setCarrinho, 
		quantidadeProduto, 
		setQuantidadeProduto
	} = useContext(CarrinhoContext);
  
	function mudarQuantidade(id, quantidade) {
		return carrinho.map(itemDoCarrinho => {
			if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade
			return itemDoCarrinho
		})
	}

	function adicionarProduto(novoProduto) {
		const temProduto = carrinho.some(
			(itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
		);
		if (!temProduto) {
			novoProduto.quantidade = 1;
			return setCarrinho((carrinhoAnterior) => [
				...carrinhoAnterior,
				novoProduto,
			]);
		}
		setCarrinho(mudarQuantidade(novoProduto.id, 1))
	}
	function removeProduto(id) {
		const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)
		const ehOUltilmo = produto.quantidade === 1
		if(ehOUltilmo) {
			return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id))
		}
		setCarrinho(mudarQuantidade(id, -1))
	}

	useEffect(() => {
		const novaQuantidade = carrinho.reduce((contador, produto) => contador + produto.quantidade, 0)
		setQuantidadeProduto(novaQuantidade)
	}, [carrinho, setQuantidadeProduto])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
		removeProduto,
		quantidadeProduto,
		setQuantidadeProduto
  }
}