import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Member } from '../member/schemas/member.schema';

@Schema()
export class Project {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  author: string;

  @ApiProperty()
  members: Member[];
}

export type ProjectDoc = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.methods.toJSON = function () {
  return plainToClass(Project, JSON.parse(JSON.stringify(this.toObject())));
};
