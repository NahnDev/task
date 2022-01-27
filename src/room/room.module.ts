import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { MemberModule } from 'src/project/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
