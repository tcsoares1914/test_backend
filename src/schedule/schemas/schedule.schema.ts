import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ScheduleDocument = HydratedDocument<Schedule>;

@Schema()
export class Schedule {
  @Prop({ required: true })
  plate: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  start: Date;

  @Prop()
  finish: Date;

  @Prop({ default: 'PENDING' })
  status: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
