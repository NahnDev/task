import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from 'eventemitter2';
import { Model } from 'mongoose';
import { TaskUpdatedEvent } from '../events/task-updated.event';
import { MemberService } from '../member/member.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDoc } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDoc>,
    private memberService: MemberService,
    private eventEmitter: EventEmitter2,
  ) {}
  async create(project: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const taskDoc = new this.taskModel({ ...createTaskDto, project });
    await taskDoc.save();
    return taskDoc.toJSON();
  }

  async findAll(project: string, all?: boolean): Promise<Task[]> {
    const taskDocs = await this.taskModel.find({
      project,
      ...(!all ? { parent: null } : {}),
    });
    return taskDocs.map((taskDoc) => {
      const task = taskDoc.toJSON();
      console.log(task);
      task.canComplete = this.isCompletable(task);
      return task;
    });
  }

  async findOne(project: string, id: string): Promise<Task> {
    const taskDoc = await this.taskModel.findOne({ project, _id: id });
    if (!taskDoc) return null;
    const task = taskDoc.toJSON();
    task.canComplete = this.isCompletable(task);
    return task;
  }

  async update(
    project: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne(project, id);
    if (updateTaskDto.subtask_order) {
      if (
        !task.subtask_order
          .map((task) => task._id)
          .every((oldSubtaskId) => {
            return updateTaskDto.subtask_order.includes(oldSubtaskId);
          }) ||
        task.subtask_order.length !== updateTaskDto.subtask_order.length
      ) {
        throw new BadRequestException(`subtask order only sort`);
      }
    }

    if (updateTaskDto.dependencies) {
      for (const dp of updateTaskDto.dependencies) {
        const task = await this.findOne(project, dp);
        if (!task) throw new BadRequestException(`dependencies not found`);
      }
    }
    await this.taskModel.updateOne({ _id: id, project }, updateTaskDto);

    console.log('------------ chuan bi emit event');
    console.log(TaskUpdatedEvent.key);
    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(project, id, ' đã cập nhật nhiệm vụ'),
    );
    return this.findOne(project, id);
  }

  async remove(project: string, id: string) {
    const task = await this.findOne(project, id);
    this.taskModel
      .updateMany(
        { _id: task.parent, project },
        { $pull: { subtask_order: id } },
      )
      .then();
    this.taskModel
      .updateMany({ dependencies: id }, { $pull: { dependencies: id } })
      .then();
    task.subtask_order.map((subtask) => {
      this.remove(project, subtask._id).then();
    });
    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(project, id, ' deleted'),
    );
    return await this.taskModel.deleteOne({ _id: id, project });
  }
  async removeAll(project: string) {
    await this.taskModel.deleteMany({ project });
  }

  async addAssignee(project: string, _id: string, user: string) {
    if (!(await this.memberService.findOne(project, _id))) {
      throw new Error('Member not found');
    }
    await this.taskModel.updateOne(
      { project, user: _id },
      { $addToSet: { assignee: user } },
    );
    return await this.findOne(project, _id);
  }

  async removeAssignee(
    project: string,
    id: string,
    member: string,
  ): Promise<Task> {
    await this.taskModel.updateOne(
      { project, _id: id },
      { $pull: { assignee: member } },
    );
    return await this.findOne(project, id);
  }

  async removeAssigneeInAll(project: string, member: string) {
    await this.taskModel.updateMany(
      { project },
      { $pull: { assignee: member } },
    );
  }

  async addSubTask(project: string, id: string, createTaskDto: CreateTaskDto) {
    const parentTask = await this.findOne(project, id);
    const task = await this.create(project, createTaskDto);
    await this.taskModel.updateOne(
      { _id: task._id },
      { parent: id, assignee: parentTask.assignee },
    );
    await this.taskModel.updateOne(
      { _id: id },
      { $addToSet: { subtask_order: task._id } },
    );
    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(project, id, ' added subtasks'),
    );
    return await this.findOne(project, task._id);
  }

  async completeTask(project: string, id: string): Promise<Task> {
    const task = await this.findOne(project, id);
    if (!task.canComplete) throw new Error('Dp task or subtask completed yet');
    await this.taskModel.updateOne({ project, _id: id }, { complete: true });
    return await this.findOne(project, id);
  }

  isCompletable(task: Task) {
    return (
      task.subtask_order.every((subtask) => subtask.complete === true) &&
      task.dependencies.every((dpTask) => {
        console.log(dpTask);
        console.log(dpTask.complete === true);
        return dpTask.complete === true;
      })
    );
  }
}
