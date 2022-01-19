import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { USER_ACTIVE } from 'src/enums/user-active.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      session: false,
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string) {
    console.log('121');
    const user = await this.authService.validateWithMail(email, password);
    if (!user) throw new UnauthorizedException('Not found');
    return user;
  }
}
