import { IsEmail, IsInt, IsString } from 'class-validator';

export class Payload {
  @IsInt()
  id: number;
  @IsEmail()
  email: string;
  @IsString()
  tokenType: string;
}
