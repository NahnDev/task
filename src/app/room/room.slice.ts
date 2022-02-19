import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { MessageType } from '../../types/message.type';
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
        add(state, action: PayloadAction<RoomType>) {
            const room = action.payload;
            state[room._id] = room;
            return state;
        },
        changeLastMessage(state, action: PayloadAction<MessageType>) {
            const rId = action.payload.room;
            state[rId].lastMessage = action.payload;
            return state;
        },
    },
});
