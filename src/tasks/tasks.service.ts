import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/projects/schemas/project.schema';
import { StringOrObjectId } from 'src/types/StringOrObjectId';

import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  async findAllInProject(project: StringOrObjectId) {
    return (await await this.taskModel.find({ project })).map((el) =>
      el.toJSON(),
    );
  }
}
