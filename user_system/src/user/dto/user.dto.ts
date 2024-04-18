import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

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
}
