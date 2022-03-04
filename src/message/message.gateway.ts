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
import { Injectable, UseGuards } from '@nestjs/common';
import { PoliciesGuard } from 'src/auth/guards/policies.guard';
import { ExtractScope } from '../decorators/extract-scope.decorator';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateMessageEvent } from './events/create-message.event';
import { MemberService } from 'src/project/member/member.service';
import { SocketService } from 'src/socket/socket.service';
import { User } from 'src/user/schemas/user.schema';
import { MessageService } from './message.service';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Actions, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { UserRole } from 'src/user/schemas/user-role.class';

@Injectable()
@UseGuards(PoliciesGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  constructor(
    private readonly memberService: MemberService,
    private readonly socketService: SocketService,
    private readonly messageService: MessageService,
    private readonly socketGateway: SocketGateway,
  ) {}
  @WebSocketServer()
  server: Server;

  @ExtractScope((data: CreateMessageDto) => {
    return { project: data.room };
  })
  @SubscribeMessage('message:send')
  async handleSendMessage(
    @ConnectedSocket() client: Socket & { user: User },
    @MessageBody() payload: CreateMessageDto,
  ) {
    const data = payload;
    console.log('Server receive a message');
    data.from = client.user._id;
    this.messageService.create(data).then();
  }

  @OnEvent(CreateMessageEvent.ev)
  async handleCreateMessageEvent(payload: CreateMessageEvent) {
    const room = payload.message.room;
    const members = await this.memberService.findAll(room);
    console.log('EmitterEvent is ', CreateMessageEvent.ev);
    for (const member of members) {
      console.log(
        `> Emit to ${this.socketService.findSocketOfUser(member.user._id)}`,
      );
      console.log(payload.message);

      const user = member.user;
      user.roles = new UserRole();
      user.roles.system = user.isAdmin ? 'Admin' : '';
      user.roles.project = member.role;
      const ability = new CaslAbilityFactory().createForUser(member.user);
      if (!ability.can(Actions.Read, Message)) return;
      this.socketGateway
        .emit(member.user._id, 'message:receive', payload.message)
        .then();
    }
  }
}
