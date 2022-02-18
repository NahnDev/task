import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Notify {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  })
  user: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  from?: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  content?: string;

  // @ApiProperty()
  // @Prop({ type: String, required: true })
  // link?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' })
  project?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Task' })
  task?: string;

  @ApiProperty()
  @Prop({
    type: Number,
    required: true,
    immutable: true,
    default: function () {
      return Date.now();
    },
  })
  at: number;
}

export type NotifyDoc = Notify & Document;
export const NotifySchema = SchemaFactory.createForClass(Notify);
NotifySchema.methods.toJSON = function () {
  return plainToClass(Notify, JSON.parse(JSON.stringify(this.toObject())));
};
