import { Controller } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateProductReqDto,
  UpdateOptionsReqDto,
  UpdateProductInfoReqDto,
  UpdateProductOptionReqDto,
  UpdateProductReqDto,
} from './dto/req.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'createProduct' })
  async createProduct(createProductReq: CreateProductReqDto) {
    return await this.productService.create(createProductReq);
  }

  @MessagePattern({ cmd: 'updateProductInfo' })
  async updateProductInfo(updateProductInfoReq: UpdateProductInfoReqDto) {
    return await this.productService.updateProductInfo(updateProductInfoReq);
  }

  @MessagePattern({ cmd: 'updateProductOptionCategories' })
  async updateProductOptionCategories(updateProductOptionsReq: UpdateOptionsReqDto) {
    return await this.productService.updateProductOptionCategories(updateProductOptionsReq);
  }

  @MessagePattern({ cmd: 'updateProduct' })
  async updateProduct(updateProductReq: UpdateProductReqDto) {
    return await this.productService.updateProduct(updateProductReq);
  }

  @MessagePattern({ cmd: 'updateProductOption' })
  async updateProductOption(updateProductOptionReq: UpdateProductOptionReqDto) {
    return await this.productService.updateProductOption(updateProductOptionReq);
  }
}
