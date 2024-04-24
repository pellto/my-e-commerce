import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entity/product.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { CategoryService } from 'src/category/category.service';
import { CreateProductDto } from '../dto/product.dto';
import { ProductInfo } from '../entity/product-info.entity';
import { ProductOptionCategory } from '../entity/product-option-category';
import { ProductOption } from '../entity/product-option';
import { ProductOptionState } from '../enum/product-option-state.enum';
import { UpdateOptionsReqDto, UpdateProductInfoReqDto, UpdateProductReqDto } from '../dto/req.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto) {
    if (!createProductDto.largeCategoryId) {
      throw new BadRequestException('Large Category is required.');
    }

    // 카테고리 체크
    const checkCategoryList = await Promise.allSettled([
      this.categoryService.checkIsExistLargeById(createProductDto.largeCategoryId),
      this.categoryService.checkIsExistMiddleById(createProductDto.middleCategoryId),
      this.categoryService.checkIsExistSmallById(createProductDto.smallCategoryId),
    ]);
    if (checkCategoryList.filter((result) => result.status === 'rejected').length >= 1) {
      throw new NotFoundException('Category is not found.');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');
    try {
      // 상품 생성
      const product = queryRunner.manager.create(Product, {
        storeId: createProductDto.storeId,
        name: createProductDto.name,
        price: createProductDto.price,
        largeCategory: { id: createProductDto.largeCategoryId },
        middleCategory: { id: createProductDto.middleCategoryId },
        smallCategory: { id: createProductDto.smallCategoryId },
      });
      await queryRunner.manager.insert(Product, product);

      // 상품 정보 생성
      const productInfo = queryRunner.manager.create(ProductInfo, {
        ...createProductDto.info,
        productId: product.id,
      });
      await queryRunner.manager.insert(ProductInfo, productInfo);

      // 상품 옵션 카테고리 생성
      for (const optionCategory of createProductDto.optionCategory) {
        const createdOptionCategory = queryRunner.manager.create(ProductOptionCategory, {
          name: optionCategory.name,
          productId: product.id,
        });
        await queryRunner.manager.insert(ProductOptionCategory, createdOptionCategory);

        // 상품 옵션 생성
        for (const option of optionCategory.productOptions) {
          const createdOption = queryRunner.manager.create(ProductOption, {
            ...option,
            quantity: 0,
            state: ProductOptionState.REGISTER,
            optionCategoryId: { id: createdOptionCategory.id },
          });
          await queryRunner.manager.insert(ProductOption, createdOption);
        }
      }

      await queryRunner.commitTransaction();
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateProduct({ id, name, price }: UpdateProductReqDto) {
    if (!name && !price) {
      throw new BadRequestException('Either A or B is required.');
    }

    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product is not found.');
    }

    product.changeProductNameOrPrice(name, price);
    await this.productRepository.save(product);
    return 'SUCCESS';
  }

  async updateProductOptions(updateProductOptionsReq: UpdateOptionsReqDto) {
    const product = await this.productRepository.findOne({
      where: { id: updateProductOptionsReq.productId },
      relations: { options: { productOptions: true } },
    });
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softRemove(ProductOptionCategory, product.options);
      // 상품 옵션 카테고리 생성
      for (const optionCategory of updateProductOptionsReq.optionCategories) {
        const createdOptionCategory = queryRunner.manager.create(ProductOptionCategory, {
          name: optionCategory.name,
          productId: product.id,
        });
        await queryRunner.manager.insert(ProductOptionCategory, createdOptionCategory);

        // 상품 옵션 생성
        for (const option of optionCategory.productOptions) {
          const createdOption = queryRunner.manager.create(ProductOption, {
            ...option,
            quantity: 0,
            state: ProductOptionState.REGISTER,
            optionCategoryId: { id: createdOptionCategory.id },
          });
          await queryRunner.manager.insert(ProductOption, createdOption);
        }
      }

      await queryRunner.commitTransaction();
      return 'SUCCESS';
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateProductInfo(updateProductInfoReq: UpdateProductInfoReqDto) {
    const product = await this.productRepository.findOne({
      where: { id: updateProductInfoReq.productId },
      relations: { info: true },
    });
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(ProductInfo, {
        productId: product.id,
        deletedAt: IsNull(),
      });

      const info = queryRunner.manager.create(ProductInfo, {
        description: updateProductInfoReq.description,
        productId: product.id,
      });
      await queryRunner.manager.insert(ProductInfo, info);

      await queryRunner.commitTransaction();
      return 'SUCCESS';
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
