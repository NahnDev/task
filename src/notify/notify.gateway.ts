import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketGateway } from 'src/socket/socket.gateway';
import { CreateNotifyEvent } from './events/create-notify.event';
import { Notify } from './schemas/notify.schema';

@Injectable()
@WebSocketGateway()
export class NotifyGateway {
  constructor(private readonly socketGateway: SocketGateway) {}

  @OnEvent(CreateNotifyEvent.ev)
  handleCreateNotifyEvent(payload: Notify) {
    this.socketGateway.emit(payload.user, 'notify:receive', payload).then();
  }
}