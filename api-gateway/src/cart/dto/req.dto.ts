import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddProductReqDto {
  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  productOptionCategoryId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  productOptionId: number;

  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  quantity: number;
}

export class RemoveProductReqDto {
  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  cartProductId: number;
}
