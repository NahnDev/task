import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { SOCKET_MAP } from './socket.map';

@Injectable()
export class SocketService {
  registerSocketForUser(sId: string, uId: string) {
    SOCKET_MAP[uId] = sId;
  }
  removeSocketForUser(sId: string, uId: string) {
    delete SOCKET_MAP[uId];
  }

  findSocketOfUser(uId: string): string {
    return SOCKET_MAP[uId];
  }
}
