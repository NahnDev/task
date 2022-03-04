import { Socket } from 'socket.io-client';
import { MessageAction } from '../app/message/message.ations';
import { RoomAction } from '../app/room/room.action';
import store, { AppDispatch } from '../app/store';
import { MessageType } from '../types/message.type';
import { SocketSegment } from './types';

export class MessageSocketSegment extends SocketSegment {
    register(socket: Socket): void {
        super.register(socket);
        this.socket.on('message:receive', (payload: MessageType) => {
            console.log('on event message:receive with');
            console.log(payload);
            store.dispatch<any>(MessageAction.addMessage(payload));
            store.dispatch<any>(RoomAction.updateLastMessage(payload));
        });
    }
    sendMessage(payload: Pick<MessageType, 'room' | 'content'>) {
        console.log('send message');
        console.log(payload);
        this.socket.emit('message:send', payload);
    }
}
