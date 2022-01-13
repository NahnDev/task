import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SubtasksController } from './subtasks/subtasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PrimaryTask,
  PrimaryTaskSchema,
  SubTask,
  SubTaskSchema,
  Task,
  TaskSchema,
} from './schemas/task.schema';
import { SubtasksService } from './subtasks/subtasks.service';
import { PrimaryTaskController } from './primary-task/primary-task.controller';
import { PrimaryTaskService } from './primary-task/primary-task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
        discriminators: [
          {
            name: PrimaryTask.name,
            schema: PrimaryTaskSchema,
          },
          {
            name: SubTask.name,
            schema: SubTaskSchema,
          },
        ],
      },
    ]),
  ],
  controllers: [TasksController, SubtasksController, PrimaryTaskController],
  providers: [TasksService, SubtasksService, PrimaryTaskService],
  exports: [TasksService, SubtasksService],
})
export class TasksModule {}
