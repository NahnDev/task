import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';
import { Role } from 'src/project/role/schemas/role.schema';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Member {
  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  user: User;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Project',
  })
  project: string;

  @ApiProperty()
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Role',
    autopopulate: true,
  })
  role: Role;
}

export type MemberDoc = Member & Document;
export const MemberSchema = SchemaFactory.createForClass(Member);

MemberSchema.methods.toJSON = function (): Member {
  return plainToClass(Member, JSON.parse(JSON.stringify(this.toObject())));
};

MemberSchema.index({ project: 1, user: 1 }, { unique: true });
