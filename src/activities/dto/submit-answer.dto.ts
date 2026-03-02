import { IsInt, IsOptional, IsUUID, Min, Max } from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  activityId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  optionValue: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  timeSpentSeconds?: number;
}
