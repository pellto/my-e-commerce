import { Controller, Get, Param, Query } from '@nestjs/common';
import { PageResDto } from 'src/common/dto/res.dto';
import { FindUserResDto } from './dto/res.dto';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from './enum/user.enum';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('User')
@ApiExtraModels(PageResDto, FindUserResDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @Role(RoleName.ADMIN)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto) {
    return this.userService.findAll(page, size);
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const temp = await this.userService.findOneById(id);
    return temp;
  }
}
