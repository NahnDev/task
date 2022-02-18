import { Notify } from '../schemas/notify.schema';

export class CreateNotifyEvent {
  public static readonly ev = 'notify.create';
  constructor(public readonly notify: Notify) {}
}
