import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Project } from 'src/project/schemas/project.schema';
import { Task } from 'src/project/task/schemas/task.schema';
import { User } from 'src/user/schemas/user.schema';

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
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', autopopulate: true })
  from?: User;

  @ApiProperty()
  @Prop({ type: String, required: true })
  content?: string;

  // @ApiProperty()
  // @Prop({ type: String, required: true })
  // link?: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', autopopulate: true })
  project?: Project;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Task', autopopulate: true })
  task?: Task;

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
