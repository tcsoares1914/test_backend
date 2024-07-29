import { IsOptional, IsString } from 'class-validator';

export class StatusDto {
  @IsString()
  @IsOptional()
  status: string;
}
