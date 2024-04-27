import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderPayload, OrderProductDto } from './dto/payload.dto';
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
