import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

const pedidos: any[] = [];

@Controller()
export class AppController {// Define o controlador para a rota raiz
  @Get()
  getHello(): string {
    return 'API de E-commerce ativa!';// Retorna uma mensagem simples quando a rota raiz é acessada
  }

  @Post('pedidos')
  createPedido(@Body() pedido: any) {
    pedidos.push({
      ...pedido,
      id: pedidos.length + 1,
      data: new Date().toISOString()
    });
    return { mensagem: 'Pedido recebido com sucesso!', id: pedidos.length };
  }

  @Get('pedidos')
  listarPedidos() {
    return pedidos;
  }
}