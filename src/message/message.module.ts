import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MemberModule } from 'src/project/member/member.module';
import { MessageGateway } from './message.gateway';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MemberModule,
    SocketModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
})
export class MessageModule {}
