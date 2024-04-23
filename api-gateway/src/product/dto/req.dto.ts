import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from 'class-validator';
import { CategoryLevel } from '../enum/category-level.enum';

export class CreateCategoryReqDto {
  @ApiProperty({ required: true, example: '의류' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: '1' })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  parentId: number;

  @ApiProperty({ required: true, example: 'large' })
  @Matches(
    `^${Object.values(CategoryLevel)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  targetCategoryLevel: CategoryLevel;
}

export class CreateProductInfoReqDto {
  @ApiProperty({ required: true, example: 'product description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductOptionReqDto {
  @ApiProperty({ required: true, example: 'productOption1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 100 })
  @IsInt()
  price: number;
}

export class CreateProductOptionCategoryReqDto {
  @ApiProperty({ required: true, example: 'productOptionCategory1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    isArray: true,
    type: CreateProductOptionReqDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionReqDto)
  productOptions: CreateProductOptionReqDto[];
}

export class CreateProductReqDto {
  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  storeId: number;

  @ApiProperty({ required: true, example: 'product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: 30_000 })
  @IsInt()
  price: number;

  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  largeCategoryId: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  middleCategoryId?: number;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  smallCategoryId?: number;

  @ApiProperty({ required: true, example: { description: 'product description 123' } })
  @ValidateNested()
  @Type(() => CreateProductInfoReqDto)
  info: CreateProductInfoReqDto;

  @ApiProperty({
    required: true,
    isArray: true,
    type: CreateProductOptionCategoryReqDto,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionCategoryReqDto)
  optionCategory: CreateProductOptionCategoryReqDto[];
}
