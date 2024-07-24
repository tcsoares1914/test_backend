import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsDate()
  @IsOptional()
  finish: Date;

  @IsBoolean()
  @IsNotEmpty()
  confirmation: string;
}
