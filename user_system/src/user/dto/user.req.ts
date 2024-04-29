import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class FindUserReqDto {
  @Transform(({ value }) => Number(value))
  @IsInt()
  id: string;
}
