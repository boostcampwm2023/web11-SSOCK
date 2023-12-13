import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop({ required: true })
  clientIp: string;

  @Prop({ required: true })
  id: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
