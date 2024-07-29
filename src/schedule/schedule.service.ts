import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from '@src/schedule/dto/update-schedule.dto';
import { StatusDto } from '@src/cards/dto/status.dto';
import { Schedule } from '@src/schedule/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  /**
   * Create new collection item.
   */
  async create(createScheduleDto: CreateScheduleDto) {
    try {
      const availability =
        await this.checkCreateAvailability(createScheduleDto);

      if (availability === false) {
        throw new BadRequestException('Slot are not available for scheduling!');
      }

      const finish = this.getSlotFinishDate(
        createScheduleDto.type,
        createScheduleDto.start,
      );
      createScheduleDto.finish = finish;
      const schedule = this.scheduleRepository.create(createScheduleDto);
      const newSchedule = await this.scheduleRepository.save(schedule);

      if (!newSchedule) {
        throw new InternalServerErrorException(
          'Problem to create a schedule. Try again!',
        );
      }

      return newSchedule;
    } catch (error) {
      return error?.response;
    }
  }

  /**
   * List all collection items.
   */
  async findAll() {
    const schedules = await this.scheduleRepository.find();

    return schedules;
  }

  /**
   * List one collection item.
   */
  async findOne(id: string) {
    const schedule = await this.scheduleRepository.findOneBy({ id: id });

    if (!schedule) {
      throw new NotFoundException('Schedule not found!');
    }

    return schedule;
  }

  /**
   * List one collection item.
   */
  async findByStatus(statusDto: StatusDto) {
    const schedules = await this.scheduleRepository.find({
      where: {
        status: statusDto.status,
      },
    });

    return schedules;
  }

  /**
   * Update one collection item.
   */
  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    try {
      const finish = this.getSlotFinishDate(
        updateScheduleDto.type,
        updateScheduleDto.start,
      );
      updateScheduleDto.finish = finish;
      const schedule = await this.findOne(id);
      await this.scheduleRepository.update(schedule, { ...updateScheduleDto });
      const updatedScheduleObject = this.scheduleRepository.create({
        ...schedule,
        ...updateScheduleDto,
      });
      const updatedSchedule = this.scheduleRepository.save({
        ...updatedScheduleObject,
        ...updateScheduleDto,
      });

      return updatedSchedule;
    } catch (error) {
      return error?.response;
    }
  }

  /**
   * Delete one collection item.
   */
  async remove(id: string) {
    const schedule = await this.findOne(id);

    const deletedSchedule = await this.scheduleRepository.remove(schedule);

    if (deletedSchedule) {
      return true;
    }

    return false;
  }

  /**
   * Check slot time availability for creation.
   */
  protected async checkCreateAvailability(
    createScheduleDto: CreateScheduleDto,
  ) {
    const finish = this.getSlotFinishDate(
      createScheduleDto.type,
      createScheduleDto.start,
    );
    createScheduleDto.finish = finish;

    if (createScheduleDto.status === 'CANCELED') {
      return false;
    }

    const schedules = await this.scheduleRepository.find({
      where: [
        {
          start: Between(new Date(createScheduleDto.start), new Date(finish)),
          status: 'CONFIRMED',
        },
      ],
    });

    if (schedules.length > 0) {
      return true;
    }

    return false;
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
