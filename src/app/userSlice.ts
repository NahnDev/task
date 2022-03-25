import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socketClient } from '../socket/socket.client';
import { User } from '../types/global';

const isLogin: boolean = localStorage.getItem('token') ? true : false;
const _id: string = localStorage.getItem('_id') || '';
console.log(localStorage.getItem('token'));

const initialState: User = {
    isLogin: isLogin,
    _id: _id,
};

const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserLogin: (state, action: PayloadAction<any>) => {
            state = { ...action.payload.user, isLogin: true };

            const token = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expires: action.payload.expires,
            };

            socketClient.auth.verify(token.accessToken);
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('_id', action.payload.user._id);

            return state;
        },

        setUser: (state, action: PayloadAction<User>) => {
            state = { ...action.payload, isLogin: true };

            return state;
        },

        setSignOut: (state, action: PayloadAction<any>) => {
            state = action.payload;
            localStorage.clear();
            return state;
        },
    },
});

const { reducer, actions } = user;
export const { setUser, setUserLogin, setSignOut } = actions;
export default reducer;
