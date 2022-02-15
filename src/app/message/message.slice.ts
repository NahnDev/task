import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { Message, MessageSlice } from './type';

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
        load(state, action: PayloadAction<{ rId: string; messages: Message[] }>) {
            const { rId, messages } = action.payload;
            if (!state[rId]) {
                state[rId] = [];
            }
            state[rId] = [...messages, ...state[rId]].sort((a: Message, b: Message) => {
                return a.at.getTime() - b.at.getTime();
            });
            return state;
        },
        add(state, action: PayloadAction<{ rId: string; message: Message }>) {
            const { rId, message } = action.payload;
            if (!state[rId]) {
                state[rId] = [];
            }
            state[rId].push(message);
            return state;
        },
    },
});
