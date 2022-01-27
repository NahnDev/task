import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WsAuthGuard } from './auth/guards/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('verify')
  handleVerify() {
    console.log('verify');
  }
}
