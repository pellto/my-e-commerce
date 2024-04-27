import { Controller } from '@nestjs/common';
import { CartService } from './cart.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  AddProductReqDto,
  ChangeProductQuantityReqDto,
  ChangeProductReqDto,
  GetCartReqDto,
  RemoveProductReqDto,
} from './dto/req.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'addProduct' })
  async addProduct(addProductReqDto: AddProductReqDto) {
    return await this.cartService.addProduct(addProductReqDto);
  }

  @MessagePattern({ cmd: 'removeProduct' })
  async removeProduct(removeProductReqDto: RemoveProductReqDto) {
    return await this.cartService.removeProduct(removeProductReqDto);
  }

  @MessagePattern({ cmd: 'changeProductQuantity' })
  async changeProductQuantity(changeProductQuantityReqDto: ChangeProductQuantityReqDto) {
    return await this.cartService.changeProductQuantity(changeProductQuantityReqDto);
  }

  @MessagePattern({ cmd: 'changeProduct' })
  async changeProduct(changeProductReqDto: ChangeProductReqDto) {
    return await this.cartService.changeProduct(changeProductReqDto);
  }

  @MessagePattern({ cmd: 'getCart' })
  async getCart(getCartReqDto: GetCartReqDto) {
    return await this.cartService.getCart(getCartReqDto);
  }
}
