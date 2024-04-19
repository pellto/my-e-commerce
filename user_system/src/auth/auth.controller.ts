import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninReqDto, SignupReqDto } from './dto/auth.req';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { SigninResDto, SignupResDto } from './dto/auth.res';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/role/role.constant';
import { Request } from 'express';
import { Payload } from './dto/auth.dto';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
