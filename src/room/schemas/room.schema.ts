import { PickType } from '@nestjs/swagger';
import { Message } from 'src/message/schemas/message.schema';
import { Project } from 'src/project/schemas/project.schema';

export class Room extends PickType(Project, ['name', '_id']) {
  lastMessage: Message;
}
