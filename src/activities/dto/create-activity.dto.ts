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

  @IsString()
  @IsOptional()
  key?: string;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  snippet?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  paragraph1?: string;

  @IsString()
  @IsOptional()
  paragraph2?: string;

  @IsString()
  @IsOptional()
  media?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, unknown>;
}

