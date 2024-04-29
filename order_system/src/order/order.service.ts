import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateOrderReqDto } from './dto/req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { DataSource, Repository } from 'typeorm';
import { OrderState } from './enum/order.enum';
import { OrderProduct } from './entity/order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}

  async createOrder({ ordererId, products }: CreateOrderReqDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const code = this.generateOrderCode(16);
      const order = queryRunner.manager.create(Order, {
        ordererId,
        code,
        state: OrderState.CREATED,
      });
      await queryRunner.manager.insert(Order, order);

      for (const _product of products) {
        const product = queryRunner.manager.create(OrderProduct, {
          productId: _product.productId,
          productOptionCategoryId: _product.productOptionCategoryId,
          productOptionId: _product.productOptionId,
          quantity: _product.quantity,
          createdAt: order.createdAt,
          order: { id: order.id },
        });
        await queryRunner.manager.insert(OrderProduct, product);
      }

      await queryRunner.commitTransaction();
      return { message: 'success' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return { message: 'FAILED' };
    } finally {
      await queryRunner.release();
    }
  }

  async getOrder(id: number, userId: number) {
    const order = await this.orderRepository.findOne({ where: { id }, relations: { products: true } });
    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    if (order.ordererId !== userId) {
      throw new UnauthorizedException('Not authorized for this order.');
    }

    return order;
  }

  async getOrders(userId: number) {
    const orders = await this.orderRepository.find({ where: { ordererId: userId }, relations: { products: true } });
    return orders;
  }

  async getOrderByCode(code: string, userId: number) {
    const order = await this.orderRepository.findOne({ where: { code } });
    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    if (order.ordererId !== userId) {
      throw new UnauthorizedException('Not authorized for this order.');
    }

    return order;
  }

  async cancelOrder(id: number, userId: number) {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException('Order is not exist.');
    }

    if (order.ordererId !== userId) {
      throw new UnauthorizedException('Not authorized for this order.');
    }

    order.state = OrderState.CANCELED;
    await this.orderRepository.save(order);
    return 'SUCCESS';
  }

  private generateOrderCode(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
      if (i % 4 === 3 && i !== length - 1) {
        result += '-';
      }
    }

    return result;
  }
}
