import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { StringOrObjectId } from 'src/types/StringOrObjectId';

@Schema()
export class Task {
  @ApiProperty({ type: 'string' })
  _id: StringOrObjectId;
  @ApiProperty()
  __t: 'PrimaryTask' | 'SubTask';

  @ApiProperty()
  @Prop({})
  name: string;

  @ApiProperty()
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  complete: boolean;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Project.name,
    immutable: true,
  })
  project: StringOrObjectId;
}
export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.methods.toJSON = function () {
  return plainToClass(Task, this.toObject());
};

@Schema()
export class PrimaryTask extends Task {
  @ApiProperty()
  @Prop({
    type: String,
  })
  description: string;

  @ApiProperty()
  @Prop({
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        v > new Date();
      },
    },
    default: () => {
      return new Date(new Date().setDate(1));
    },
  })
  dueDate: Date;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @Prop({
    type: [{ type: SchemaTypes.ObjectId, ref: Task.name }],
  })
  dependencies: StringOrObjectId[];
}

export type PrimaryTaskDocument = PrimaryTask & Document;
export const PrimaryTaskSchema = SchemaFactory.createForClass(PrimaryTask);
PrimaryTaskSchema.methods.toJSON = function () {
  return plainToClass(PrimaryTask, this.toObject());
};

@Schema()
export class SubTask extends Task {
  @ApiProperty({ type: 'string' })
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Task.name,
  })
  parent: StringOrObjectId;
}

export type SubTaskDocument = SubTask & Document;
export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
SubTaskSchema.methods.toJSON = function () {
  return plainToClass(SubTask, this.toObject());
};
