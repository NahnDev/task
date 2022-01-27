import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Task {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Member' }] })
  assignee: string[];

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
  project: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Task' })
  parent: string;

  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  complete: string;

  @ApiProperty()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Task' }], default: [] })
  dependencies: string[];

  @ApiProperty()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Task' }], default: [] })
  subtask_order: string[];
}

export type TaskDoc = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.methods.toJSON = function () {
  return plainToClass(Task, JSON.parse(JSON.stringify(this.toObject())));
};
