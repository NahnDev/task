import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../../types/global';

function getToken(): Token | null {
    const data = localStorage.getItem('token');
    if (!data) return null;
    let token: Token;
    try {
        token = JSON.parse(data) as Token;
    } catch {
        return null;
    }
    return token;
}

export type AuthSlice = Token | null;

export const authSlice = createSlice({
    initialState: getToken(),
    name: 'auth',
    reducers: {
        update(state, action: PayloadAction<Token>) {
            return action.payload;
        },
        clear() {
            return null;
        },
    },
});
