import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsInt()
  parentId?: number;
}
