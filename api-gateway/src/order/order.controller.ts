import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { User, ValidatedUser } from 'src/common/decorator/user.decorator';
import { CreateOrderReqDto } from './dto/req.dto';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Role(RoleName.NORMAL)
  @Post()
  async create(@Body() createOrderReq: CreateOrderReqDto, @User() user: ValidatedUser) {
    return await this.orderService.create({ ...createOrderReq, ordererId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Get()
  async getOrders(@User() user: ValidatedUser) {
    return await this.orderService.getOrders({ userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Get('code/:code')
  async getOrderByCode(@Param('code') code: string, @User() user: ValidatedUser) {
    return await this.orderService.getOrderByCode({ code, userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Get(':id')
  async getOrder(@Param('id') id: number, @User() user: ValidatedUser) {
    return await this.orderService.getOrder({ id, userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Patch(':id/cancel')
  async cancelOrder(@Param('id') id: number, @User() user: ValidatedUser) {
    return await this.orderService.cancelOrder({ id, userId: +user.id });
  }
}
