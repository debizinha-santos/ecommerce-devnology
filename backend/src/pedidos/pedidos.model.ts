export interface Pedido {
  id?: number;
  data?: string;
  total: number;
  itens: {
    id: string;
    name: string;
    price: number;
    quantidade: number;
    origem: string;
  }[];
}