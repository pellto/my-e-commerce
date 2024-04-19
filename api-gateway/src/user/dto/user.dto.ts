import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { RoleName } from '../enum/user.enum';

export class UserCreatePayloadDto {
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

export class UserFindResponsDto {
  id: number;
  email: string;
}
