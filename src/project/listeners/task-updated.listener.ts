import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotifyService } from 'src/notify/notify.service';
import { TaskUpdatedEvent } from '../events/task-updated.event';
import { ProjectMemberService } from '../member/member.service';
import { ProjectService } from '../project.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class TaskUpdatedListener {
  constructor(
    private projectService: ProjectService,
    private projectMemberService: ProjectMemberService,
    private notifyService: NotifyService,
    private taskService: TaskService,
  ) {}

  @OnEvent(TaskUpdatedEvent.key)
  async handleTaskUpdated(payload: TaskUpdatedEvent) {
    console.log('work');
    const { project, task, description, at } = payload;
    const projectName = await (await this.projectService.findOne(project)).name;
    const members = (await this.projectMemberService.findAll(project)).map(
      (memberInfo) => memberInfo.user,
    );
    const taskName = (await this.taskService.findOne(project, task)).name;
    for (const member of members) {
      console.log('work here');
      this.notifyService
        .create({
          user: member,
          content: description,
          from: projectName + ': ' + taskName,
          link: '#',
        })
        .then();
    }
  }
}
