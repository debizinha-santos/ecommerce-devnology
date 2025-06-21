# Desafio Técnico — E-commerce Fullstack (React + Node + NestJS)

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor(a) Júnior na empresa Devnology.  
O objetivo foi construir uma aplicação de e-commerce fullstack integrando produtos de duas APIs externas, permitindo listagem, filtro, adição ao carrinho e finalização de pedidos, com persistência via backend.







## 🧪 Tecnologias Utilizadas

- **Frontend**: [React](https://reactjs.org/), [Axios](https://axios-http.com/)
- **Backend**: [Node.js](https://nodejs.org/), [NestJS](https://nestjs.com/)
- **Estilização**: CSS customizado
- **Extras**: 
  - `useState`, `useEffect` e `useNavigate`
  - Fallback para imagens ausentes
  - Modal de confirmação de pedido

---







## 📦 APIs Externas Utilizadas
Fornecedor Brasileiro

GET http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider

Fornecedor Europeu

GET http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider


---







## 🛠️ Como rodar o projeto localmente

### 📁 1. Clone o repositório

git clone https://github.com/debizinha-santos/ecommerce-devnology.git
cd ecommerce-devnology

## Frontend
- cd frontend
- npm install
- npm start

## Backend
- cd backend
- npm install
- npm run start


🛍️ Funcionalidades: 

🔍 Busca e filtro por nome e origem
🧺 Carrinho com quantidade personalizada
💬 Feedback visual após finalização da compra
❌ Fallback para imagens ausentes
✅ Redirecionamento automático após pedido



📌 Decisões Técnicas
Padronização dos dados no frontend (nome → name, preco → price)
Campo origem adicionado aos produtos para controle
Armazenamento de carrinho no estado do componente pai
CSS modularizado e sem uso de bibliotecas


- **Carrinho de compras**: armazenado no estado global do App, permitindo navegação entre páginas sem perder os dados.


## 🖼️ Tratamento de Imagens Indisponíveis


Durante o consumo das APIs, algumas imagens retornadas (principalmente da API europeia) estavam quebradas ou ausentes. Para manter a consistência visual e garantir uma boa experiência do usuário, foi implementado um tratamento de fallback:

```jsx
<img
  src={produto.photo || "/notfound.png"}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "/notfound.png";
  }}
  alt={produto.name}
/>






