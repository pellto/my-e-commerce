import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { SigninReqDto, SignupReqDto } from './dto/auth.req';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninResDto } from './dto/auth.res';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup({ name, email, phoneNumber, password, passwordConfirm }: SignupReqDto) {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Password and passwordConfirm do not match.');
    }

    const phoneUser = await this.userService.findOneByPhoneNumber(phoneNumber);
    if (phoneUser) {
      throw new ConflictException('Already Exist user with same phone number.');
    }

    const emailUser = await this.userService.findOneByEmail(email);
    if (emailUser) {
      throw new ConflictException('Already Exist user with same email.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ name, email, phoneNumber, password: hashedPassword });
  }

  async signin({ email, password }: SigninReqDto): Promise<SigninResDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('User is not exist.');
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw new UnauthorizedException('Password is not matched.');
    }

    const accessToken = this.jwtService.sign({ id: user.id });

    return { accessToken };
  }
}
