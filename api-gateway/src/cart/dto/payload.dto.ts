import { IsInt } from 'class-validator';

export class AddProductPayload {
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

export class RemoveProductPayload {
  @IsInt()
  itemId: number;

  @IsInt()
  userId: number;
}

export class ChangeCartProductQuantityPayload {
  @IsInt()
  userId: number;
  @IsInt()
  quantity: number;
  @IsInt()
  itemId: number;
}

export class ChangeCartProductPayload extends AddProductPayload {
  @IsInt()
  itemId: number;
}

export class GetCartPayload {
  @IsInt()
  userId: number;
}
