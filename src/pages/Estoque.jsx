import { agruparEsperaPorProduto } from '../utils/produtosDisponiveis'

// Página usada pelo time de estoque para acompanhar a quantidade de cada produto
export default function Estoque({ produtos, listaEspera = [] }) {
  // slice cria uma cópia, para o sort não alterar a lista original
  const ordenados = produtos.slice().sort((a, b) => a.estoque - b.estoque)
  const esperasPorProduto = agruparEsperaPorProduto(listaEspera)

  return (
    <section>
      <p className="sobretitulo">Área interna</p>
      <h1>Estoque</h1>
      <p className="aviso">Produtos com menos de 5 unidades precisam de reposição.</p>

      <div className="tabela-moldura">
        <table className="tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Unidades</th>
              <th>Clientes na espera</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((produto) => {
              const clientesEspera = esperasPorProduto[String(produto.id)] ?? []

              return (
                <tr key={produto.id}>
                  <td>{produto.title}</td>
                  <td>{produto.category}</td>
                  <td>{produto.estoque}</td>
                  <td>
                    {clientesEspera.length === 0 ? (
                      'Nenhum'
                    ) : (
                      <ul className="lista-espera">
                        {clientesEspera.map((entrada) => (
                          <li key={entrada.id}>
                            <strong>{entrada.nome}</strong> — {entrada.email}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    {produto.estoque === 0 && <span className="selo selo-esgotado">Esgotado</span>}
                    {produto.estoque > 0 && produto.estoque < 5 && (
                      <span className="selo selo-alerta">Repor</span>
                    )}
                    {produto.estoque >= 5 && <span className="selo selo-ok">OK</span>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
