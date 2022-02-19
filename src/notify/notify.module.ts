import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notify, NotifySchema } from './schemas/notify.schema';
import { NotifyGateway } from './notify.gateway';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notify.name,
        useFactory: function () {
          const schema = NotifySchema;
          // eslint-disable-next-line
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    SocketModule,
  ],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyGateway],
  exports: [NotifyService],
})
export class NotifyModule {}
