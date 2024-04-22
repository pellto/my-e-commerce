import { IsAlpha, IsInt, IsString } from 'class-validator';

export class CreateStorePayloadDto {
  @IsInt()
  ownerId: number;
  @IsAlpha()
  name: string;
}

export class CreateStoreManagerPayloadDto {
  @IsInt()
  requesterId: number;
  @IsInt()
  targetSellerId: number;
  @IsInt()
  storeId: number;
}

export class ChangeOwnerPayloadDto {
  @IsInt()
  requesterId: number;
  @IsInt()
  targetSellerId: number;
  @IsInt()
  storeId: number;
}

export class DeleteStorePayloadDto {
  @IsInt()
  id: number;
  @IsInt()
  requesterId: number;
}
