import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString, Matches } from 'class-validator';
import { RoleName } from 'src/role/role.constant';

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

  @ApiProperty({ required: true, example: 'NORMAL' })
  @Matches(
    `^${Object.values(RoleName)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  role: RoleName;
}

export class SigninReqDto {
  @ApiProperty({ required: true, example: 'test@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, example: 'Aa123456789!@' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/)
  password: string;
}

export class SignoutReqDto {
  @ApiProperty({ required: true, example: 1 })
  @IsInt()
  id: number;
}
