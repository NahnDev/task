import { Member } from '../schemas/member.schema';

export class MemberCreatedEvent {
  public static readonly ev = 'member.created';
  constructor(public readonly info: { mId: string; actor: string }) {}
}
