import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartProduct } from './entity/cart-product.entity';
import { AddProductReqDto } from './dto/req.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct) private readonly cartProductRepository: Repository<CartProduct>,
  ) {}

  async addProduct({ userId, productId, productOptionId, productOptionCategoryId, quantity }: AddProductReqDto) {
    let cart = await this.cartRepository.findOneBy({ userId });

    if (!cart) {
      cart = await this.createCart(userId);
    }

    const cartProduct = this.cartProductRepository.create({
      productId,
      productOptionCategoryId,
      productOptionId,
      quantity,
      cart: { id: cart.id },
    });
    await this.cartProductRepository.insert(cartProduct);
    return cartProduct;
  }

  async createCart(userId: number) {
    const cart = this.cartRepository.create({ userId });
    await this.cartRepository.insert(cart);
    return cart;
  }
}
