import { Body, Controller, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninReqDto, SignupReqDto } from './dto/auth.req';
import { Public } from 'src/common/decorator/public.decorator';
import { ApiPostResponse } from 'src/common/decorator/swagger.decorator';
import { SigninResDto, SignupResDto } from './dto/auth.res';

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

  @ApiPostResponse(SigninResDto)
  @Public()
  @Post('signin')
  async signin(@Body() signinReqDto: SigninReqDto): Promise<SigninResDto> {
    const { accessToken } = await this.authService.signin(signinReqDto);
    return { accessToken };
  }
}
