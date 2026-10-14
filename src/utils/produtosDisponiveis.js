export function filtrarProdutosDisponiveis(produtos) {
    return produtos.filter((produto) => {
        const temEstoque = Number(produto?.estoque ?? 0) > 0
        const temPreco = Number(produto?.price ?? 0) > 0
        return temEstoque && temPreco
    })
}

export function encontrarProdutoPorId(produtos, id) {
    const idNumerico = Number(id)
    return produtos.find((produto) => {
        const mesmoId = Number(produto.id) === idNumerico
        const temPreco = Number(produto?.price ?? 0) > 0
        return mesmoId && temPreco
    })
}

export function agruparEsperaPorProduto(listaEspera) {
    return listaEspera.reduce((acumulador, entrada) => {
        const produtoId = String(entrada.produtoId)

        if (!acumulador[produtoId]) {
            acumulador[produtoId] = []
        }

        acumulador[produtoId].push(entrada)
        return acumulador
    }, {})
}
