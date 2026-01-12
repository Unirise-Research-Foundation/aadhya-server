import { IsInt, IsUUID, Min, Max } from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  activityId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  optionValue: number;
}

