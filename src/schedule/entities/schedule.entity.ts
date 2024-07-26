import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum washingType {
  SIMPLE = 'SIMPLE',
  COMPLETE = 'COMPLETE',
}

export enum scheduleStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
}

@Entity({
  name: 'schedules',
})
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'plate', type: 'varchar' })
  plate: string;

  @Column({ type: 'enum', enum: washingType })
  type: string;

  @Column({ type: 'datetime' })
  start: Date;

  @Column({ type: 'datetime' })
  finish?: Date;

  @Column({ type: 'enum', enum: scheduleStatus })
  status: string;

  @CreateDateColumn({ name: 'created' })
  created!: Date;

  @UpdateDateColumn({ name: 'updated' })
  updated!: Date;

  constructor(schedule?: Partial<Schedule>) {
    this.id = schedule?.id;
    this.plate = schedule?.plate;
    this.type = schedule?.type;
    this.start = schedule?.start;
    this.finish = schedule?.finish;
    this.created = schedule?.created;
    this.updated = schedule?.updated;
  }
}
