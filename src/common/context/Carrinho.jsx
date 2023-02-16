import { createContext, useContext, useEffect, useState } from "react"
import { PagamentoContext, usePagamentoContext } from "./Pagamento"
import { UsuarioContex } from "./Usuario"

export const CarrinhoContext = createContext()
CarrinhoContext.displayName = "Carrinho"

export const CarrinhoProvider = ({children}) => {
  const [carrinho, setCarrinho] = useState([])
	const [quantidadeProduto, setQuantidadeProduto] = useState(0)
	const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0)
  return (
    <CarrinhoContext.Provider 
			value={
				{
					carrinho, 
					setCarrinho, 
					quantidadeProduto,
					setQuantidadeProduto,
					valorTotalCarrinho,
					setValorTotalCarrinho
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
		setQuantidadeProduto, 
		valorTotalCarrinho,
		setValorTotalCarrinho
	} = useContext(CarrinhoContext);
	const {formaPagamento} = usePagamentoContext();
	const {setSaldo} = useContext(UsuarioContex)
  
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

	function efetuarCompra() {
		setCarrinho([])
		setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho)
	}
	useEffect(() => {
		const {novaQuantidade, novoTotal} = carrinho.reduce((contador, produto) => ({
			novaQuantidade: contador.novaQuantidade + produto.quantidade, 
			novoTotal: contador.novoTotal + (produto.valor * produto.quantidade)
		}), 
		{
			novaQuantidade: 0,
			novoTotal: 0
		})
		setQuantidadeProduto(novaQuantidade)
		setValorTotalCarrinho(novoTotal * formaPagamento.juros)
	}, [carrinho, setQuantidadeProduto, setValorTotalCarrinho, formaPagamento])

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
		removeProduto,
		quantidadeProduto,
		setQuantidadeProduto,
		valorTotalCarrinho,
		efetuarCompra
  }
}