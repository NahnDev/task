import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from 'src/socket/socket.service';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('verify')
  async handleMessage(@ConnectedSocket() client: Socket) {
    console.log(client.id);
    const sId = client.id;
    const token = client.handshake.auth.token;
    const user = await this.authService.validateWithAccessToken(token);
    await this.socketService.setAuth(sId, user);
    return user;
  }
}
