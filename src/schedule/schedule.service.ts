import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const availability = await this.checkAvailability(createScheduleDto);

      if (!availability) {
        throw new BadRequestException('Slot are not available for scheduling!');
      }

      const finish = this.getSlotFinishDate(
        createScheduleDto.type,
        createScheduleDto.start,
      );
      createScheduleDto.finish = finish;
      const createdSchedule = new this.scheduleModel(createScheduleDto);
      return await createdSchedule.save();
    } catch (error) {
      return error?.response;
    }
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
    try {
      const availability = await this.checkAvailability(updateScheduleDto);
      if (!availability) {
        throw new BadRequestException('Slot are not available for scheduling!');
      }

      const finish = this.getSlotFinishDate(
        updateScheduleDto.type,
        updateScheduleDto.start,
      );
      updateScheduleDto.finish = finish;
      const schedule = await this.scheduleModel.findByIdAndUpdate(
        id,
        updateScheduleDto,
      );

      if (!schedule) {
        throw new NotFoundException('Schedule not found!');
      }

      return schedule;
    } catch (error) {
      return error?.response;
    }
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

  /**
   * Check slot time availability.e.
   */
  protected async checkAvailability(
    createScheduleDto: CreateScheduleDto | UpdateScheduleDto,
  ) {
    const finish = this.getSlotFinishDate(
      createScheduleDto.type,
      createScheduleDto.start,
    );
    createScheduleDto.finish = finish;

    const schedules = await this.scheduleModel.find({
      start: {
        $gte: new Date(createScheduleDto.start),
        $lte: new Date(finish),
      },
    });

    return schedules.length < 1 ? true : false;
  }

  /**
   * Get quantity of slots by type.
   */
  protected getSlotFinishDate(type: string, slot: Date): Date {
    const startDate = new Date(slot);
    const finishDate = new Date(startDate);

    if (type === 'SIMPLE') {
      finishDate.setMinutes(startDate.getMinutes() + 29);
      finishDate.setSeconds(59);
    }

    if (type === 'COMPLETE') {
      finishDate.setMinutes(startDate.getMinutes() + 44);
      finishDate.setSeconds(59);
    }

    return finishDate;
  }
}
