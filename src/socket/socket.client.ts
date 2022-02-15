import { MessageSocketSegment } from './message.socket';
import { SocketClientFactory } from './socket-client.factory';
import { SocketClient, SocketSegment } from './types';

export interface AppSocketClient extends SocketClient {
    message: SocketSegment;
}
export const socketClient = SocketClientFactory.create<AppSocketClient>({
    segments: { message: new MessageSocketSegment() },
});
