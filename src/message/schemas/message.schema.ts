import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Type } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class MessageContent {
  @ApiProperty()
  @Prop({
    type: String,
    enum: ['text', 'file'],
    required: true,
    default: 'text',
  })
  t: 'text' | 'file';

  @ApiProperty()
  @Prop({
    type: String,
  })
  data: string;
}

@Schema()
export class Message {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
  })
  room: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  from: string;

  @ApiProperty()
  @Prop({ type: MessageContent, required: true })
  content: MessageContent;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
    default: function () {
      return Date.now();
    },
    immutable: true,
  })
  at: number;
}

export type MessageDoc = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.methods.toJSON = function () {
  return plainToClass(Message, JSON.parse(JSON.stringify(this.toObject())));
};
