import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { PROJECT_PERMISSION } from 'src/enums/project-permission.enum';

@Schema()
export class ProjectRole {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Project', required: true })
  project: string;

  @ApiProperty()
  @Prop({
    type: [{ type: String, enum: PROJECT_PERMISSION }],
    default: [],
    required: true,
  })
  permissions: PROJECT_PERMISSION[];
}

export type ProjectRoleDoc = ProjectRole & Document;
export const ProjectRoleSchema = SchemaFactory.createForClass(ProjectRole);
ProjectRoleSchema.methods.toJSON = function (): ProjectRole {
  return plainToClass(ProjectRole, JSON.parse(JSON.stringify(this.toObject())));
};
