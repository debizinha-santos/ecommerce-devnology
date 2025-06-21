import { Injectable } from '@nestjs/common';
import { Pedido } from './pedidos.model';

@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = [];

  criarPedido(pedido: Pedido): Pedido {
    const novoPedido: Pedido = {
      ...pedido,
      id: this.pedidos.length + 1,
      data: new Date().toISOString(),
    };

    this.pedidos.push(novoPedido);
    return novoPedido;
  }

  listarPedidos(): Pedido[] {
    return this.pedidos;
  }
}
