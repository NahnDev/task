import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { USER_ACTIVE } from 'src/enums/user-active.enum';

@Schema()
export class User {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  email: string;

  @Exclude()
  @Prop({ type: String, required: true, select: false })
  password: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: USER_ACTIVE,
    required: true,
    default: USER_ACTIVE.NOT_ACTIVE,
  })
  active: USER_ACTIVE;

  role: {
    [key: string]: any;
  };
}

export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function (): User {
  return plainToClass(User, JSON.parse(JSON.stringify(this.toObject())));
};
