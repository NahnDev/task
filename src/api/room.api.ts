import { RoomType } from '../types/room.type';
import axiosClient from './axiosClient';

export class RoomApi {
    static async getAll(): Promise<RoomType[]> {
        const url = '/rooms';
        const rooms: RoomType[] = await axiosClient.get(url);
        return rooms;
    }
}
