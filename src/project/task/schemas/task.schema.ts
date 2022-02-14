import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, plainToClass, Type } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Task {
  @Expose()
  @ApiProperty()
  _id: string;

  @Expose()
  @ApiProperty()
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Member' }] })
  assignee: string[];

  @Expose()
  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @Expose()
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Project',
    required: true,
    select: 0,
  })
  project: string;

  @Expose()
  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Task' })
  parent: string;

  @Expose()
  @ApiProperty()
  @Prop({ type: Boolean, required: true, default: false })
  complete: boolean;

  @Expose()
  @Type(() => TaskRef)
  @ApiProperty()
  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Task', autopopulate: true }],
    default: [],
  })
  dependencies: TaskRef[];

  @Expose()
  @Type(() => TaskRef)
  @ApiProperty()
  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: 'Task', autopopulate: true }],
    default: [],
  })
  subtask_order: TaskRef[];

  @Expose()
  @ApiProperty()
  @Prop({ type: Boolean, default: true, required: true })
  completable: boolean;
}

class TaskRef extends PickType(Task, [
  '_id',
  'name',
  'complete',
  'completable',
]) {}

export type TaskDoc = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.methods.toJSON = function () {
  return plainToClass(Task, JSON.parse(JSON.stringify(this.toObject())), {
    excludeExtraneousValues: true,
  });
};
