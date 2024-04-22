import { Controller } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateProductReqDto } from './dto/req.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'createProduct' })
  async createProduct(createProductReq: CreateProductReqDto) {
    return await this.productService.create(createProductReq);
  }
}
