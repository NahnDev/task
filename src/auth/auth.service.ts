import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { sign, verify } from 'jsonwebtoken';
import { Profile } from 'passport-google-oauth20';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  private generateAccessToken(data: any): string {
    return sign(
      JSON.parse(JSON.stringify(data)),
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
      JSON.parse(JSON.stringify(data)),
      this.configService.get<string>('security.refreshToken.secret'),
      {
        expiresIn: this.configService.get<number>(
          'security.refreshToken.expiresIn',
        ),
      },
    );
  }
  async validateLocalLogin(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(new User(), email);
    if (!user) throw new UnauthorizedException();
    const isPasswordMatching = await this.userService.verifyPassword(
      user._id,
      password,
    );
    console.log(isPasswordMatching);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    return user;
  }
  async validateGoogleLogin(profile: Profile) {
    const email = profile.emails.toString();
    let user = await this.userService.findByEmail(new User(), email);
    if (!user) {
      const createUserDto = new CreateUserDto();
      createUserDto.email = profile.emails.toString();
      createUserDto.password = Math.random() + 'Ad@1';
      createUserDto.name = profile.username.toString();
      user = await this.userService.create(createUserDto);
    }
    return user;
  }

  async getToken(user: User) {
    user = await this.userService.findOne(null, user._id);
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }
  async getTokenWithRefreshToken(refreshToken: string) {
    const decode = (await new Promise((resolve, rejects) => {
      verify(
        refreshToken,
        this.configService.get<string>('security.refreshToken.secret'),
        (error, decode) => {
          if (error) return rejects(error);
          resolve(decode as User);
        },
      );
    })) as User;
    return this.getToken(decode);
  }
}
