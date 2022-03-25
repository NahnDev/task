import { Socket } from 'socket.io-client';

export abstract class SocketSegment {
    private _socket: Socket | null = null;
    get socket(): Socket {
        if (!this._socket) throw new Error('must register before use socket');
        return this._socket;
    }
    public register(socket: Socket) {
        this._socket = socket;
    }
}

export interface SocketClient {
    [name: string]: SocketSegment;
}
