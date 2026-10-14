import { useState } from 'react'
import { Link, useParams } from 'react-router'
import ProdutoCard from '../components/ProdutoCard'
import { formatarPreco } from '../utils/formatarPreco'
import { encontrarProdutoPorId } from '../utils/produtosDisponiveis'

export default function PaginaProduto({ produtos, onAdicionar, onNotificarDisponibilidade }) {
  const { id } = useParams()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagemAviso, setMensagemAviso] = useState('')
  const produto = encontrarProdutoPorId(produtos, id)

  if (!produto) {
    return (
      <div className="estado-vazio">
        <p>Produto não encontrado.</p>
        <Link to="/" className="botao botao-secundario">
          Voltar para a loja
        </Link>
      </div>
    )
  }

  const esgotado = Number(produto.estoque ?? 0) === 0

  const relacionados = produtos
    .filter(
      (item) =>
        item.category === produto.category &&
        Number(item.id) !== Number(produto.id) &&
        Number(item.estoque ?? 0) > 0,
    )
    .slice(0, 4)

  function handleNotificarDisponibilidade(evento) {
    evento.preventDefault()

    if (!nome.trim() || !email.trim()) {
      setMensagemAviso('Preencha nome e e-mail para entrar na lista de espera.')
      return
    }

    onNotificarDisponibilidade(produto.id, nome, email)
    setNome('')
    setEmail('')
    setMensagemAviso('Você entrou na lista de espera. Vamos avisar quando o produto voltar!')
  }

  return (
    <section>
      <nav className="trilha" aria-label="Você está em">
        <Link to="/">Loja</Link>
        <span aria-hidden="true">/</span>
        <span>{produto.title}</span>
      </nav>

      <div className="detalhe">
        <div className="detalhe-imagem-moldura">
          <img src={produto.image} alt={produto.title} className="detalhe-imagem" />
        </div>

        <div className="detalhe-info">
          <h1>{produto.title}</h1>
          <p className="card-avaliacao">
            ★ {produto.rating.rate} <span>({produto.rating.count} avaliações)</span>
          </p>
          <p className="detalhe-preco">{formatarPreco(produto.price)}</p>
          <p className="detalhe-descricao">{produto.description}</p>
          <p className="detalhe-estoque">{produto.estoque} unidades disponíveis</p>

          {esgotado ? (
            <form onSubmit={handleNotificarDisponibilidade} className="cupom">
              <label className="rotulo">Produto esgotado. Deixe seu e-mail para ser avisado.</label>
              <input
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                placeholder="Seu nome"
                className="cupom-campo"
              />
              <input
                type="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                placeholder="Seu e-mail"
                className="cupom-campo"
              />
              <button type="submit" className="botao botao-grande">
                Avise-me quando voltar
              </button>
              {mensagemAviso && <p className="mensagem-cupom">{mensagemAviso}</p>}
            </form>
          ) : (
            <button
              className="botao botao-grande"
              onClick={() => onAdicionar(produto)}
              disabled={produto.estoque === 0}
            >
              Adicionar ao carrinho
            </button>
          )}

          <ul className="detalhe-garantias">
            <li>Troca grátis em até 30 dias</li>
            <li>Parcele em até 10x sem juros</li>
          </ul>
        </div>
      </div>

      <h2>Produtos relacionados</h2>
      <div className="grade">
        {relacionados.map((item) => (
          <ProdutoCard key={item.id} produto={item} onAdicionar={onAdicionar} />
        ))}
      </div>
    </section>
  )
}
