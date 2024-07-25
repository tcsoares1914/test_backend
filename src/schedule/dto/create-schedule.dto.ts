import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  plate: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  start: Date;

  @IsString()
  @IsOptional()
  finish: Date;

  @IsString()
  @IsOptional()
  status: string;
}
