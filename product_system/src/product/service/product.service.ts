import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { CreateProductDto } from '../dto/product.dto';
import { ProductInfo } from '../entity/product-info.entity';
import { ProductOptionCategory } from '../entity/product-option-category';
import { ProductOption } from '../entity/product-option';
import { ProductOptionState } from '../enum/product-option-state.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductInfo) private readonly productInfoRepository: Repository<ProductInfo>,
    @InjectRepository(ProductOptionCategory)
    private readonly productOptionCategoryRepository: Repository<ProductOptionCategory>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto.largeCategoryId) {
      throw new BadRequestException('Large Category is required.');
    }
    await this.categoryService.checkIsExistLargeById(createProductDto.largeCategoryId);
    await this.categoryService.checkIsExistMiddleById(createProductDto.middleCategoryId);
    await this.categoryService.checkIsExistSmallById(createProductDto.smallCategoryId);
    const product = this.productRepository.create({
      storeId: createProductDto.storeId,
      name: createProductDto.name,
      price: createProductDto.price,
      largeCategory: { id: createProductDto.largeCategoryId },
      middleCategory: { id: createProductDto.middleCategoryId ?? undefined },
      smallCategory: { id: createProductDto.smallCategoryId ?? undefined },
    });
    await this.productRepository.insert(product);
    const productInfo = this.productInfoRepository.create(createProductDto.info);
    await this.productInfoRepository.insert(productInfo);
    const productOptioncategories = await Promise.all(
      createProductDto.optionCategory.map(async (optionCategory) => {
        const productOptionCategory = this.productOptionCategoryRepository.create({ name: optionCategory.name });
        await this.productOptionCategoryRepository.insert(productOptionCategory);
        const options = await Promise.all(
          optionCategory.productOptions.map(async (productOption) => {
            const productOptionEntity = this.productOptionRepository.create({
              ...productOption,
              quantity: 0,
              state: ProductOptionState.REGISTER,
            });
            await this.productOptionRepository.insert(productOptionEntity);
            return productOptionEntity;
          }),
        );
        productOptionCategory.productOptions = options;
        return productOptionCategory;
      }),
    );
    product.info = productInfo;
    product.options = productOptioncategories;
    return product;
  }
}
