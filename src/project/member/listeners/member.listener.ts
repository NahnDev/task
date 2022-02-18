import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotifyService } from 'src/notify/notify.service';
import { MemberCreatedEvent } from '../events/member-created.event';
import { MemberService } from '../member.service';

@Injectable()
export class MemberListener {
  constructor(
    private readonly notifyService: NotifyService,
    private readonly memberService: MemberService,
  ) {}

  @OnEvent(MemberCreatedEvent.ev)
  async handleMemberCreated(payload: MemberCreatedEvent) {
    const member = await this.memberService.findById(payload.info.mId);
    const actor = payload.info.actor;

    this.notifyService
      .create({
        user: member.user._id,
        content: 'da duoc them vao ',
        project: member.project,
        from: actor,
      })
      .then();
  }
}
