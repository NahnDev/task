import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROJECT_ROLE } from 'src/roles/project.role';
import { User } from 'src/user/schemas/user.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectMemberService } from './member/member.service';
import { Project, ProjectDoc } from './schemas/project.schema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDoc>,
    private memberService: ProjectMemberService,
  ) {}
  async create(
    actor: User,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const projectDoc = new this.projectModel({
      ...createProjectDto,
      author: actor._id,
    });
    await projectDoc.save();
    await this.memberService.create(projectDoc._id, {
      user: projectDoc.author,
      role: PROJECT_ROLE.OWNER,
    });
    return projectDoc.toJSON();
  }

  async findAllByUser(user: string): Promise<Project[]> {
    const projectIds: string[] = (
      await this.memberService.findByUser(user)
    ).map((projectMember) => projectMember.project);
    const projectDocs = await this.projectModel.find({
      _id: { $in: projectIds },
    });
    return projectDocs.map((projectDoc) => projectDoc.toJSON());
  }

  async findOne(id: string): Promise<Project> {
    return (await this.projectModel.findById(id)).toJSON();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.projectModel.updateOne({ _id: id }, updateProjectDto);
    return await this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} project, install yet`;
  }
}
