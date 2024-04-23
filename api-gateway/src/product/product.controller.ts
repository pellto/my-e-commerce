import {
  BadRequestException,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { CreateCategoryReqDto, CreateProductReqDto } from './dto/req.dto';
import { CategoryLevel } from './enum/category-level.enum';
import { Public } from 'src/common/decorator/public.decorator';
import { StoreService } from 'src/store/store.service';
import { User, ValidatedUser } from 'src/common/decorator/user.decorator';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Post()
  async createProduct(@Body() createProductReqDto: CreateProductReqDto, @User() user: ValidatedUser) {
    const isStoreUser = await this.storeService.checkIsStoreUser(createProductReqDto.storeId, +user.id);
    if (!isStoreUser) {
      throw new UnauthorizedException('The user does not have permission to the store.');
    }
    return await this.productService.createProduct(createProductReqDto);
  }

  @ApiBearerAuth()
  @Role(RoleName.ADMIN)
  @Post('categories')
  async createCategory(@Body() createCategoryReq: CreateCategoryReqDto) {
    if (createCategoryReq.targetCategoryLevel === CategoryLevel.LARGE) {
      return await this.productService.createLargeCategory(createCategoryReq);
    }
    if (createCategoryReq.targetCategoryLevel === CategoryLevel.MIDDLE) {
      return await this.productService.createMiddleCategory(createCategoryReq);
    }
    if (createCategoryReq.targetCategoryLevel === CategoryLevel.SMALL) {
      return await this.productService.createSmallCategory(createCategoryReq);
    }
    throw new BadRequestException('Unsupported Category Level');
  }

  @Public()
  @Get('categories/large')
  async getLargeCategories() {
    return await this.productService.getLargeCategories();
  }

  @Public()
  @ApiQuery({ name: 'parentCategoryId', required: false })
  @Get('categories/middle')
  async getMiddleCategories(@Query('parentCategoryId') parentCategoryId?: number) {
    return await this.productService.getMiddleCategories(+parentCategoryId);
  }

  @Public()
  @ApiQuery({ name: 'parentCategoryId', required: false })
  @Get('categories/small')
  async getSmallCategories(@Query('parentCategoryId') parentCategoryId?: number) {
    return await this.productService.getSmallCategories(+parentCategoryId);
  }
}
