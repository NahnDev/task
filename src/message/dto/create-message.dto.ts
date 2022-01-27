import { IsArray, IsObject, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  room: string;

  @IsString()
  from: string;

  @IsObject()
  content: any;
}
