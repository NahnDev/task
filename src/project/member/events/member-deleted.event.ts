import { Member } from '../schemas/member.schema';

export class MemberDeletedEvent {
  public static readonly ev = 'member.deleted';
  constructor(public readonly member: Member) {}
}
