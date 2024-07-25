import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  plate?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  start?: Date;

  @IsString()
  @IsOptional()
  finish?: Date;

  @IsString()
  @IsOptional()
  status?: string;
}
