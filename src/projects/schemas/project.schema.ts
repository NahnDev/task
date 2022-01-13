import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { StringOrObjectId } from 'src/types/StringOrObjectId';
import { User } from 'src/users/schemas/user.schema';
import { PROJECT_ROLE } from '../enums/project-role.enum';

export const project_permission_open_api_options: ApiPropertyOptions = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      user: {
        type: 'string',
      },
      role: {
        type: 'string',
        example: 'PROJECT_ROLE',
      },
    },
  },
};

@Schema()
export class Project {
  @ApiProperty({ type: 'string' })
  _id: StringOrObjectId;

  @ApiProperty()
  @Prop({})
  name: string;

  @ApiProperty({ type: 'string' })
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
  })
  author: StringOrObjectId;

  @ApiProperty(project_permission_open_api_options)
  @Prop({
    type: [
      {
        type: {
          user: {
            type: SchemaTypes.ObjectId,
            ref: User.name,
          },
          role: {
            type: String,
            enum: PROJECT_ROLE,
            required: true,
          },
        },
      },
    ],
  })
  permission: { user: StringOrObjectId; role: PROJECT_ROLE }[];
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
ProjectSchema.methods.toJSON = function () {
  return plainToClass(Project, this.toObject());
};
