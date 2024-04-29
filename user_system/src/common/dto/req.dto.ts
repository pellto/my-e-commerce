import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PageReqDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  page?: number = 1;

  @Transform(({ value }) => Number(value))
  @IsInt()
  size?: number = 10;
}
