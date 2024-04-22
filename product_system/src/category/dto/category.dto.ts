import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsInt()
  parentId?: number;
}

export class GetCategoiesPayloadDto {
  @IsOptional()
  @IsInt()
  parentId?: number;
}
