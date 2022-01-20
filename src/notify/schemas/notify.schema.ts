import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Notify {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  from: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  content: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  link: string;

  @ApiProperty()
  @Prop({
    type: Date,
    required: true,
    immutable: true,
    default: function () {
      return new Date();
    },
  })
  at: Date;
}

export type NotifyDoc = Notify & Document;
export const NotifySchema = SchemaFactory.createForClass(Notify);
NotifySchema.methods.toJSON = function () {
  return plainToClass(Notify, JSON.parse(JSON.stringify(this.toObject())));
};
