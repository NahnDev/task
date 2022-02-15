import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { RoomType } from '../../types/room.type';

export interface RoomSlice {
    [id: string]: RoomType;
}
const initialState: RoomSlice = {};
export const roomSlice = createSlice<RoomSlice, SliceCaseReducers<RoomSlice>>({
    initialState,
    name: 'room',
    reducers: {
        addMany(state, action: PayloadAction<RoomType[]>) {
            const rooms = action.payload;
            console.log(
                rooms.reduce<RoomSlice>((pre, cur) => {
                    pre[cur._id] = cur;
                    return pre;
                }, {})
            );
            return rooms.reduce<RoomSlice>((pre, cur) => {
                pre[cur._id] = cur;
                return pre;
            }, {});
        },
    },
});
