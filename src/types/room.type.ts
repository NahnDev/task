import { MessageType } from './message.type';

export interface RoomType {
    _id: string;
    name: string;
    lastMessage: MessageType;
}
