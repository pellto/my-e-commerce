import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CancelOrderReqDto,
  CreateOrderReqDto,
  GetOrderByCodeReqDto,
  GetOrderReqDto,
  GetOrdersReqDto,
} from './dto/req.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(createOrderReqDto: CreateOrderReqDto) {
    return await this.orderService.createOrder(createOrderReqDto);
  }

  @MessagePattern({ cmd: 'getOrder' })
  async getOrder({ id, userId }: GetOrderReqDto) {
    return await this.orderService.getOrder(id, userId);
  }

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders({ userId }: GetOrdersReqDto) {
    return await this.orderService.getOrders(userId);
  }

  @MessagePattern({ cmd: 'getOrderByCode' })
  async getOrderByCode({ userId, code }: GetOrderByCodeReqDto) {
    return await this.orderService.getOrderByCode(code, userId);
  }

  @MessagePattern({ cmd: 'cancelOrder' })
  async cancelOrder({ id, userId }: CancelOrderReqDto) {
    return await this.orderService.cancelOrder(id, userId);
  }
}
