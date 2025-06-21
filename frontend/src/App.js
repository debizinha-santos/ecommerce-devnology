import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Produtos from "./paginas/Produtos";
import Carrinho from "./paginas/Carrinho";
import ProdutoDetalhes from "./paginas/ProdutoDetalhes";
import "./App.css"; // Importando o CSS para estilização

function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existente = prev.find(
        (item) => item.id === produto.id && item.origem === produto.origem
      );

      if (existente) {
        return prev.map((item) =>
          item.id === produto.id && item.origem === produto.origem
            ? { ...item, quantidade: item.quantidade + produto.quantidade }
            : item
        );
      }

      return [...prev, produto];
    });
  };

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar-loja">
          <img
            src="/EUROBRASIL.png"
            style={{ height: "50px", objectFit: "cover" }}
            alt="Logo da Loja"
            className="logo-loja"
          />
          <div className="navbar-links">

            <Link to="/" className="nav-link">
              Produtos
            </Link>
            <Link to="/carrinho" className="nav-link">
              Meu Carrinho ({carrinho.length})
            </Link>
          </div>
        </nav>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Produtos adicionarAoCarrinho={adicionarAoCarrinho} />}
        />
        <Route
          path="/carrinho"
          element={<Carrinho carrinho={carrinho} setCarrinho={setCarrinho} />}
        />
        <Route path="/produto/:origem/:id" element={<ProdutoDetalhes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
