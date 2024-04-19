import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';
import { Payload } from './dto/auth.dto';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateRole(jwt: string, requiredRole: RoleName) {
    const payload = this.jwtService.decode(jwt) as Payload;
    const user = await this.userService.findOneByEmailForAuth(payload.email);
    if (user.id !== payload.id) {
      throw new UnauthorizedException('Not Valid accessToken.');
    }
    const userRole = user.role.role.name;

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

  async signout(id: number) {
    return 'signout';
  }

  async signin(signinReqDto: SigninReqDto): Promise<{ accessToken: any }> {
    return { accessToken: 'signin' };
  }

  async createAdmin(signupReqDto: SignupReqDto): Promise<{ id: any }> {
    return { id: 'createAdmin' };
  }

  async signup(signupReqDto: SignupReqDto): Promise<{ id: any }> {
    return { id: 'signup' };
  }
}
