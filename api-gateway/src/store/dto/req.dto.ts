import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreReqDto {
  @ApiProperty({ description: 'Store name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateStoreManagerReqDto {
  @ApiProperty({ description: 'Target Seller Id' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  targetSellerId: number;
  @ApiProperty({ description: 'Target Store Id' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  storeId: number;
}

export class ChangeOwnerReqDto {
  @ApiProperty({ description: 'Target Seller Id' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  targetSellerId: number;
  @ApiProperty({ description: 'Target Store Id' })
  @IsInt()
  @Transform(({ value }) => Number(value))
  storeId: number;
}
