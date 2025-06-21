import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Pedido } from './pedidos.model';//

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  criarPedido(@Body() pedido: Pedido): Pedido {
    return this.pedidosService.criarPedido(pedido);
  }

  @Get()
  listarPedidos(): Pedido[] {
    return this.pedidosService.listarPedidos();
  }
}
