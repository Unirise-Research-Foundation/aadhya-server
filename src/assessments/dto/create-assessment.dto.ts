import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssessmentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

