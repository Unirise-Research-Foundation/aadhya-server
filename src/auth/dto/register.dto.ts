import { IsString, IsNotEmpty, MinLength, IsNumber, Min, Max } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1900)
  @Max(2100)
  yob: number;
}

