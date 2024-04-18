import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { PageResDto } from 'src/common/dto/res.dto';
import { ApiGetItemsResponse, ApiGetResponse } from 'src/common/decorator/swagger.decorator';
import { FindUserResDto } from './dto/user.res';
import { PageReqDto } from 'src/common/dto/req.dto';

@ApiTags('User')
@ApiExtraModels(PageResDto, FindUserResDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiGetItemsResponse(FindUserResDto)
  @Get()
  async findAll(@Query() { page, size }: PageReqDto): Promise<FindUserResDto[]> {
    return this.userService.findAll(page, size);
  }

  @ApiBearerAuth()
  @ApiGetResponse(FindUserResDto)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOneById(id);
  }
}
