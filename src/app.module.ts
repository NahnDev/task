import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { configuration } from './config/configuration';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { AbilityModule } from './ability/ability.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { FrontendMiddleware } from './middlewares/front-end.middleware';
import { JsonParserInterceptor } from './interceptors/json-parser.interceptor';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: function (configService: ConfigService) {
        const uri = configService.get<string>('database.default.uri');
        return { uri };
      },
      inject: [ConfigService],
    }),
    TasksModule,
    AuthModule,
    AbilityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: JsonParserInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FrontendMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
