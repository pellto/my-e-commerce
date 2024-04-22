import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStoreReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
