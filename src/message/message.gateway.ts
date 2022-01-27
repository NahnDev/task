import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  WsResponse,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import {} from '@nestjs/platform-socket.io';
import { Server, Socket } from 'socket.io';
import { Message } from './schemas/message.schema';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { from, map, Observable } from 'rxjs';
import { UseGuards } from '@nestjs/common';
import { WsPoliciesGuard } from 'src/auth/guards/ws-policies.guard';

@UseGuards(WsPoliciesGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('///////');
  }

  @SubscribeMessage('test')
  async handleSendMessage(@MessageBody() payload: any) {
    console.log('hahahahahah');
  }
}
