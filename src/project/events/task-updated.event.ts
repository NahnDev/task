export class TaskUpdatedEvent {
  constructor(
    public project: string,
    public task: string,
    public description: string,
    public at: number = Date.now(),
  ) {}
  static readonly key = 'task.updated';
}
