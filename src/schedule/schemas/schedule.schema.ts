import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop()
  plate: string;

  @Prop()
  type: string;

  @Prop()
  start: Date;

  @Prop()
  finish: Date;

  @Prop()
  confirmation: boolean;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
