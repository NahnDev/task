import { Type } from 'class-transformer';
import { IsArray, IsObject, IsString } from 'class-validator';
import { MessageContent } from '../schemas/message.schema';

export class CreateMessageDto {
  @IsString()
  room: string;

  @IsString()
  from: string;

  @Type(() => MessageContent)
  content: MessageContent;
}
