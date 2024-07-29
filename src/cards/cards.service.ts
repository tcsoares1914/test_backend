import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDto } from '@src/cards/dto/status.dto';
import { Schedule } from '@src/schedule/entities/schedule.entity';

@Injectable()
export class CardsService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}
  /**
   * List one collection item.
   */
  async findByStatus(statusDto: StatusDto) {
    const schedules = await this.scheduleRepository.find({
      where: {
        status: statusDto.status,
      },
    });

    return {
      total: schedules.length,
      data: schedules,
    };
  }
}
