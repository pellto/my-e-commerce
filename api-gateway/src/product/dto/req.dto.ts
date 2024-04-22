import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { CategoryLevel } from '../enum/category-level.enum';

export class CreateCategoryReqDto {
  @ApiProperty({ required: true, example: '의류' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, example: '1' })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => Number(value))
  parentId: number;

  @ApiProperty({ required: true, example: 'large' })
  @Matches(
    `^${Object.values(CategoryLevel)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  targetCategoryLevel: CategoryLevel;
}
