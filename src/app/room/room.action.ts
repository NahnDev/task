import { Dispatch } from '@reduxjs/toolkit';
import { RoomApi } from '../../api/room.api';
import { MessageType } from '../../types/message.type';
import { RoomType } from '../../types/room.type';
import { messageSlice } from '../message/message.slice';
import store, { AppDispatch } from '../store';
import { roomSlice } from './room.slice';

export class RoomAction {
    static load() {
        return async (dispatch: Dispatch) => {
            console.log('??');
            const rooms = await RoomApi.getAll();
            dispatch(roomSlice.actions.addMany(rooms));
        };
    }
    static updateLastMessage(message: MessageType) {
        return async (dispatch: AppDispatch) => {
            console.log('*************************');
            console.log(message.room);
            if (!store.getState().room[message.room]) {
                const room: RoomType = await RoomApi.getOne(message.room);
                dispatch(roomSlice.actions.add(room));
            } else {
                dispatch(roomSlice.actions.changeLastMessage(message));
            }
        };
    }
}
