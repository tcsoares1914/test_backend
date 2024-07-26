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
      const availability = await this.checkAvailability(createScheduleDto);

      if (!availability) {
        throw new BadRequestException('Slot are not available for scheduling!');
      }

      const finish = this.getSlotFinishDate(
        createScheduleDto.type,
        createScheduleDto.start,
      );
      createScheduleDto.finish = finish;
      const vehicle = this.scheduleRepository.create(createScheduleDto);
      const newVehicle = await this.scheduleRepository.save(vehicle);

      if (!newVehicle) {
        throw new InternalServerErrorException(
          'Problem to create a vehicle. Try again!',
        );
      }

      return newVehicle;
    } catch (error) {
      console.log(error);
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
      const schedule = await this.findOne(id);
      await this.scheduleRepository.update(schedule, { ...updateScheduleDto });
      const updatedScheduleObject = this.scheduleRepository.create({
        ...schedule,
        ...updateScheduleDto,
      });
      const updatedVehicle = this.scheduleRepository.save({
        ...updatedScheduleObject,
        ...updateScheduleDto,
      });

      return updatedVehicle;
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

    const schedules = await this.scheduleRepository.find({
      where: {
        start: Between(new Date(createScheduleDto.start), new Date(finish)),
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
