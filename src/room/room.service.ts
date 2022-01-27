import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { MemberService } from 'src/project/member/member.service';

@Injectable()
export class RoomService {
  constructor(private readonly memberService: MemberService) {}
  async findAll(userId: string) {
    await this.memberService.findProjectHasUser(userId);
    return (await this.memberService.findProjectHasUser(userId)).map(
      (el) => el.project,
    );
  }
  remove(id: number) {
    // this service will delete all message
  }
}
