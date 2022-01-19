import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { PROJECT_ROLE } from 'src/roles/project.role';

@Schema()
export class ProjectMember {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  user: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Project',
  })
  project: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: PROJECT_ROLE,
    default: PROJECT_ROLE.MEMBER,
  })
  role: PROJECT_ROLE;
}

export type ProjectMemberDoc = ProjectMember & Document;
export const ProjectMemberSchema = SchemaFactory.createForClass(ProjectMember);
ProjectMemberSchema.methods.toJSON = function (): ProjectMember {
  return plainToClass(
    ProjectMember,
    JSON.parse(JSON.stringify(this.toObject())),
  );
};
