import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import { SocketClient, SocketSegment } from './types';

export class SocketClientFactory {
    private static _socketClient: SocketClient;
    static create<T extends SocketClient>(
        opts: {
            segments: T;
        } & Partial<ManagerOptions & SocketOptions>
    ): T {
        if (!SocketClientFactory._socketClient) {
            const socket = io(opts);
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
