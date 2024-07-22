import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '@src/schedule/dto/update-schedule.dto';
import { Schedule } from '@src/schedule/schemas/schedule.schema';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<Schedule>,
  ) {}
  /**
   * Create new collection item.
   */
  async create(createScheduleDto: CreateScheduleDto) {
    const createdSchedule = new this.scheduleModel(createScheduleDto);

    return await createdSchedule.save();
  }
  /**
   * List all collection items.
   */
  async findAll() {
    const schedules = await this.scheduleModel.find();

    return schedules;
  }
  /**
   * List one collection item.
   */
  async findOne(id: string) {
    const schedule = await this.scheduleModel.findById(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found!');
    }

    return schedule;
  }
  /**
   * Update one collection item.
   */
  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleModel.findByIdAndUpdate(
      id,
      updateScheduleDto,
    );

    if (!schedule) {
      throw new NotFoundException('Schedule not found!');
    }

    return schedule;
  }
  /**
   * Delete one collection item.
   */
  async remove(id: string) {
    const schedule = await this.scheduleModel.findByIdAndDelete(id);

    if (!schedule) {
      throw new NotFoundException('Schedule not found!');
    }

    return schedule;
  }
}
