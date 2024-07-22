import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleController } from '@src/schedule/schedule.controller';
import { ScheduleService } from '@src/schedule/schedule.service';
import {
  Schedule,
  ScheduleSchema,
} from '@src/schedule/schemas/schedule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
