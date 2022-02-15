import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './member/schemas/member.schema';
import { Project, ProjectSchema } from './schemas/project.schema';
import { NotifyModule } from 'src/notify/notify.module';
import { TaskUpdatedListener } from './listeners/task-updated.listener';
import { RoleModule } from './role/role.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    TaskModule,
    RoleModule,
    MemberModule,
    NotifyModule,
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, TaskUpdatedListener],
  exports: [ProjectService],
})
export class ProjectModule {}
