import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class File {
  @ApiProperty()
  @Prop({ type: String, required: true })
  path: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project' })
  project?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Task' })
  task?: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  mineType: string;
}

export type FileDoc = File & Document;
export const FileSchema = SchemaFactory.createForClass(File);
FileSchema.methods.toJSON = function () {
  return plainToClass(File, JSON.parse(JSON.stringify(this.toObject())));
};
