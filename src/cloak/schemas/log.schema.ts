import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CheckResultEnum } from '../types/check-result.type';

export type LogDocument = HydratedDocument<Log>;
@Schema({ timestamps: true })
export class Log {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: false })
  userAgent?: string;

  @Prop({ required: false })
  acceptLanguage?: string;

  @Prop({ required: true, enum: Object.values(CheckResultEnum), type: String })
  checkResult: CheckResultEnum;
}

export const LogSchema = SchemaFactory.createForClass(Log);
