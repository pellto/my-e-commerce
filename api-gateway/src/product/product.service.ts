import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatedCategoryDto, GottenCategoryDto } from './dto/category.dto';
import { firstValueFrom } from 'rxjs';
import {
  CreateCategoryPayload,
  CreateProductPayload,
  UpdateOptionsPayload,
  UpdateProductInfoPayload,
  UpdateProductOptionPayload,
  UpdateProductPayload,
} from './dto/payload.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  async createProduct(payload: CreateProductPayload) {
    const pattern = { cmd: 'createProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async updateProductInfo(payload: UpdateProductInfoPayload) {
    const pattern = { cmd: 'updateProductInfo' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async updateProductOptionCategories(payload: UpdateOptionsPayload) {
    const pattern = { cmd: 'updateProductOptionCategories' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async updateProduct(payload: UpdateProductPayload) {
    const pattern = { cmd: 'updateProduct' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async updateProductOption(payload: UpdateProductOptionPayload) {
    const pattern = { cmd: 'updateProductOption' };
    const data = await firstValueFrom<any>(this.client.send<any>(pattern, payload));
    return data;
  }

  async createLargeCategory(createCategoryReq: CreateCategoryPayload) {
    const pattern = { cmd: 'createLargeCategory' };
    const payload = { name: createCategoryReq.name };
    const data = await firstValueFrom<CreatedCategoryDto>(this.client.send<CreatedCategoryDto>(pattern, payload));
    return data;
  }

  async createMiddleCategory(createCategoryReq: CreateCategoryPayload) {
    if (!createCategoryReq.parentId) {
      throw new BadRequestException('large category id is required.');
    }
    const pattern = { cmd: 'createMiddleCategory' };
    const payload = { name: createCategoryReq.name, parentId: createCategoryReq.parentId };
    const data = await firstValueFrom<CreatedCategoryDto>(this.client.send<CreatedCategoryDto>(pattern, payload));
    return data;
  }

  async createSmallCategory(createCategoryReq: CreateCategoryPayload) {
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

  async checkExistOption(payload: { productId: number; optionCategoryId: number; optionId: number }) {
    const pattern = { cmd: 'checkExistOption' };
    const isExist = await firstValueFrom<{ isExist: boolean }>(
      this.client.send<{ isExist: boolean }>(pattern, payload),
    );
    if (!isExist) throw new BadRequestException('Not exist product option.');
  }
}
