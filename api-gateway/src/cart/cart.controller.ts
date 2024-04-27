import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { AddProductReqDto, ChangeProductQuantity } from './dto/req.dto';
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

  @Role(RoleName.NORMAL)
  @Delete('product/:productId')
  async removeProduct(@Param('productId', ParseIntPipe) itemId: number, @User() user: ValidatedUser) {
    return await this.cartService.removeProduct({ itemId, userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Patch('product/:productId/quantity')
  async changeProductQuantity(
    @Param('productId', ParseIntPipe) itemId: number,
    @Body() changeProductQuantityReqDto: ChangeProductQuantity,
    @User() user: ValidatedUser,
  ) {
    return await this.cartService.changeProductQuantity({ ...changeProductQuantityReqDto, itemId, userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Put('product/:productId')
  async changeProduct(
    @Param('productId', ParseIntPipe) itemId: number,
    @Body() changeProductReqDto: AddProductReqDto,
    @User() user: ValidatedUser,
  ) {
    await this.productService.checkExistOption({
      productId: changeProductReqDto.productId,
      optionCategoryId: changeProductReqDto.productOptionCategoryId,
      optionId: changeProductReqDto.productOptionId,
    });
    return await this.cartService.changeProduct({ ...changeProductReqDto, itemId, userId: +user.id });
  }

  @Role(RoleName.NORMAL)
  @Get()
  async getProduct(@User() user: ValidatedUser) {
    return await this.cartService.getCart({ userId: +user.id });
  }
}
