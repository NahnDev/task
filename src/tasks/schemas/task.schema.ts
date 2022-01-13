import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Transform } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';

@Schema()
export class Task {
  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: 'string' })
  _id: string;
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

  @Transform(({ value }) => value.toString())
  @ApiProperty({ type: 'string' })
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Project.name,
    immutable: true,
  })
  project: string;
}
export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
TaskSchema.methods.toJSON = function () {
  return plainToClass(Task, JSON.parse(JSON.stringify(this.toObject())));
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
}

export type PrimaryTaskDocument = PrimaryTask & Document;
export const PrimaryTaskSchema = SchemaFactory.createForClass(PrimaryTask);
PrimaryTaskSchema.methods.toJSON = function () {
  return plainToClass(PrimaryTask, JSON.parse(JSON.stringify(this.toObject())));
};

@Schema()
export class SubTask extends Task {
  @ApiProperty({ type: 'string' })
  @Transform(({ value }) => value.toString())
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: Task.name,
  })
  parent: string;
}

export type SubTaskDocument = SubTask & Document;
export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
SubTaskSchema.methods.toJSON = function () {
  return plainToClass(SubTask, JSON.parse(JSON.stringify(this.toObject())));
};
