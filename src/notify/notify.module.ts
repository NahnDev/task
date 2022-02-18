import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notify, NotifySchema } from './schemas/notify.schema';
import { NotifyGateway } from './notify.gateway';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notify.name, schema: NotifySchema }]),
    SocketModule,
  ],
  controllers: [NotifyController],
  providers: [NotifyService, NotifyGateway],
  exports: [NotifyService],
})
export class NotifyModule {}
