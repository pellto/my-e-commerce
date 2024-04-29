import { Type } from 'class-transformer';
import { IsInt, Matches, ValidateNested } from 'class-validator';

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

export class CreateOrderReqDto {
  @IsInt()
  ordererId: number;

  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}

export class GetOrderReqDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;
}

export class GetOrdersReqDto {
  @IsInt()
  userId: number;
}

export class GetOrderByCodeReqDto {
  @Matches(/^[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}[-]+[a-zA-Z0-9]{4}$/)
  code: string;

  @IsInt()
  userId: number;
}

export class CancelOrderReqDto {
  @IsInt()
  id: number;

  @IsInt()
  userId: number;
}
