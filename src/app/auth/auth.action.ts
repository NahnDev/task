import { socketClient } from '../../socket/socket.client';
import { Token } from '../../types/global';
import { AppDispatch } from '../store';
import { authSlice } from './auth.slice';

export class AuthActions {
    static update(token: Token) {
        return (dispatch: AppDispatch) => {
            socketClient.auth.verify(token.accessToken);
            dispatch(authSlice.actions.update(token));
        };
    }
    static clear() {
        return (dispatch: AppDispatch) => {
            dispatch(authSlice.actions.clear());
        };
    }
}
