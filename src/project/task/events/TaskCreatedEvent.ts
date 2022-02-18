export class TaskCreatedEvent {
  public static readonly ev = 'task.created';
  constructor(public info: { actor: string; tId: string }) {}
}
