import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/gg.strategy';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ActiveJwtGuard } from './guards/active-jwt.guard';
import { ActiveJwtStrategy } from './strategies/active-jwt.strategy';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [PassportModule, UserModule, MailModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    LocalAuthGuard,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    GoogleAuthGuard,
    ActiveJwtGuard,
    ActiveJwtStrategy,
  ],
})
export class AuthModule {}
