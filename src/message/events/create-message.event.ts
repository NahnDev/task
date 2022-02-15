import { Message } from '../schemas/message.schema';

export class CreateMessageEvent {
  public static readonly ev = 'message.create';
  constructor(public message: Message) {}
}
