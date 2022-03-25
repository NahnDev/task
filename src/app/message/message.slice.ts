import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { MessageType, MessageSlice } from '../../types/message.type';

const initialState: MessageSlice = {
    '1': [
        {
            _id: '1',
            at: new Date(),
            content: {
                t: 'text',
                data: 'Hello',
            },
            from: '2',
            room: '1',
        },
    ],
};
export const messageSlice = createSlice<MessageSlice, SliceCaseReducers<MessageSlice>>({
    initialState,
    name: 'message',
    reducers: {
        load(state, action: PayloadAction<{ rId: string; messages: MessageType[] }>) {
            const { rId, messages } = action.payload;
            if (!state[rId]) {
                state[rId] = [];
            }
            console.log(messages);
            state[rId] = [...messages, ...state[rId]].sort((a: MessageType, b: MessageType) => {
                return new Date(a.at).getTime() - new Date(b.at).getTime();
            });
            return state;
        },
        add(state, action: PayloadAction<MessageType>) {
            const message = action.payload;
            const rId = message.room;
            if (!state[rId]) {
                state[rId] = [];
            }
            state[rId].push(message);
            return state;
        },
    },
});
