import { MessageType } from '../types/message.type';
import axiosClient from './axiosClient';

export class MessageApi {
    static async getMessage(rId: string, forward: string) {
        const url = `rooms/${rId}/messages`;
        const res: MessageType[] = await axiosClient.get(url, { params: { forward } });
        return res;
    }
}
