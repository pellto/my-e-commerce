import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { RoleName } from 'src/role/role.constant';

export class UserCreateDto {
  @IsEmail()
  email: string;
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;
  @IsPhoneNumber('KR')
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @Matches(
    `^${Object.values(RoleName)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role: RoleName;
}

export class ValidateUserPayloadDto {
  email: string;
  password: string;
}

export class CheckAlreadyExistPayloadDto {
  email: string;
  phoneNumber: string;
}

export class ChangeLoginStatusPayloadDto {
  id: number;
  isLoggedIn: boolean;
}

export class FindEmailPayloadDto {
  email: string;
}
