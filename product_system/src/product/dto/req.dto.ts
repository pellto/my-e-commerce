import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProductInfoReqDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductOptionReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  price: number;
}

export class CreateProductOptionCategoryReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionReqDto)
  productOptions: CreateProductOptionReqDto[];
}

export class CreateProductReqDto {
  @IsInt()
  storeId: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  price: number;
  @IsInt()
  largeCategoryId: number;
  @IsOptional()
  @IsInt()
  middleCategoryId?: number;
  @IsOptional()
  @IsInt()
  smallCategoryId?: number;
  @ValidateNested()
  @Type(() => CreateProductInfoReqDto)
  info: CreateProductInfoReqDto;
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionCategoryReqDto)
  optionCategory: CreateProductOptionCategoryReqDto[];
}
