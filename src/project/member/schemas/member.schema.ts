import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Member {
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
    type: SchemaTypes.ObjectId,
    ref: 'Role',
  })
  role: string;
}

export type MemberDoc = Member & Document;
export const MemberSchema = SchemaFactory.createForClass(Member);
MemberSchema.methods.toJSON = function (): Member {
  return plainToClass(Member, JSON.parse(JSON.stringify(this.toObject())));
};

MemberSchema.index({ project: 1, user: 1 }, { unique: true });
