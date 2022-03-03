import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { NotifyType } from '../../types/notify.type';

export type NotifySlice = NotifyType[];
export const notifySlice = createSlice<NotifySlice, SliceCaseReducers<NotifySlice>>({
    initialState: [],
    name: 'notify',
    reducers: {
        addMany(state, action: PayloadAction<NotifyType[]>) {
            return [...action.payload, ...state];
        },
    },
});
