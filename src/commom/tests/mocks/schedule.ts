import { Schedule } from '@src/schedule/entities/schedule.entity';
import { CreateScheduleDto } from '@src/schedule/dto/create-schedule.dto';

export enum washingType {
  SIMPLE = 'SIMPLE',
  COMPLETE = 'COMPLETE',
}

export enum scheduleStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
}

export class ScheduleTestMocks {
  static getValidSchedule(): Schedule {
    const schedule = new Schedule();
    schedule.id = '00000000-0000-0000-0000-000000000000';
    schedule.plate = 'ABC1D34';
    schedule.type = washingType.SIMPLE;
    schedule.start = new Date('2024-07-24 10:00:00');
    schedule.start = new Date('2024-07-24 10:29:59');
    schedule.status = scheduleStatus.CONFIRMED;

    return schedule;
  }

  static getValidScheduleDto(): CreateScheduleDto {
    const schedule = new CreateScheduleDto();
    schedule.plate = 'ABC1D34';
    schedule.type = washingType.SIMPLE;
    schedule.start = new Date('2024-07-24 10:00:00');
    schedule.finish = new Date('2024-07-24 10:29:59');
    schedule.status = scheduleStatus.CONFIRMED;

    return schedule;
  }

  static getSchedules(): Schedule[] {
    const schedules: Schedule[] = [
      {
        id: '00000000-0000-0000-0000-000000000000',
        plate: 'ABC1D34',
        type: washingType.SIMPLE,
        start: new Date('2024-07-24 10:00:00'),
        finish: new Date('2024-07-24 10:29:59'),
        status: scheduleStatus.CONFIRMED,
        created: new Date(),
        updated: new Date(),
      },
      {
        id: '11111111-1111-1111-1111-111111111111',
        plate: 'AZZ5D99',
        type: washingType.COMPLETE,
        start: new Date('2024-07-24 10:30:00'),
        finish: new Date('2024-07-24 11:14:59'),
        status: scheduleStatus.CANCELED,
        created: new Date(),
        updated: new Date(),
      },
    ];

    return schedules;
  }

  static getNewSchedule(): Schedule {
    const newSchedule: Schedule = new Schedule({
      plate: 'AZZ5D99',
      type: washingType.COMPLETE,
      start: new Date('2024-07-24 10:30:00'),
      finish: new Date('2024-07-24 11:14:59'),
      status: scheduleStatus.CANCELED,
    });

    return newSchedule;
  }

  static getUpdatedSchedule() {
    return new Schedule({
      status: scheduleStatus.CONFIRMED,
    });
  }
}
