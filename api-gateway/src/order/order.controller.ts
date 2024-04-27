import { Body, Controller, Post } from '@nestjs/common';
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
}
