import { Type } from 'class-transformer';
import { IsArray, IsInt } from 'class-validator';

export class OrderProductDto {
  @IsInt()
  productId: number;
  @IsInt()
  productOptionCategoryId: number;
  @IsInt()
  productOptionId: number;
  @IsInt()
  quantity: number;
}

export class CreateOrderPayload {
  @IsInt()
  ordererId: number;

  @IsArray({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
