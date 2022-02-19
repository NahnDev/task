import { socketClient } from '../../socket/socket.client';
import { Token } from '../../types/global';

export class AuthActions {
    static setToken(token: Token) {
        socketClient.auth.verify(token.accessToken);
        localStorage.setItem('token', JSON.stringify(token));
    }
}
