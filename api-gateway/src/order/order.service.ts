import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CancelOrderPayload,
  CreateOrderPayload,
  GetOrderByCodePayload,
  GetOrderPayload,
  GetOrdersPayload,
  OrderProductDto,
} from './dto/payload.dto';
import { ProductService } from 'src/product/product.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private client: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  async create(payload: CreateOrderPayload) {
    await this.checkOrderProductCategories(payload.products);

    const pattern = { cmd: 'createOrder' };
    const data = await firstValueFrom<any[]>(this.client.send<any[]>(pattern, payload));
    return data;
  }

  async getOrder(payload: GetOrderPayload) {
    const pattern = { cmd: 'getOrder' };
    const data = await firstValueFrom<any[]>(this.client.send<any[]>(pattern, payload));
    return data;
  }

  async getOrders(payload: GetOrdersPayload) {
    const pattern = { cmd: 'getOrders' };
    const data = await firstValueFrom<any[]>(this.client.send<any[]>(pattern, payload));
    return data;
  }

  async getOrderByCode(payload: GetOrderByCodePayload) {
    const pattern = { cmd: 'getOrderByCode' };
    const data = await firstValueFrom<any[]>(this.client.send<any[]>(pattern, payload));
    return data;
  }

  async cancelOrder(payload: CancelOrderPayload) {
    const pattern = { cmd: 'cancelOrder' };
    const data = await firstValueFrom<any[]>(this.client.send<any[]>(pattern, payload));
    return data;
  }

  async checkOrderProductCategories(products: OrderProductDto[]) {
    const checkList = products.map((product) =>
      this.productService.checkExistOption({
        productId: product.productId,
        optionCategoryId: product.productOptionCategoryId,
        optionId: product.productOptionId,
      }),
    );

    const result = await Promise.allSettled(checkList);
    if (result.filter((res) => res.status === 'rejected').length > 0) {
      throw new BadRequestException('Not exist product option.');
    }
  }
}
