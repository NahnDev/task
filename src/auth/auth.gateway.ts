import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { SocketService } from 'src/socket/socket.service';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from './auth.service';

@PublicApi()
@WebSocketGateway()
export class AuthGateway {
  constructor(
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
  ) {}

  @SubscribeMessage('verify')
  async handleMessage(
    @ConnectedSocket() client: Socket & { user: User },
    @MessageBody() payload: string,
  ) {
    const sId = client.id;
    const token = client.handshake.auth.token || payload;
    const user = await this.authService.validateWithAccessToken(token);
    await this.socketService.registerSocketForUser(sId, user._id);
    client.user = user;
    return user;
  }
}
