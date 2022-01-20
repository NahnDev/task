export class TaskUpdatedEvent {
  constructor(
    public project: string,
    public task: string,
    public description: string,
    public at: Date = new Date(),
  ) {}
  static readonly key = 'task.updated';
}
