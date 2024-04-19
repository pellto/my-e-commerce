import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { SigninReqDto, SignupReqDto } from './dto/auth.req';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninResDto } from './dto/auth.res';
import { Payload } from './dto/auth.dto';
import { RoleName } from 'src/role/role.constant';

// TODO(@hahoon): add refresh token
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateRole(jwt: string, requiredRole: RoleName) {
    const payload = this.jwtService.decode(jwt) as Payload;
    const user = await this.userService.findOneByEmailForAuth({ email: payload.email });
    if (user.id !== payload.id) {
      throw new UnauthorizedException('Not Valid accessToken.');
    }
    const userRole = user.role.name;

    if (userRole === RoleName.ADMIN) {
      return true;
    }

    if (requiredRole === RoleName.ADMIN) {
      return false;
    }

    if (requiredRole === RoleName.SELLER && userRole !== RoleName.SELLER) {
      return false;
    }

    if (requiredRole === RoleName.NORMAL && userRole !== RoleName.NORMAL) {
      return false;
    }

    return true;
  }

  private async checkSignupCondition({ password, passwordConfirm, phoneNumber, email }: Partial<SignupReqDto>) {
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
  }
}
