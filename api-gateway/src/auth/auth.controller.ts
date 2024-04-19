import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { SigninResDto, SignupResDto } from './dto/res.dto';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/user/enum/user.enum';
import { Payload } from './dto/auth.dto';
import { Request } from 'express';

@ApiTags('Auth')
@ApiExtraModels(SignupResDto, SigninResDto)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPostResponse(SignupResDto)
  @Public()
  @Post('signup')
  async signup(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {
    const { id } = await this.authService.signup(signupReqDto);
    return { id };
  }

  @ApiPostResponse(SignupResDto)
  @ApiBearerAuth()
  @Role(RoleName.ADMIN)
  @Post('admin/signup')
  async createAdmin(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {
    const { id } = await this.authService.createAdmin(signupReqDto);
    return { id };
  }

  @ApiPostResponse(SigninResDto)
  @Public()
  @Post('signin')
  async signin(@Body() signinReqDto: SigninReqDto): Promise<SigninResDto> {
    const { accessToken } = await this.authService.signin(signinReqDto);
    return { accessToken };
  }

  @ApiBearerAuth()
  @Post('signout')
  async signout(@Req() req: Request): Promise<void> {
    const payload = req.user as Payload;
    await this.authService.signout(payload.id);
  }
}
