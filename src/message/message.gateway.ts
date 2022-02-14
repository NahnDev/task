import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import {} from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';
import { Message } from './schemas/message.schema';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from 'src/auth/guards/policies.guard';
import { ExtractScope } from '../decorators/extract-scope.decorator';
import { OnEvent } from '@nestjs/event-emitter';

@UseGuards(PoliciesGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @ExtractScope((data: CreateMessageDto) => {
    return { project: data.room };
  })
  @SubscribeMessage('message:send')
  async handleSendMessage(@MessageBody() payload: CreateMessageDto) {
    console.log(payload);
    return payload;
  }
}
