// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

const LIMITE_FRETE_GRATIS = 200

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => total + (Number(produto.price) || 0), 0)
}

export function valorFaltanteParaFreteGratis(valorTotal) {
  const total = Number(valorTotal) || 0
  return Math.max(LIMITE_FRETE_GRATIS - total, 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
