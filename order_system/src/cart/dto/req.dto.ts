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

export class RemoveProductReqDto {
  @IsInt()
  userId: number;

  @IsInt()
  itemId: number;
}

export class ChangeProductQuantityReqDto {
  @IsInt()
  userId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  itemId: number;
}

export class ChangeProductReqDto extends AddProductReqDto {
  @IsInt()
  itemId: number;
}

export class GetCartReqDto {
  @IsInt()
  userId: number;
}
