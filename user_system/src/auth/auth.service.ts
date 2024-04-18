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

  async signup({ name, email, phoneNumber, password, passwordConfirm, role }: SignupReqDto) {
    if (role === RoleName.ADMIN) {
      throw new ForbiddenException('User does not create Admin user.');
    }

    await this.checkSignupCondition({ password, passwordConfirm, phoneNumber, email });

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ name, email, phoneNumber, password: hashedPassword, role });
  }

  async createAdmin({ name, email, phoneNumber, password, passwordConfirm, role }: SignupReqDto) {
    await this.checkSignupCondition({ password, passwordConfirm, phoneNumber, email });

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ name, email, phoneNumber, password: hashedPassword, role });
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

    const accessTokenPayload: Payload = { id: user.id, email: user.email, tokenType: 'access' };
    const accessToken = this.jwtService.sign(accessTokenPayload);

    await this.userService.changeLoginStatus(user.id, true);
    return { accessToken };
  }

  async signout(id: number) {
    this.userService.changeLoginStatus(id, false);
  }

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
