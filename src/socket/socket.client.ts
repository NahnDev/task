import { AuthSocketSegment } from './auth.socket';
import { MessageSocketSegment } from './message.socket';
import { SocketClientFactory } from './socket-client.factory';
import { SocketClient, SocketSegment } from './types';

export interface AppSocketClient extends SocketClient {
    message: MessageSocketSegment;
    auth: AuthSocketSegment;
}
export const socketClient = SocketClientFactory.create<AppSocketClient>({
    segments: {
        message: new MessageSocketSegment(),
        auth: new AuthSocketSegment(),
    },
});
