import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDoc } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDoc>) {}
  async create(project: string, createTaskDto: CreateTaskDto): Promise<Task> {
    const taskDoc = new this.taskModel({ ...createTaskDto, project });
    await taskDoc.save();
    return taskDoc.toJSON();
  }

  async findAll(project: string): Promise<Task[]> {
    const taskDocs = await this.taskModel.find({ project });
    return taskDocs.map((taskDoc) => taskDoc.toJSON());
  }

  async findOne(project: string, id: string): Promise<Task> {
    return (await this.taskModel.findOne({ project, _id: id })).toJSON();
  }

  async update(
    project: string,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.findOne(project, id);
    if (updateTaskDto.subtask_order) {
      if (
        !task.subtask_order.every((oldSubtask) => {
          return updateTaskDto.subtask_order.includes(oldSubtask);
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

    if (updateTaskDto.complete) {
      await this.canComplete(project, id);
    }
    await this.taskModel.updateOne({ _id: id, project }, updateTaskDto);
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
      this.remove(project, subtask).then();
    });
    return await this.taskModel.deleteOne({ _id: id, project });
  }

  async addSubTask(project: string, id: string, createTaskDto: CreateTaskDto) {
    const task = await this.create(project, createTaskDto);
    await this.taskModel.updateOne({ _id: task._id }, { parent: id });
    await this.taskModel.updateOne(
      { _id: id },
      { subtask_order: { $push: task._id } },
    );
    return await this.findOne(project, task._id);
  }

  async canComplete(project: string, id: string): Promise<boolean> {
    const task = await this.findOne(project, id);
    for (const dp of task.dependencies) {
      const dpTask = await this.findOne(project, dp);
      if (!dpTask.complete)
        throw new BadRequestException('All dependencies must complete');
    }

    for (const subtaskId of task.subtask_order) {
      const subTask = await this.findOne(project, subtaskId);
      if (!subTask.complete)
        throw new BadRequestException('All subtask must complete');
    }
    return true;
  }
}
