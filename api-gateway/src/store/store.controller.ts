import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { CreateStoreReqDto } from './dto/req.dto';
import { User, ValidatedUser } from 'src/common/decorator/user.decorator';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Post()
  async create(@Body() createStoreReqDto: CreateStoreReqDto, @User() user: ValidatedUser) {
    return await this.storeService.create({ ownerId: +user.id, ...createStoreReqDto });
  }
}
