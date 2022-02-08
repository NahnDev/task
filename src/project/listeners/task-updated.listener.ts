import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotifyService } from 'src/notify/notify.service';
import { TaskUpdatedEvent } from '../events/task-updated.event';
import { MemberService } from '../member/member.service';
import { ProjectService } from '../project.service';
import { TaskService } from '../task/task.service';

@Injectable()
export class TaskUpdatedListener {
  constructor(
    private projectService: ProjectService,
    private projectMemberService: MemberService,
    private notifyService: NotifyService,
    private taskService: TaskService,
  ) {}

  @OnEvent(TaskUpdatedEvent.key)
  async handleTaskUpdated(payload: TaskUpdatedEvent) {
    console.log('work');
    const { project, task, description, at } = payload;
    const projectName = await (await this.projectService.findOne(project)).name;
    const taskName = (await this.taskService.findOne(project, task)).name;

    const members = (await this.projectMemberService.findAll(project)).map(
      (memberInfo) => memberInfo.user,
    );
    for (const member of members) {
      console.log('work here');
      this.notifyService
        .create({
          user: member._id,
          content: description,
          from: projectName + ': ' + taskName,
          link: '#',
        })
        .then();
    }
  }
}
