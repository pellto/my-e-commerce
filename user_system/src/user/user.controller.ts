import { Controller } from '@nestjs/common';
import { UserService } from './service/user.service';
import { FindUserResDto } from './dto/user.res';
import { PageReqDto } from 'src/common/dto/req.dto';
import { MessagePattern } from '@nestjs/microservices';
import {
  ChangeLoginStatusPayloadDto,
  CheckAlreadyExistPayloadDto,
  FindEmailPayloadDto,
  UserCreateDto,
  ValidateUserPayloadDto,
} from './dto/user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'findAll' })
  async findAll({ page, size }: PageReqDto): Promise<FindUserResDto[]> {
    return this.userService.findAll(page, size);
  }

  @MessagePattern({ cmd: 'findOneById' })
  async findOneById(id: number) {
    return await this.userService.findOneById(id);
  }

  @MessagePattern({ cmd: 'findOneByEmail' })
  async findOneByEmail(email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @MessagePattern({ cmd: 'create' })
  async create(payload: UserCreateDto) {
    return await this.userService.create(payload);
  }

  @MessagePattern({ cmd: 'validate' })
  async validate(payload: ValidateUserPayloadDto) {
    return await this.userService.validate(payload);
  }

  @MessagePattern({ cmd: 'checkAlreadyExist' })
  async checkAlreadyExist(payload: CheckAlreadyExistPayloadDto) {
    return await this.userService.checkAlreadyExist(payload);
  }

  @MessagePattern({ cmd: 'changeLoginStatus' })
  async changeLoginStatus(payload: ChangeLoginStatusPayloadDto) {
    return await this.userService.changeLoginStatus(payload);
  }

  @MessagePattern({ cmd: 'findOneByEmailForAuth' })
  async findOneByEmailForAuth(payload: FindEmailPayloadDto) {
    return await this.userService.findOneByEmailForAuth(payload);
  }
}
