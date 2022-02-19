import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
        // Form Phone and password
        setUserLogin: (state, action: PayloadAction<any>) => {
            state = { ...action.payload.user, isLogin: true };

            const token = {
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expires: action.payload.expires,
            };

            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('_id', action.payload.user._id);

            return state;
        },

        setUser: (state, action: PayloadAction<User>) => {
            state = { ...action.payload, isLogin: true };

            return state;
        },
        // setProfile: (state, action) => {
        //     state = { ...state, profile: action.payload }
        //     return state
        // },
        // setData: (state, action) => {
        //     state = { ...state, data: action.payload }
        //     const user = {
        //         isLogin: action.payload.isLogin,
        //         phone: action.payload.phone,
        //         _id: action.payload.accountId,
        //     }
        //     if (action.payload.isLogin) {
        //         localStorage.setItem('token', JSON.stringify(action.payload.token))
        //         localStorage.setItem('user', JSON.stringify(user))
        //     }
        //     return state
        // },
        // setSignOut: (state, action) => {
        //     state = { data: action.payload }

        //     return state
        // },
    },
});

const { reducer, actions } = user;
export const { setUser, setUserLogin } = actions;
export default reducer;
