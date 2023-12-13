import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: { updatedAt: false }
};

@Schema(options)
export class Ip extends Document {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true, unique: true })
  message_id: number;
}

export const IPSchema = SchemaFactory.createForClass(Ip);
