import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { AddProductReqDto } from './dto/req.dto';
import { User, ValidatedUser } from 'src/common/decorator/user.decorator';
import { ProductService } from 'src/product/product.service';

@ApiTags('Cart')
@ApiBearerAuth()
@Controller('carts')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Role(RoleName.NORMAL)
  @Post('product')
  async addProduct(@Body() addProduct: AddProductReqDto, @User() user: ValidatedUser) {
    await this.productService.checkExistOption({
      productId: addProduct.productId,
      optionCategoryId: addProduct.productOptionCategoryId,
      optionId: addProduct.productOptionId,
    });
    return await this.cartService.addProduct({ ...addProduct, userId: +user.id });
  }
}
