import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

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
