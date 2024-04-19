import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleName } from 'src/user/enum/user.enum';
import { UserService } from 'src/user/user.service';
import { Payload } from './dto/auth.dto';
import { SigninReqDto, SignupReqDto } from './dto/req.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup({ name, email, phoneNumber, password, passwordConfirm, role }: SignupReqDto): Promise<{ id: any }> {
    if (role === RoleName.ADMIN) {
      throw new ForbiddenException('User does not create Admin user.');
    }
    if (password !== passwordConfirm) {
      throw new BadRequestException('Password and passwordConfirm do not match.');
    }

    const isAlreadyExist = await this.userService.checkAlreadyExist({ phoneNumber, email });
    if (isAlreadyExist) {
      throw new ConflictException('User already exist.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ name, email, phoneNumber, password: hashedPassword, role });
  }

  async signout(id: number) {
    return await this.userService.changeLoginStatus({ id, isLoggedIn: false });
  }

  async signin({ email, password }: SigninReqDto): Promise<{ accessToken: any }> {
    const user = await this.userService.validate(email, password);

    const accessTokenPayload: Payload = { id: user.id, email: user.email, tokenType: 'access' };
    const accessToken = this.jwtService.sign(accessTokenPayload);

    await this.userService.changeLoginStatus({ id: user.id, isLoggedIn: true });
    return { accessToken };
  }

  async createAdmin({ name, password, passwordConfirm, phoneNumber, email }: SignupReqDto): Promise<{ id: any }> {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Password and passwordConfirm do not match.');
    }
    const isAlreadyExist = await this.userService.checkAlreadyExist({ phoneNumber, email });
    if (isAlreadyExist) {
      throw new ConflictException('User already exist.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ name, email, phoneNumber, password: hashedPassword, role: RoleName.ADMIN });
  }

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
}
