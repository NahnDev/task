import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from './mail/mail.module';
import { CaslModule } from './casl/casl.module';
import { NotifyModule } from './notify/notify.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RoleModule } from './project/role/role.module';
import { MemberModule } from './project/member/member.module';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { AppGateway } from './app.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(process.cwd(), 'static') }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          uri: configService.get<string>('database.default.uri'),
        };
      },
    }),
    EventEmitterModule.forRoot(),
    MailModule,
    UserModule,
    ProjectModule,
    AuthModule,
    CaslModule,
    NotifyModule,
    RoleModule,
    MemberModule,
    RoomModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
