import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryReqDto } from './dto/req.dto';
import { GetCategoiesPayloadDto } from './dto/category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'createLargeCategory' })
  async createLarge(createCategoryReq: CreateCategoryReqDto) {
    return await this.categoryService.createLargeCategory(createCategoryReq);
  }

  @MessagePattern({ cmd: 'createMiddleCategory' })
  async createMiddle(createCategoryReq: CreateCategoryReqDto) {
    return await this.categoryService.createMiddleCategory(createCategoryReq);
  }

  @MessagePattern({ cmd: 'createSmallCategory' })
  async createSmall(createCategoryReq: CreateCategoryReqDto) {
    return await this.categoryService.createSmallCategory(createCategoryReq);
  }

  @MessagePattern({ cmd: 'getLargeCategories' })
  async getLargeCategories() {
    return await this.categoryService.getLargeCategories();
  }

  @MessagePattern({ cmd: 'getMiddleCategories' })
  async getMiddleCategories(getCategoriesPayloadDto: GetCategoiesPayloadDto) {
    return await this.categoryService.getMiddleCategories(getCategoriesPayloadDto);
  }

  @MessagePattern({ cmd: 'getSmallCategories' })
  async getSmallCategories(getCategoriesPayloadDto: CreateCategoryReqDto) {
    return await this.categoryService.getSmallCategories(getCategoriesPayloadDto);
  }
}
