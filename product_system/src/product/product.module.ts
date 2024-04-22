import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './service/product.service';
import { ProductController } from './product.controller';
import { Product } from './entity/product.entity';
import { CategoryModule } from 'src/category/category.module';
import { ProductInfo } from './entity/product-info.entity';
import { ProductOptionCategory } from './entity/product-option-category';
import { ProductOption } from './entity/product-option';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductInfo, ProductOptionCategory, ProductOption]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
