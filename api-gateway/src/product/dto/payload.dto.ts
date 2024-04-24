import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateProductInfoPayload {
  @IsInt()
  productId: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateProductOptionPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;
}

export class UpdateProductOptionCategoryPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => UpdateProductOptionPayload)
  productOptions: UpdateProductOptionPayload[];
}

export class UpdateOptionsPayload {
  @IsInt()
  productId: number;

  @ValidateNested({ each: true })
  @Type(() => UpdateProductOptionCategoryPayload)
  optionCategories: UpdateProductOptionCategoryPayload[];
}

export class UpdateProductPayload {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  price?: number;
}

export class CreateCategoryPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsInt()
  parentId?: number;
}

export class CreateProductInfoPayload {
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductOptionPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;
}

export class CreateProductOptionCategoryPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionPayload)
  productOptions: CreateProductOptionPayload[];
}

export class CreateProductPayload {
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
  @Type(() => CreateProductInfoPayload)
  info: CreateProductInfoPayload;

  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionCategoryPayload)
  optionCategory: CreateProductOptionCategoryPayload[];
}
