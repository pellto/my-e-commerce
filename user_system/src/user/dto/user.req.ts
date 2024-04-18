import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserReqDto {
  @ApiProperty({ required: true })
  @Transform(({ value }) => Number(value))
  @IsInt()
  id: string;
}
