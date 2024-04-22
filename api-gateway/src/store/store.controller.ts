import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { ChangeOwnerReqDto, CreateStoreManagerReqDto, CreateStoreReqDto } from './dto/req.dto';
import { User, ValidatedUser } from 'src/common/decorator/user.decorator';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';

@ApiTags('Store')
@Controller('stores')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly userService: UserService,
  ) {}

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Post()
  async create(@Body() createStoreReqDto: CreateStoreReqDto, @User() user: ValidatedUser) {
    return await this.storeService.create({ ownerId: +user.id, ...createStoreReqDto });
  }

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Post('manager')
  async createManager(@Body() createStoreManagerReqDto: CreateStoreManagerReqDto, @User() user: ValidatedUser) {
    await this.userService.checkIsSeller({ id: createStoreManagerReqDto.targetSellerId });
    return await this.storeService.createStoreManager({ requesterId: +user.id, ...createStoreManagerReqDto });
  }

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Patch('owner')
  async changeOwner(@Body() changeOwnerReqDto: ChangeOwnerReqDto, @User() user: ValidatedUser) {
    await this.userService.checkIsSeller({ id: changeOwnerReqDto.targetSellerId });
    return await this.storeService.changeOwner({ requesterId: +user.id, ...changeOwnerReqDto });
  }

  @ApiBearerAuth()
  @Role(RoleName.SELLER)
  @Delete(':id')
  async delete(@Param('id') id: string, @User() user: ValidatedUser) {
    return await this.storeService.delete({ id: +id, requesterId: +user.id });
  }
}
