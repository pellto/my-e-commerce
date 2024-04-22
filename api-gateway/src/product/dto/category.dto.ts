import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatedCategoryDto {
  @IsInt()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GottenCategoryDto {
  @IsInt()
  id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
}
