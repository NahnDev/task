import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Message {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  })
  room: string;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  from: string;

  @Prop({
    type: SchemaTypes.Mixed,
    required: true,
  })
  content: any;

  @Prop({
    type: Date,
    required: true,
    default: new Date(),
    immutable: true,
  })
  at: Date;
}

export type MessageDoc = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.methods.toJSOn = function () {
  return plainToClass(Message, JSON.parse(JSON.stringify(this.toObject())));
};
