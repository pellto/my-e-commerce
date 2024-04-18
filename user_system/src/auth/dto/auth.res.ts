import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class SignupResDto {
  @ApiProperty({ required: true })
  @Transform(({ value }) => Number(value))
  @IsInt()
  id: number;
}

export class SigninResDto {
  @ApiProperty({ required: true })
  accessToken: string;
}
