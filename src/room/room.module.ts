import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MemberModule } from 'src/project/member/member.module';
import { ProjectModule } from 'src/project/project.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MemberModule, ProjectModule, MessageModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
