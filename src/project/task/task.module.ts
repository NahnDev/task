import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { MemberModule } from '../member/member.module';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Task.name,
        useFactory: function () {
          const schema = TaskSchema;
          // eslint-disable-next-line
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    MemberModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskGateway],
  exports: [TaskService],
})
export class TaskModule {}
