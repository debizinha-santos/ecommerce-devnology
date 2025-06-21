import React, { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Carrinho.css"; // Importando o CSS para estilização

const Carrinho = ({ carrinho, setCarrinho }) => {
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);
  const navigate = useNavigate();

  const finalizarCompra = async () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const pedido = {
      itens: carrinho.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantidade: item.quantidade || 1,
        origem: item.origem,
      })),
      total: carrinho.reduce(
        (soma, item) => soma + item.price * (item.quantidade || 1),
        0
      ),
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/pedidos`, pedido);
      setCarrinho([]);
      setPedidoFinalizado(true);

      // Redireciona após 2 segundos
      setTimeout(() => {
        setPedidoFinalizado(false);
        navigate("/");
      }, 2000);
    } catch (erro) {
      console.error("Erro ao finalizar pedido:", erro);
      alert("Erro ao finalizar o pedido. Tente novamente.");
    }
  };

  const total = carrinho.reduce(
    (soma, item) => soma + item.price * (item.quantidade || 1),
    0
  );

  return (
    <div className="carrinho-container">
      <h3 className="carrinho-titulo">Seu Carrinho</h3>
      {carrinho.map((item) => (
        <div className="item-carrinho" key={`${item.origem}-${item.id}`}>
          <div className="item-info">
            <span className="item-nome">{item.name}</span>
            <span className="item-detalhes">
              R$ {item.price.toFixed(2)} x {item.quantidade || 1}
            </span>
          </div>
          <div>R$ {(item.price * (item.quantidade || 1)).toFixed(2)}</div>
        </div>
      ))}
      <p className="total">Total: R$ {total.toFixed(2)}</p>

      <button className="finalizar-btn" onClick={finalizarCompra}>
        Finalizar Compra
      </button>

      {pedidoFinalizado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Pedido realizado com sucesso!</h4>
            <p>Redirecionando para a tela de produtos...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrinho;
