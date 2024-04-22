import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LargeCategory } from './entity/large-category.entity';
import { MiddleCategory } from './entity/middle-category.entity';
import { SmallCategory } from './entity/small-category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LargeCategory, MiddleCategory, SmallCategory])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
