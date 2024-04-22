import { IsAlpha, IsInt } from 'class-validator';

export class CreateStoreReqDto {
  @IsInt()
  ownerId: number;
  @IsAlpha()
  name: string;
}
