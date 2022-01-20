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

@Module({
  imports: [
    TaskModule,
    MongooseModule.forFeature([
      {
        name: ProjectMember.name,
        schema: ProjectMemberSchema,
      },
      { name: Project.name, schema: ProjectSchema },
    ]),
  ],
  controllers: [ProjectController, ProjectMemberController],
  providers: [ProjectService, ProjectMemberService],
  exports: [ProjectMemberService],
})
export class ProjectModule {}
