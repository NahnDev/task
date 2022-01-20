import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectMemberController } from './member/member.controller';
import { ProjectMemberService } from './member/member.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProjectMember,
  ProjectMemberSchema,
} from './member/schemas/project-member.schema';
import { Project, ProjectSchema } from './schemas/project.schema';
import { NotifyModule } from 'src/notify/notify.module';
import { TaskUpdatedListener } from './listeners/task-updated.listener';

@Module({
  imports: [
    TaskModule,
    NotifyModule,
    MongooseModule.forFeature([
      {
        name: ProjectMember.name,
        schema: ProjectMemberSchema,
      },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectController, ProjectMemberController],
  providers: [ProjectService, ProjectMemberService, TaskUpdatedListener],
  exports: [ProjectMemberService],
})
export class ProjectModule {}
