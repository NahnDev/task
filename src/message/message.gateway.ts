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

@UseGuards(PoliciesGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('test')
  async handleSendMessage(@MessageBody() payload) {
    console.log('hahahahahah');
  }
}
