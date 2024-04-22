import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LargeCategory } from './entity/large-category.entity';
import { MiddleCategory } from './entity/middle-category.entity';
import { SmallCategory } from './entity/small-category.entity';
import { CreateCategoryDto, GetCategoiesPayloadDto } from './dto/category.dto';
import { CreateCategoryReqDto } from './dto/req.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(LargeCategory) private readonly largeCategoryRepository: Repository<LargeCategory>,
    @InjectRepository(MiddleCategory) private readonly middleCategoryRepository: Repository<MiddleCategory>,
    @InjectRepository(SmallCategory) private readonly smallCategoryRepository: Repository<SmallCategory>,
  ) {}

  async createLargeCategory(createCategoryDto: CreateCategoryDto) {
    const largeCategory = this.largeCategoryRepository.create({ name: createCategoryDto.name });
    await this.largeCategoryRepository.insert(largeCategory);
    return largeCategory;
  }

  async createMiddleCategory(createCategoryDto: CreateCategoryDto) {
    const middleCategory = this.middleCategoryRepository.create({
      name: createCategoryDto.name,
      largeCategory: { id: createCategoryDto.parentId },
    });
    await this.middleCategoryRepository.insert(middleCategory);
    return middleCategory;
  }

  async createSmallCategory(createCategoryDto: CreateCategoryDto) {
    const smallCategory = this.smallCategoryRepository.create({
      name: createCategoryDto.name,
      middleCategory: { id: createCategoryDto.parentId },
    });
    await this.smallCategoryRepository.insert(smallCategory);
    return smallCategory;
  }

  async getLargeCategories() {
    const entities = await this.largeCategoryRepository.find({});
    return entities.map((entity) => ({ id: entity.id, name: entity.name }));
  }

  async getMiddleCategories({ parentId }: GetCategoiesPayloadDto) {
    const entities = await this.middleCategoryRepository.findBy({ largeCategory: { id: parentId } });
    return entities.map((entity) => ({ id: entity.id, name: entity.name }));
  }

  async getSmallCategories({ parentId }: CreateCategoryReqDto) {
    const entities = await this.smallCategoryRepository.findBy({ middleCategory: { id: parentId } });
    return entities.map((entity) => ({ id: entity.id, name: entity.name }));
  }
}
