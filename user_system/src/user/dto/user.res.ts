import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt } from 'class-validator';

export class FindUserResDto {
  @ApiProperty({ required: true })
  @IsInt()
  id: number;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsDateString()
  createdAt: string;
}
