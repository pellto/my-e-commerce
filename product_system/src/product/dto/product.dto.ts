export class CreateProductInfoDto {
  description: string;
}

export class CreateProductOptionDto {
  name: string;
  price: number;
}

export class CreateProductOptionCategoryDto {
  name: string;
  productOptions: CreateProductOptionDto[];
}

export class CreateProductDto {
  storeId: number;
  name: string;
  price: number;
  largeCategoryId: number;
  middleCategoryId?: number;
  smallCategoryId?: number;
  info: CreateProductInfoDto;
  optionCategory: CreateProductOptionCategoryDto[];
}
