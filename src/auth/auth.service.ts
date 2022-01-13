import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  private generateAccessToken(data: any): string {
    return sign(
      data,
      this.configService.get<string>('security.accessToken.secret'),
      {
        expiresIn: this.configService.get<number>(
          'security.accessToken.expiresIn',
        ),
      },
    );
  }
  private generateRefreshToken(data: any): string {
    return sign(
      data,
      this.configService.get<string>('security.refreshToken.secret'),
      {
        expiresIn: this.configService.get<number>(
          'security.refreshToken.expiresIn',
        ),
      },
    );
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(new User(), email);
    const isPasswordMatching = await this.userService.verifyPassword(
      user._id,
      password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    return user;
  }
  async getToken(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }
  async getTokenWithRefresh(refreshToken: string) {
    const user = (await new Promise((resolve, rejects) => {
      verify(
        refreshToken,
        this.configService.get<string>('security.refreshToken.secret'),
        (error, decode) => {
          if (error) return rejects(error);
          resolve(decode as User);
        },
      );
    })) as User;
    return this.getToken(user);
  }
}
