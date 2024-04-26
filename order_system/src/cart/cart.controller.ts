import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern } from '@nestjs/microservices';
import { AddProductReqDto } from './dto/req.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'addProduct' })
  async addProduct(addProductReqDto: AddProductReqDto) {
    return await this.cartService.addProduct(addProductReqDto);
  }
}
