import { IsAlpha, IsInt, IsString } from 'class-validator';

export class CreateStorePayloadDto {
  @IsInt()
  ownerId: number;
  @IsAlpha()
  name: string;
}
