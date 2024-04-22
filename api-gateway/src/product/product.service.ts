import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryReqDto, CreateProductReqDto } from './dto/req.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedCategoryDto, GottenCategoryDto } from './dto/category.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createProduct(payload: CreateProductReqDto) {
    const pattern = { cmd: 'createProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async createLargeCategory(createCategoryReq: CreateCategoryReqDto) {
    const pattern = { cmd: 'createLargeCategory' };
    const payload = { name: createCategoryReq.name };
    const data = await firstValueFrom<CreatedCategoryDto>(this.client.send<CreatedCategoryDto>(pattern, payload));
    return data;
  }

  async createMiddleCategory(createCategoryReq: CreateCategoryReqDto) {
    if (!createCategoryReq.parentId) {
      throw new BadRequestException('large category id is required.');
    }
    const pattern = { cmd: 'createMiddleCategory' };
    const payload = { name: createCategoryReq.name, parentId: createCategoryReq.parentId };
    const data = await firstValueFrom<CreatedCategoryDto>(this.client.send<CreatedCategoryDto>(pattern, payload));
    return data;
  }

  async createSmallCategory(createCategoryReq: CreateCategoryReqDto) {
    if (!createCategoryReq.parentId) {
      throw new BadRequestException('middle category id is required.');
    }
    const pattern = { cmd: 'createSmallCategory' };
    const payload = { name: createCategoryReq.name, parentId: createCategoryReq.parentId };
    const data = await firstValueFrom<CreatedCategoryDto>(this.client.send<CreatedCategoryDto>(pattern, payload));
    return data;
  }

  async getLargeCategories() {
    const pattern = { cmd: 'getLargeCategories' };
    const data = await firstValueFrom<GottenCategoryDto[]>(this.client.send<GottenCategoryDto[]>(pattern, {}));
    return data;
  }

  async getMiddleCategories(parentId: number) {
    const pattern = { cmd: 'getMiddleCategories' };
    const payload = Number.isNaN(parentId) ? {} : { parentId };
    const data = await firstValueFrom<GottenCategoryDto[]>(this.client.send<GottenCategoryDto[]>(pattern, payload));
    return data;
  }

  async getSmallCategories(parentId: number) {
    const pattern = { cmd: 'getSmallCategories' };
    const payload = Number.isNaN(parentId) ? {} : { parentId };
    const data = await firstValueFrom<GottenCategoryDto[]>(this.client.send<GottenCategoryDto[]>(pattern, payload));
    return data;
  }
}
