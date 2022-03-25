import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import store from '../app/store';
import { SocketClient, SocketSegment } from './types';

export class SocketClientFactory {
    private static _socketClient: SocketClient;
    static create<T extends SocketClient>(
        opts: {
            segments: T;
        } & Partial<ManagerOptions & SocketOptions>
    ): T {
        console.log('Create a new socket client');
        if (!SocketClientFactory._socketClient) {
            const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8080', opts);
            const token = store.getState().auth?.accessToken;
            if (token) socket.emit('verify', token);
            for (const key in opts.segments) {
                if (Object.prototype.hasOwnProperty.call(opts.segments, key)) {
                    const segments = opts.segments[key];
                    segments.register(socket);
                }
            }
            SocketClientFactory._socketClient = opts.segments;
        }
        return SocketClientFactory._socketClient as T;
    }
}
