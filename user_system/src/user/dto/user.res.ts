import { IsDateString, IsEmail, IsInt } from 'class-validator';

export class FindUserResDto {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsDateString()
  createdAt: string;
}
