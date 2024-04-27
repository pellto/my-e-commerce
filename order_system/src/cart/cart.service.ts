import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartProduct } from './entity/cart-product.entity';
import {
  AddProductReqDto,
  ChangeProductQuantityReqDto,
  ChangeProductReqDto,
  GetCartReqDto,
  RemoveProductReqDto,
} from './dto/req.dto';
import { Cart } from './entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct) private readonly cartProductRepository: Repository<CartProduct>,
    private readonly dataSource: DataSource,
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

  async removeProduct({ userId, itemId }: RemoveProductReqDto) {
    const cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      throw new BadRequestException('User does not have cart.');
    }

    const product = await this.cartProductRepository.findOne({ where: { id: itemId } });
    if (!product) {
      throw new BadRequestException('Cart does not have item.');
    }

    await this.cartProductRepository.softRemove(product);
    return 'SUCCESS';
  }

  async changeProductQuantity({ userId, itemId, quantity }: ChangeProductQuantityReqDto) {
    const cart = await this.cartRepository.findOne({ where: { userId } });
    if (!cart) {
      throw new BadRequestException('User does not have cart.');
    }

    const product = await this.cartProductRepository.findOne({ where: { id: itemId } });
    if (!product) {
      throw new BadRequestException('Cart does not have item.');
    }

    product.quantity = quantity;
    await this.cartProductRepository.save(product, { reload: false });
    return 'SUCCESS';
  }

  async changeProduct(changeProductReqDto: ChangeProductReqDto) {
    const cart = await this.cartRepository.findOne({ where: { userId: changeProductReqDto.userId } });
    if (!cart) {
      throw new BadRequestException('User does not have cart.');
    }

    const product = await this.cartProductRepository.findOne({ where: { id: changeProductReqDto.itemId } });
    if (!product) {
      throw new BadRequestException('Cart does not have item.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softRemove(CartProduct, product);
      const newProduct = queryRunner.manager.create(CartProduct, {
        productId: changeProductReqDto.productId,
        productOptionCategoryId: changeProductReqDto.productOptionCategoryId,
        productOptionId: changeProductReqDto.productOptionId,
        quantity: changeProductReqDto.quantity,
        cart: { id: cart.id },
      });
      await queryRunner.manager.insert(CartProduct, newProduct);

      await queryRunner.commitTransaction();
      return { message: 'SUCCESS', data: { id: newProduct.id } };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { message: 'FALIED' };
    } finally {
      await queryRunner.release();
    }
  }

  async getCart({ userId }: GetCartReqDto) {
    const cart = await this.cartRepository.findOne({ where: { userId }, relations: { products: true } });
    return { message: 'SUCCESS', data: cart };
  }
}
