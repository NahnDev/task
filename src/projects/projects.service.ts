import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbilityFactory } from 'src/ability/ability-factory';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private abilityFactory: AbilityFactory,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    console.dir(createProjectDto.name);
    const projectDocument = new this.projectModel(createProjectDto);
    await projectDocument.save();
    return projectDocument.toJSON();
  }

  async findAll() {
    return (await this.projectModel.find()).map((el) => el.toJSON());
  }

  async findOne(id: string) {
    return await this.projectModel.findById(id).lean();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.projectModel.updateOne({ _id: id }, updateProjectDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.projectModel.deleteOne({ _id: id });
  }
}
