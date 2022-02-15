import { Message } from '../app/message/type';
import axiosClient from './axiosClient';

export class MessageApi {
    static async getMessage(rId: string, forward: string) {
        const url = `rooms/${rId}/messages`;
        const res = await axiosClient.get<Message[]>(url, { params: { forward } });
        return res;
    }
}
