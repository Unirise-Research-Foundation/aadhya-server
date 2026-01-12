import { IsString, IsNotEmpty, IsUUID, IsOptional, IsObject } from 'class-validator';

export class CreateActivityDto {
  @IsUUID()
  @IsNotEmpty()
  assessmentId: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsOptional()
  attribute?: string;

  @IsObject()
  @IsOptional()
  metadata?: any;
}

