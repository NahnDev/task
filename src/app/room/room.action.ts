import { Dispatch } from '@reduxjs/toolkit';
import { RoomApi } from '../../api/room.api';
import { roomSlice } from './room.slice';

export class RoomAction {
    static load() {
        return async (dispatch: Dispatch) => {
            console.log('??');
            const rooms = await RoomApi.getAll();
            dispatch(roomSlice.actions.addMany(rooms));
        };
    }
}
