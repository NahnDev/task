import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePrimaryTaskDto } from '../dto/create-primary-task.dto';
import { UpdateTaskDto } from '../dto/update-primary-task.dto';
import { PrimaryTask, PrimaryTaskDocument } from '../schemas/task.schema';
import { SubtasksService } from '../subtasks/subtasks.service';

@Injectable()
export class PrimaryTaskService {
  constructor(
    @InjectModel(PrimaryTask.name)
    private primaryTaskModel: Model<PrimaryTaskDocument>,
    private subTaskService: SubtasksService,
  ) {}
  async create(createTaskDto: CreatePrimaryTaskDto) {
    const primaryTaskDocument = new this.primaryTaskModel(createTaskDto);
    await primaryTaskDocument.save();
    return primaryTaskDocument.toJSON();
  }

  async findAllInProject(project: string) {
    return (
      await this.primaryTaskModel.find({ project, __t: PrimaryTask.name })
    ).map((el) => el.toJSON());
  }

  async findOne(id: string) {
    return await this.primaryTaskModel.findOne({
      _id: id,
      __t: PrimaryTask.name,
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    if (updateTaskDto.complete === true) {
      if (
        !(await this.subTaskService.findAllInParentTask(id)).every(
          (el) => el.complete === true,
        )
      )
        throw new BadRequestException("Can't complete by dependency");
    }
    await this.primaryTaskModel.updateOne(
      { _id: id, __t: PrimaryTask.name },
      updateTaskDto,
    );
    return await this.findOne(id);
  }

  async remove(id: string) {
    (await this.subTaskService.findAllInParentTask(id)).forEach((el) => {
      this.subTaskService.remove(el.id).then();
    });
    await this.primaryTaskModel.deleteOne({
      _id: id,
      __t: PrimaryTask.name,
    });
    return { ok: 1 };
  }
}
