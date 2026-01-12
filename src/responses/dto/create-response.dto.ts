import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsObject } from 'class-validator';

export class CreateResponseDto {
  @IsUUID()
  @IsNotEmpty()
  personId: string;

  @IsUUID()
  @IsNotEmpty()
  activityId: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsString()
  @IsOptional()
  attribute?: string;

  @IsObject()
  @IsOptional()
  responseData?: any;

  @IsNumber()
  @IsOptional()
  previousScore?: number;

  @IsNumber()
  @IsOptional()
  newScore?: number;

  @IsNumber()
  @IsOptional()
  scoreChange?: number;

  @IsNumber()
  @IsOptional()
  timeSpentSeconds?: number;

  @IsObject()
  @IsOptional()
  metadata?: any;
}

