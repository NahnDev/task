import { Socket } from 'socket.io-client';
import { Message } from '../app/message/type';
import store from '../app/store';
import { SocketSegment } from './types';

export class MessageSocketSegment extends SocketSegment {
    register(socket: Socket): void {
        super.register(socket);
        this.socket.on('message:receive', (payload) => {
            console.log(payload);
        });
    }
    sendMessage(payload: Message) {
        this.socket.emit('message:send', payload);
    }
}
