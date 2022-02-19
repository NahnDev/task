import { Socket } from 'socket.io-client';
import { MessageAction } from '../app/message/message.ations';
import { RoomAction } from '../app/room/room.action';
import store, { AppDispatch } from '../app/store';
import { MessageType } from '../types/message.type';
import { SocketSegment } from './types';

export class AuthSocketSegment extends SocketSegment {
    register(socket: Socket): void {
        super.register(socket);
    }
    verify(payload: string) {
        this.socket.emit('verify', payload);
    }
}
