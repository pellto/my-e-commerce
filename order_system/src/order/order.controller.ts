import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderReqDto } from './dto/req.dto';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(createOrderReqDto: CreateOrderReqDto) {
    return await this.orderService.createOrder(createOrderReqDto);
  }
}
