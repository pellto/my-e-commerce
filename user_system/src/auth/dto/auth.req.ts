import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';

export class SignupReqDto {
  @ApiProperty({ required: true, example: 'user1' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: '010-1234-5678' })
  @IsPhoneNumber('KR')
  phoneNumber: string;

  @ApiProperty({ required: true, example: 'test@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Aa123456789!@' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;

  @ApiProperty({ required: true, example: 'Aa123456789!@' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  passwordConfirm: string;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'test@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Aa123456789!@' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;
}
