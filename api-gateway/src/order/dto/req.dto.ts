import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';

export class CreateOrderProductDto {
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

export class CreateOrderReqDto {
  @ApiProperty({
    required: true,
    isArray: true,
    type: CreateOrderProductDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  products: CreateOrderProductDto[];
}
