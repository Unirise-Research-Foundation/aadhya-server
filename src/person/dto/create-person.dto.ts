import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  name: string;

  @IsInt() // its int
  @Min(1900) // in or after 1900 (assuming other to be adults).
  @Max(new Date().getFullYear()) // avoid future values
  yob: number;
}
