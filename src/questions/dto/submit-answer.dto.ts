import { IsInt, IsUUID, Min, Max } from 'class-validator';

export class SubmitAnswerDto {
  @IsInt()
  @Min(1)
  questionId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  optionValue: number;

  @IsUUID()
  personId: string;
}

