import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StringOrObjectId } from 'src/types/StringOrObjectId';
import { CreateSubTaskDTo } from '../dto/create-subTask.dto';
import { UpdateSubTaskDto } from '../dto/update-subTask.dto';
import { SubTask, SubTaskDocument } from '../schemas/task.schema';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectModel(SubTask.name) private subTaskModel: Model<SubTaskDocument>,
  ) {}
  async create(createSubTaskDto: CreateSubTaskDTo) {
    const subTaskDocument = new this.subTaskModel(createSubTaskDto);
    await subTaskDocument.save();
    return subTaskDocument.toJSON();
  }
  async findAllInParentTask(parent: StringOrObjectId) {
    return (await this.subTaskModel.find({ parent, __t: SubTask.name })).map(
      (el) => el.toJSON(),
    );
  }
  async findOne(id: StringOrObjectId) {
    return (
      await this.subTaskModel.findOne({ _id: id, __t: SubTask.name })
    ).toJSON();
  }
  async update(id: StringOrObjectId, updateSubTaskDto: UpdateSubTaskDto) {
    await this.subTaskModel.updateOne(
      { _id: id, __t: SubTask.name },
      updateSubTaskDto,
    );
    return await this.findOne(id);
  }
  async remove(id: StringOrObjectId) {
    return await this.subTaskModel.deleteOne({ _id: id, __t: SubTask.name });
  }
}
