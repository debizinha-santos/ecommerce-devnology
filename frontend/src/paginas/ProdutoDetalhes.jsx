import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
//import "./ProdutoDetalhes.css"; // Importando o CSS para estilização

const ProdutoDetalhes = () => {
  const { id, origem } = useParams();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarProduto = async () => {
      try {
        const baseUrl =
          origem === "BR"
            ? "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider"
            : "http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider";

        const resposta = await axios.get(`${baseUrl}/${id}`);
        const dados = resposta.data;

        const produtoFormatado =
          origem === "BR"
            ? {
                id: dados.id,
                name: dados.nome,
                price: Number(dados.preco),
                photo: dados.imagem,
                description: dados.descricao,
                origem: "BR",
              }
            : {
                id: dados.id,
                name: dados.name,
                price: Number(dados.price),
                photo: dados.photo,
                description: dados.description,
                origem: "EU",
              };

        setProduto(produtoFormatado);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setCarregando(false);
      }
    };

    buscarProduto();
  }, [id, origem]);

  if (carregando) return <p>Carregando...</p>;
  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <div className="card">
        <img
          src={produto.photo || "/notfound.png"}
          alt={produto.name}
          className="card-img-top"
          style={{ height: "350px", width: "350px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.public = "/notfound.png";
          }}
        />
        <div className="card-body">
          <h3 className="card-title">{produto.name}</h3>
          <p className="card-text">{produto.description}</p>
          <p className="card-text">Preço: R$ {produto.price}</p>
          <p className="card-text">
            Origem: {produto.origem === "BR" ? "Brasil" : "Europa"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdutoDetalhes;
