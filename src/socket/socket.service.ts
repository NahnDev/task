import { Injectable } from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class SocketService {
  private static auth: { [key: string]: User };
  async setAuth(sId: string, user: User) {
    SocketService.auth[sId] = user;
  }

  async getAuth(sId: string): Promise<User> {
    return SocketService.auth[sId];
  }

  async removeAuth(sId: string): Promise<void> {
    delete SocketService.auth[sId];
  }
}
