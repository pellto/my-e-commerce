import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Matches } from 'class-validator';

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

export class GetOrderPayload {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;
}

export class GetOrderByCodePayload {
  @Matches(/^[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}$/)
  code: string;

  @IsInt()
  userId: number;
}

export class GetOrdersPayload {
  @IsInt()
  userId: number;
}

export class CancelOrderPayload {
  @IsInt()
  id: number;
  @IsInt()
  userId: number;
}
