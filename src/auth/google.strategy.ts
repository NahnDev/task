import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google-login',
    });
  }
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: VerifyCallback,
  ) {
    try {
      const user = await this.authService.validateGoogleLogin(profile);
      done(null, user);
    } catch (err) {
      // console.log(err)
      done(err, false);
    }
  }
}
