import { IsInt } from 'class-validator';

export class AddProductReqDto {
  @IsInt()
  userId: number;

  @IsInt()
  productId: number;

  @IsInt()
  productOptionCategoryId: number;

  @IsInt()
  productOptionId: number;

  @IsInt()
  quantity: number;
}
