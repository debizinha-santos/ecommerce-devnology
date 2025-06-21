import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Produtos.css"; 
import ScrollTop from "../Utils/Scroll.jsx";


const Produtos = ({ adicionarAoCarrinho }) => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [quantidades, setQuantidades] = useState({});
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estados para busca e filtro
  const [busca, setBusca] = useState("");
  const [filtroOrigem, setFiltroOrigem] = useState("todos");

  const atualizarQuantidade = (produtoId, valor) => {
    const quantidade = Math.max(1, parseInt(valor) || 1);
    setQuantidades((prev) => ({
      ...prev,
      [produtoId]: quantidade,
    }));
  };

  const abrirDetalhes = (produto) => {
    setProdutoSelecionado(produto);
    setMostrarModal(true);
  };

  const buscarProdutos = async () => {
    try {
      setCarregando(true);
      const [resBR, resEU] = await Promise.all([
        axios.get(
          "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider"
        ),
        axios.get(
          "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider"
        ),
      ]);

      const produtosComOrigem = [
        ...resBR.data.map((p) => ({
          id: p.id,
          name: p.nome,
          price: Number(p.preco),
          photo: p.imagem,
          description: p.descricao,
          origem: "BR",
        })),
        ...resEU.data.map((p) => ({
          id: p.id,
          name: p.name,
          price: Number(p.price),
          photo: p.photo,
          description: p.description,
          origem: "EU",
        })),
      ];

      setProdutos(produtosComOrigem);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Produtos filtrados pela busca e filtro de origem
  const produtosFiltrados = produtos.filter((produto) => {
    const nomeMatch = produto.name.toLowerCase().includes(busca.toLowerCase());
    const origemMatch =
      filtroOrigem === "todos" || produto.origem === filtroOrigem;
    return nomeMatch && origemMatch;
  });

  return (
    <div className="container mt-4">
      {carregando ? (
        <p>Carregando produtos. Por favor, aguarde...</p>
      ) : (
        <>
          <div className="mb-4 d-flex flex-wrap gap-3 align-items-center">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nome..."
              style={{ maxWidth: "300px" }}
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

            <select
              className="form-select"
              style={{ maxWidth: "200px" }}
              value={filtroOrigem}
              onChange={(e) => setFiltroOrigem(e.target.value)}
            >
              <option value="todos">Todas as origens</option>
              <option value="BR">Brasil</option>
              <option value="EU">Europa</option>
            </select>
          </div>

          <div className="row">
            {produtosFiltrados.map((produto) => (
              <div
                className="col-md-4 mb-4"
                key={`${produto.origem}-${produto.id}`}
              >
                <div
                  className="card h-100"
                  style={{ cursor: "pointer" }}
                  onClick={() => abrirDetalhes(produto)}
                >
                  <img
                    src={produto.photo || "/notfound.png"}
                    alt={produto.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/notfound.png";
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{produto.name}</h5>
                    <p className="card-text">Preço: R$ {produto.price}</p>
                    <p className="card-text">
                      Origem: {produto.origem === "BR" ? "Brasil" : "Europa"}
                    </p>
                    <div className="acao-carrinho">
                      <button
                        className="btn btn-primary btnadicionar"
                        onClick={(e) => {
                          e.stopPropagation();
                          adicionarAoCarrinho({
                            ...produto,
                            quantidade:
                              quantidades[`${produto.origem}-${produto.id}`] ||
                              1,
                          });
                        }}
                      >
                        Adicionar ao Carrinho
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={
                          quantidades[`${produto.origem}-${produto.id}`] || 1
                        }
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) =>
                          atualizarQuantidade(
                            `${produto.origem}-${produto.id}`,
                            e.target.value
                          )
                        }
                        className="form-control"
                        style={{ maxWidth: "70px", marginLeft: "10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {mostrarModal && produtoSelecionado && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setMostrarModal(false)}
            >
              ×
            </button>
            <img
              src={produtoSelecionado.photo || "/notfound.png"}
              alt={produtoSelecionado.name}
              className="modal-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/notfound.png";
              }}
            />
            <h3>{produtoSelecionado.name}</h3>
            <p class="mt-2">{produtoSelecionado.description}</p>
            <div className="modal-info">
              <p>
                <strong>Preço:</strong> R$ {produtoSelecionado.price.toFixed(2)}
              </p>
              <p>
                <strong>Origem:</strong>{" "}
                {produtoSelecionado.origem === "BR" ? "Brasil" : "Europa"}
              </p>
            </div>
          </div>
        </div>
      )}
      <ScrollTop />
    </div>
    
  );
};

export default Produtos;
