import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleController } from '@src/schedule/schedule.controller';
import { ScheduleService } from '@src/schedule/schedule.service';
import { Schedule } from '@src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  exports: [ScheduleService],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
