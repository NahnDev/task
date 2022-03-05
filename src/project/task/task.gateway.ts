import { OnEvent } from '@nestjs/event-emitter';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MemberDeletedEvent } from '../member/events/member-deleted.event';
import { TaskService } from './task.service';

@WebSocketGateway()
export class TaskGateway {
  constructor(private taskService: TaskService) {}
  @OnEvent(MemberDeletedEvent.ev)
  handleMemberDeletedEvent(event: MemberDeletedEvent) {
    const { project, _id: member } = event.member;
    this.taskService.removeAssigneeInAll(project, member).then();
  }
}
