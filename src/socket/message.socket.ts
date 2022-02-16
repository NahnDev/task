import { Socket } from 'socket.io-client';
import { MessageType } from '../types/message.type';
import { SocketSegment } from './types';

export class MessageSocketSegment extends SocketSegment {
    register(socket: Socket): void {
        super.register(socket);
        this.socket.on('message:receive', (payload) => {
            console.log(payload);
        });
    }
    sendMessage(payload: MessageType) {
        this.socket.emit('message:send', payload);
    }
}
