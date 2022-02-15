import { Dispatch } from '@reduxjs/toolkit';
import { forwardRef } from 'react';
import { MessageApi } from '../../api/message.api';
import store, { AppDispatch } from '../store';
import { messageSlice } from './message.slice';

export class MessageAction {
    static loadMessage(rId: string) {
        return async (dispatch: Dispatch) => {
            const lastMessage = store.getState().message[rId][0];
            const forward = lastMessage ? lastMessage._id : '';
            const messages = await MessageApi.getMessage(rId, forward);
            dispatch(messageSlice.actions.load({ rId, messages }));
        };
    }
    static addMessage(rId: string) {}
}
