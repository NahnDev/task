import { ApiOkResponse, ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Message } from 'src/message/schemas/message.schema';
import { Project } from 'src/project/schemas/project.schema';

export class Room extends PickType(Project, ['name', '_id', 'at']) {
  @Expose()
  @ApiProperty({ type: Message })
  lastMessage: Message;
}
