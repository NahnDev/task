import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { PROJECT_PERMISSION } from 'src/enums/project-permission.enum';

@Schema()
export class Role {
  @ApiProperty()
  _id: string;

  @Prop({
    type: String,
    required: true,
    ref: 'Project',
  })
  project: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    type: [
      {
        type: String,
        enum: PROJECT_PERMISSION,
        required: true,
      },
    ],
    required: true,
    default: [],
  })
  permission: PROJECT_PERMISSION[];

  @ApiProperty()
  @Prop({
    type: Boolean,
    required: true,
    immutable: true,
    default: false,
  })
  default: boolean;
}

export type RoleDoc = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ project: 1, name: 1 }, { unique: true });
RoleSchema.methods.toJSON = function () {
  return plainToClass(Role, JSON.parse(JSON.stringify(this.toObject())));
};
