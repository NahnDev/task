import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StringOrObjectId } from 'src/types/StringOrObjectId';
import { CreatePrimaryTaskDto } from '../dto/create-primary-task.dto';
import { UpdateTaskDto } from '../dto/update-primary-task.dto';
import { PrimaryTask, PrimaryTaskDocument } from '../schemas/task.schema';

@Injectable()
export class PrimaryTaskService {
  constructor(
    @InjectModel(PrimaryTask.name)
    private primaryTaskModel: Model<PrimaryTaskDocument>,
  ) {}
  async create(createTaskDto: CreatePrimaryTaskDto) {
    const primaryTaskDocument = new this.primaryTaskModel(createTaskDto);
    await primaryTaskDocument.save();
    return primaryTaskDocument.toJSON();
  }

  async findAllInProject(project: StringOrObjectId) {
    return (
      await this.primaryTaskModel.find({ project, __t: PrimaryTask.name })
    ).map((el) => el.toJSON());
  }

  async findOne(id: StringOrObjectId) {
    return await this.primaryTaskModel.findOne({
      _id: id,
      __t: PrimaryTask.name,
    });
  }

  async update(id: StringOrObjectId, updateTaskDto: UpdateTaskDto) {
    await this.primaryTaskModel.updateOne(
      { _id: id, __t: PrimaryTask.name },
      updateTaskDto,
    );
    return await this.findOne(id);
  }

  async remove(id: StringOrObjectId) {
    return await this.primaryTaskModel.deleteOne({
      _id: id,
      __t: PrimaryTask.name,
    });
  }
}
