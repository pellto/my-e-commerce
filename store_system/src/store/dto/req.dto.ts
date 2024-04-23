import { IsAlpha, IsInt } from 'class-validator';

export class CreateStoreReqDto {
  @IsInt()
  ownerId: number;
  @IsAlpha()
  name: string;
}

export class CheckIsOwnerReqDto {
  @IsInt()
  id: number;
  @IsInt()
  targetUserId: number;
}

export class CheckIsManagerReqDto {
  @IsInt()
  id: number;
  @IsInt()
  managerId: number;
}

export class CreateStoreManagerReqDto {
  @IsInt()
  requesterId: number;
  @IsInt()
  targetSellerId: number;
  @IsInt()
  storeId: number;
}

export class ChangeOwnerReqDto {
  @IsInt()
  requesterId: number;
  @IsInt()
  targetSellerId: number;
  @IsInt()
  storeId: number;
}

export class DeleteReqDto {
  @IsInt()
  id: number;
  @IsInt()
  requesterId: number;
}
