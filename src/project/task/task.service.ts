import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from 'eventemitter2';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { TaskUpdatedEvent } from '../events/task-updated.event';
import { MemberService } from '../member/member.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskCreatedEvent } from './events/TaskCreatedEvent';
import { Task, TaskDoc } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDoc>,
    private memberService: MemberService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(
    pId: string,
    createTaskDto: CreateTaskDto,
    actor?: User,
  ): Promise<Task> {
    const taskDoc = new this.taskModel({ ...createTaskDto, project: pId });
    await taskDoc.save();
    this.eventEmitter.emit(
      TaskCreatedEvent.ev,
      new TaskCreatedEvent({ actor: actor?._id, tId: taskDoc._id }),
    );
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
      return task;
    });
  }

  async findOne(pId: string, id: string): Promise<Task> {
    const taskDoc = await this.taskModel.findOne({ project: pId, _id: id });
    if (!taskDoc) return null;
    const task = taskDoc.toJSON();
    return task;
  }

  async update(pId: string, id: string, data: UpdateTaskDto): Promise<Task> {
    if (data.subtask_order) {
      await this.updateSubtaskOrder(id, data.subtask_order);
      delete data.subtask_order;
    }
    if (data.dependencies) {
      await this.updateDependencies(pId, id, data.dependencies);
      delete data.dependencies;
    }
    await this.taskModel.updateOne({ _id: id, project: pId }, data);
    // if (data.name)
    //   await this.taskModel.updateOne(
    //     { _id: id, project: pId },
    //     { name: data.name },
    //   );

    console.log('------------ chuan bi emit event');
    console.log(TaskUpdatedEvent.key);
    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(pId, id, ' đã cập nhật nhiệm vụ'),
    );
    return await this.findOne(pId, id);
  }

  async remove(pId: string, id: string) {
    const task = await this.findOne(pId, id);
    // update parent
    if (task.parent) {
      await this.removeSubtask(pId, task.parent, task._id);
    }

    // update dependencies owner
    for (const dpOwnerId of (
      await this.taskModel.find({ dependencies: id })
    ).map((task) => task._id)) {
      await this.removeDependency(pId, dpOwnerId, id);
    }

    // remove object
    await this.taskModel.deleteOne({ _id: id, project: pId });
    for (const subtask of task.subtask_order) {
      await this.remove(pId, subtask._id);
    }

    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(pId, id, ' deleted'),
    );
  }

  // complete
  async completeTask(pId: string, id: string) {
    const task = await this.findOne(pId, id);
    if (!task?.completable) {
      throw new BadRequestException("Can't complete by dependencies");
    }
    await this.taskModel.updateOne({ _id: id }, { complete: true });
    await this.updateCompletableDependencyTask(pId, id);
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

  async removeAssignee(pId: string, id: string, member: string): Promise<Task> {
    await this.taskModel.updateOne(
      { project: pId, _id: id },
      { $pull: { assignee: member } },
    );
    return await this.findOne(pId, id);
  }

  async removeAssigneeInAll(project: string, member: string) {
    await this.taskModel.updateMany(
      { project },
      { $pull: { assignee: member } },
    );
  }

  // -------------------------------------------------------------------------------------
  //#region subtasks
  async updateSubtaskOrder(id: string, subtasks: string[]) {
    const task = (await this.taskModel.findById(id)).toJSON();

    if (
      !task.subtask_order
        .map((task) => task._id)
        .every((oldSubtaskId) => {
          return subtasks.includes(oldSubtaskId);
        }) ||
      task.subtask_order.length !== subtasks.length
    ) {
      throw new BadRequestException(`subtask order only sort`);
    }
    await this.taskModel.updateOne({ _id: id }, { subtasks_order: subtasks });
  }

  async addSubTask(pId: string, id: string, createTaskDto: CreateTaskDto) {
    const parentTask = await this.findOne(pId, id);
    const task = await this.create(pId, createTaskDto);
    await this.taskModel.updateOne(
      { _id: task._id },
      { parent: id, assignee: parentTask.assignee },
    );
    await this.taskModel.updateOne(
      { _id: id },
      { $addToSet: { subtask_order: task._id } },
    );
    await this.updateCompletable(pId, id);

    this.eventEmitter.emit(
      TaskUpdatedEvent.key,
      new TaskUpdatedEvent(pId, id, ' added subtasks'),
    );
  }

  async removeSubtask(pId: string, id: string, sId: string) {
    await this.taskModel.updateOne(
      { project: pId, _id: id },
      { subtasks_order: { $pull: sId } },
    );
    await this.updateCompletable(pId, id);
  }

  //#endregion

  //#region dependencies
  async updateDependencies(pId: string, id: string, dependencies: string[]) {
    if (
      dependencies.length ===
      (await this.taskModel.find({ _id: { $in: dependencies }, project: pId }))
        .length
    )
      throw new BadRequestException('Dependencies must include project');

    await this.taskModel.updateOne(
      { project: pId, _id: id },
      { dependencies: dependencies },
    );
    await this.updateCompletable(pId, id);
  }
  async addDependency(pId: string, id: string, dpId: string) {
    if (!(await this.findOne(pId, dpId))) {
      throw new Error('Dependencies must include project');
    }
    await this.taskModel.updateOne(
      { project: pId, _id: id },
      { dependencies: { $addToSet: dpId } },
    );
    await this.updateCompletable(pId, id);
  }
  async removeDependency(pId: string, id: string, dpId: string) {
    await this.taskModel.updateOne(
      { project: pId, _id: id },
      { dependencies: { $pull: dpId } },
    );
    await this.updateCompletable(pId, id);
  }
  //#endregion

  // update completable
  private async updateCompletable(pId: string, id: string) {
    const task = await this.findOne(pId, id);
    const completable =
      task.subtask_order.every((task) => task.complete) &&
      task.dependencies.every((task) => task.complete);
    console.log('update completable ', id, 'with value', completable);
    await this.taskModel.updateOne({ _id: id }, { completable });
  }
  private async updateCompletableDependencyTask(pId: string, id: string) {
    // update parent
    const parentId = await (
      await this.taskModel.findOne({ subtask_order: id })
    ).toJSON()?._id;
    if (parentId) {
      await this.updateCompletable(pId, parentId);
    }
    // update dependencies owner
    for (const dpOwnerId of (
      await this.taskModel.find({ dependencies: id })
    ).map((task) => task._id)) {
      console.log('DpOwnerId is ', dpOwnerId);
      await this.updateCompletable(pId, dpOwnerId);
    }
  }
}
