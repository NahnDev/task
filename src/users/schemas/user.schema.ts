import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiOkResponse } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';
import { USER_ROLES } from '../enums/user-role.enum';
import { Exclude, plainToClass, Transform } from 'class-transformer';

@Schema()
export class User {
  @ApiProperty({ type: 'string' })
  _id: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  @Exclude()
  password: string;

  @ApiProperty()
  @Prop({
    type: String,
    required: true,
    immutable: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: USER_ROLES,
    required: true,
    default: USER_ROLES.USER,
  })
  role: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  return plainToClass(User, JSON.parse(JSON.stringify(this.toObject()))); // warning : hieu suat
};
